var localStream;

function hdConstraints(useVideo, useAudio) {
    var hdConstraints = {};
    if(useVideo) {
        hdConstraints.video = {
            mandatory: {
                minWidth: 640,
                minHeight: 480,
                maxWidth: 1280,
                maxHeight: 720
            },
            optional: [
                {frameRate: 60},
                {aspectRatio: true},
                {facingMode: "user"}
            ]
        };
    }
    hdConstraints.audio = useAudio;
    return hdConstraints;
}

function isUserMediaSupported() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
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
    navigator.getUserMedia(hdConstraints(useVideo, useAudio), function(stream) {
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