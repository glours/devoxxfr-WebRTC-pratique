var localStream;

function hdConstraints(videoSource, audioSource, useVideo, useAudio) {

}

function isUserMediaSupported() {
    return !!navigator.mediaDevices.getUserMedia;
}

function stopStream(content) {

}

function userMedia() {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
    return navigator.getUserMedia;
}

function errorCallback(event) {
    console.log(event);
}

function mirrorVideo(videoContent, useVideo, useAudio) {
    navigator.getUserMedia({video : useVideo, audio : useAudio}, function(stream) {
        localStream = stream;
        videoContent.src = window.URL.createObjectURL(stream);;
    }, errorCallback);
}

/* not yet supported by chrome by default */
function mirrorFutureVersion(videoContent, useVideo, userAudio) {
    navigator.mediaDevices.getUserMedia({video : useVideo, audio : useAudio})
        .then(function(stream) {
            localStream = stream;
            videoContent.srcObject = localStream;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function sources(sourceInfos) {

}

function listOfDevice(video, audio) {

}

