const path = require('path')
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// setting static folder
app.use(express.static(path.join(__dirname, 'public')));


const botName = 'Chattor Bot';

// run when client connects
io.on('connection', socket => {

    // welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to my chatapp!'));

    // broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined a chat.'));

    // run when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat.'));
    });

    // listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    });

});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));