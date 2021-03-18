const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const decodeIDToken = require('./authenticateToken');
const listsRouter = require('./controllers/lists');
const likesRouter = require('./controllers/likes');
const socketio = require("socket.io");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(decodeIDToken);
app.use(express.json());
var server = require("http").Server(app);


// socket.io
io = socketio(server, {
    cors: {
        origin: '*',
    }
});

// now all request have access to io
app.use(function (req, res, next) {
    req.io = io;
    next();
});

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
).then(() => {
    console.log('Connected to database');
}).catch((err) => console.log('Error connecting database', err.message));

app.use('/lists', listsRouter);
app.use('/likes', likesRouter);

app.get('/', (req, res) => {
    res.send('server on');
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Serveur is running on port ${PORT}`);
});
