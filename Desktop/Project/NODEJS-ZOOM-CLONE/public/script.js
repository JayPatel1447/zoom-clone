
//  getElementById(video-grid) where video-grid is id property of room.ejs 
// continue: so you can pass id here to call and set video in grid formate this is the
// great functionality of ejs - Embedded JavaScript
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');

// We set our own video to be muted why cz we dont want hear our own voice.
myVideo.muted = true

let myVideoStream
// Allow us to give access to steam our own video
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
    
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        })
        videoGrid.append(video);
       
}
