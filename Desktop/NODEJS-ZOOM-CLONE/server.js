const express  = require('express');
const app = express();
const server = require('http').Server(app);
const {v4: uuidv4} = require('uuid');
const io = require('socket.io')(server);
const {ExpressPeerServer} = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});



app.set('view engine', 'ejs');

// Notify server that public file are going to be here
app.use(express.static('public'));
app.use('/peerjs', peerServer);


app.get('/', (req,res) => {
    //This will generate Unique Id of Zoom Meeting and render it to /:room
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', (req, res) => {
    // We are passing roomid to front
    res.render('room', {roomId: req.params.room})
})


io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
    })
})


server.listen(3030);