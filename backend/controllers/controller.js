const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const mqservice = require('../services/MQservice.js')
const SECRET_KEY = 'E79FB19FDC927E709F250F01CAFED631971E3ECD';

exports.solveAll = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let solveRequest = req.body.request;

    if(authorization(solveRequest.token, solveRequest.id).isValid){
        let id = "-1" //TODO - serve davvero settarlo con un senso?
        let message = buildMessage(id, solveRequest, "ALL");
        mqservice.publishToQueue('requests', message);
    }else{
        console.log("error");
    }    
    console.log('solve all controller')
}

exports.solveNext = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let solveRequest = req.body.request;
    if(authorization(solveRequest.token, solveRequest.id).isValid){
        const salt = bcrypt.genSaltSync(10);
        const toHash = solveRequest.token + solveRequest.theory + solveRequest.query;
        const id = bcrypt.hashSync(toHash, salt);
        let message = buildMessage(id, solveRequest, "NEXT");
        mqservice.publishToQueue('requests', message);
    }else{
        console.log("error");
    }
    console.log('solve all controller')
}

exports.signup = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let user = req.body.user;
    User
        .findOne()
        .where('username').equals(user.username)
        .exec((err, student) => {
            if(student == null){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(user.password, salt);
                user.salt = salt;
                user.password = hash;
                var newUser = new User(user);
                newUser.save((err, usr) => {
                    if(err) res.json({ message: 'Error! Retry later' });
                    else res.json({ message: 'OK! User registerd!' });
                });
            } else{
                res.json({ message: 'Error! User already registered' });
            }
        });
}

exports.signin = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let user = req.body.user;
    console.log(`Username: ${user.username}`);
    console.log(`Password: ${user.password}`);
    User
        .findOne()
        .where('username').equals(user.username)
        .exec((err, usr) => {
            if(usr != null && !err){
                if(bcrypt.compareSync(user.password, usr.password)){
                    let tkn = jsonwebtoken.sign({ username: usr.username, id: usr._id }, SECRET_KEY, { algorithm: 'HS512', expiresIn: '7d' });
                    res.json({ result: 'ok', token: tkn, username: usr.username, id: usr._id });
                } else{
                    res.json({ result: 'Error! wrong password'}); 
                }
            }
        });
}

const authorization = (token, id) => {
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

const buildMessage = (id, solveRequest, type) => {
    return `
    {
        "id": ${id},
        "theory": ${solveRequest.theory},
        "goal": ${solveRequest.query},
        "timeout": ${solveRequest.timeout},
        "maxSol": ${solveRequest.maxSol},
        "type": ${type}
    }
    `
}