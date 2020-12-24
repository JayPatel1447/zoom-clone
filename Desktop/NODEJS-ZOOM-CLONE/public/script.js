

const socket  = io('/');
//  getElementById(video-grid) where video-grid is id property of room.ejs 
// continue: so you can pass id here to call and set video in grid formate this is the



// great functionality of ejs - Embedded JavaScript
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');

// We set our own video to be muted why cz we dont want hear our own voice.
myVideo.muted = true

var peer = new Peer(undefined, {
    path: '/pathjs',
    host: '/', // / means any host it can be heroku, local or vercel or anythink
    port: '3030'
}); 


let myVideoStream
// Allow us to give access to steam our own video
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
    
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

peer.on('open', id => {
    console.log(id);
    socket.emit('join-room', ROOM_ID, id);
})


socket.on('user-connected', (userId) => {
    connectToNewUser(userId);
})

const connectToNewUser = (userId) => {
    console.log(userId);
}

const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        })
        videoGrid.append(video);
}
