const express  = require('express');
const app = express();
const server = require('http').Server(app);
const {v4: uuidv4} = require('uuid');



app.set('view engine', 'ejs');

// Notify server that public file are going to be here
app.use(express.static('public'));

app.get('/', (req,res) => {
    //This will generate Unique Id of Zoom Meeting and render it to /:room
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', (req, res) => {
    // We are passing roomid to front
    res.render('room', {roomId: req.params.room})
})



server.listen(3030);