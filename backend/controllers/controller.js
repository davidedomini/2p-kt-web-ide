const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const axios = require('axios');
const sockets = require('../utils/sockets').sockets
const SECRET_KEY = 'E79FB19FDC927E709F250F01CAFED631971E3ECD';
const db = require("../models/database.js")
const User = db.users;

exports.solveAll = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let solveRequest = req.body.request;
    //if(authorization(solveRequest.token, solveRequest.id).isValid){
        let requestData = {
            id: -1,
            theory: solveRequest.theory,
            goal: solveRequest.query,
            timeout: solveRequest.timeout,
            maxSol: solveRequest.maxSol,
            type: "ALL"
        }
        axios
            .post('http://2pktservice:8080/solveAll', requestData)
            .then(response => {
                console.log("[BACKEND] Solve all done")
                sockets.get(solveRequest.username).emit('solve-response', response.data)
            });
        
    //}else{
    //    console.log("error");
    //}    
}

exports.try = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    User.findOne({username: "dom99"}).then( user => {
        if(!user){
            return res.send({status: 400, message: "Bad request"});
        }else{
            return res.send({status: 200, user: user})
        }
        }).catch(err=> {
        return res.send({status: 500, error: err});
        });
}

exports.solveNext = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let solveRequest = req.body.request;
    //if(authorization(solveRequest.token, solveRequest.id).isValid){
        const generatedId = solveRequest.token + solveRequest.theory + solveRequest.query;
        let requestData = {
            id: generatedId,
            theory: solveRequest.theory,
            goal: solveRequest.query,
            timeout: solveRequest.timeout,
            maxSol: solveRequest.maxSol,
            type: "NEXT"
        }
        axios
            .post('http://2pktservice:8080/solveNext', requestData)
            .then(response => {
                console.log("[BACKEND] Solve next done")
                sockets.get(solveRequest.username).emit('solve-response', response.data)
            });
    //}else{
      //console.log("error");
    //}
}

exports.reset = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let solveRequest = req.body.request;
    //if(authorization(solveRequest.token, solveRequest.id).isValid){
        const generatedId = solveRequest.token;
        let requestData = {
            id: generatedId,
            theory: solveRequest.theory,
            goal: solveRequest.query,
            timeout: solveRequest.timeout,
            maxSol: solveRequest.maxSol,
            type: "RESET"
        }
        axios
            .post('http://2pktservice:8080/reset', requestData)
            .then(response => {
                console.log("[BACKEND] Reset done")
            });
    //}else{
      //console.log("error");
    //}
}

exports.signup = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let user = req.body.user;
    User.findOne({username: user.username}).then( usr => {
        if(usr == null) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.password, salt);
            user.salt = salt;
            user.password = hash;
            var newUser = new User(user);
            newUser.save((err, usr) => {
                if(err) res.json({ result: 'error', message: 'Retry later' });
                else res.json({ result: 'success', message: 'User registerd' });
            });
        } else {
            return res.json({ result: 'error', message: 'User already registered' });
        }
    }).catch(err => {
        return res.send({status: 500, error: err});
    });
}

exports.signin = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let user = req.body.user;
    console.log(`Username: ${user.username}`);
    console.log(`Password: ${user.password}`);

    User.findOne({username: user.username}).then( usr => {
        if(usr != null) {
            if(bcrypt.compareSync(user.password, usr.password)){
                let tkn = jsonwebtoken.sign({ username: usr.username, id: usr._id }, SECRET_KEY, { algorithm: 'HS512', expiresIn: '7d' });
                res.json({ result: 'success', token: tkn, username: usr.username, id: usr._id });
            } else{
                return res.json({ result: 'error', message: 'Wrong password'}); 
            }
        } else {
            return res.json({ result: 'error', message: 'User not found'}); 
        }
    }).catch(err => {
        return res.send({status: 500, error: err});
    });
}

const authorization = (token, id) => {
    let valid;
    if(token == null) valid = { isValid: false };
    try {
        const decoded = jsonwebtoken.verify(token, SECRET_KEY);
        if(decoded.id == id) valid = { isValid: true }
        else valid = { isValid: false }
    }catch(ex){
        valid = { isValid: false };
    }
    return valid;
}