const path = require('path')
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// setting static folder
app.use(express.static(path.join(__dirname, 'public')));


const botName = 'Chattor Bot';

// run when client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {

            const user= userJoin(socket.id, username, room);
            socket.join(user.room);

            // welcome current user
            socket.emit('message', formatMessage(botName, 'Hello and welcome to my chat application, here you can chat. Hehe'));

            // broadcast when a user connects
            socket.broadcast.to(user.room).emit('message', formatMessage(botName, `<strong>${user.username}</strong> has joined a chat.`));
    });

    // listen for chatMessage
    socket.on('chatMessage', (msg) => {

        // dding users
        const user= getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // run when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `<strong>${user.username}</strong> has left the chat.`));
        }
    });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));