const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes/routes.js')
const mqservice = require('./services/MQservice.js')
const cors = require('cors')
const mongoose = require('mongoose')

global.appRoot = path.resolve(__dirname)

var PORT = 3000

mongoose.connect('mongodb://localhost:27018/2pktweb')

routes(app)

app.use(express.json())
app.use(cors())

// TODO - may I remove it?
app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    mqservice.connectToChannel()
});