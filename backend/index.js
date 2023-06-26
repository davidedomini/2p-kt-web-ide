const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes/routes.js')
const cors = require('cors')
const mongoose = require('mongoose')
const sockets = require('./utils/sockets').sockets
const db = require("./models/database.js")

global.appRoot = path.resolve(__dirname)

var PORT = 3000

console.log("Connecting to database..." + db.url)

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("connected to the database SUCCESSFULLY");
  }).catch(err=>{
    console.log("connection to the database FAILED ", err);
    process.exit();
  });

routes(app)

app.use(express.json())
app.use(cors())

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('connect-client', (userId) => {
        console.log("User connected: " + userId)
        sockets.set(userId, socket)
    })
})