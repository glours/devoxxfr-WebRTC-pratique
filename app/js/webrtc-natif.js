var audioSelect;
var videoSelect;

function hdConstraints(videoSource, audioSource, useVideo, useAudio) {
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
                {sourceId: videoSource},
                {frameRate: 60},
                {aspectRatio: true},
                {facingMode: "user"}
            ]
        };
    }
    hdConstraints.audio = {
        useAudio,
        optional : [
            {sourceId : audioSource}
        ]
    } ;
    return hdConstraints;
}

function isUserMediaSupported() {
    return !!navigator.mediaDevices.getUserMedia;
}

function stopStream(content) {
    content.src = null;
    window.localStream.getTracks().forEach(function (track) { track.stop(); });
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

function mirrorVideo(videoContent, videoSource, audioSource,  useVideo, useAudio) {
    navigator.getUserMedia(hdConstraints(videoSource, audioSource, useVideo, useAudio), function(stream) {
        window.localStream = stream;
        videoContent.src = window.URL.createObjectURL(stream);;
    }, errorCallback);
}

/* not yet supported by chrome by default */
function mirrorFutureVersion(videoContent, useVideo, userAudio) {
    navigator.mediaDevices.getUserMedia({video : useVideo, audio : useAudio})
        .then(function(stream) {
            window.localStream = stream;
            videoContent.srcObject = window.localStream;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function sources(sourceInfos) {
    sourceInfos.forEach(function(sourceInfo){
        var option = document.createElement('option');
        option.value = sourceInfo.id;
        if (sourceInfo.kind === 'audioinput') {
            option.text = sourceInfo.label || 'microphone ' +
                (audioSelect.length + 1);
            audioSelect.appendChild(option);
        } else if (sourceInfo.kind === 'videoinput') {
            option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
            videoSelect.appendChild(option);
        } else {
            console.log('Some other kind of source: ', sourceInfo);
        }
    });
}

function listOfDevice(video, audio) {
    audioSelect = audio;
    videoSelect= video;
    if (typeof navigator.mediaDevices=== 'undefined' ||
        typeof navigator.mediaDevices.enumerateDevices === 'undefined') {
        alert('This browser does not support MediaDevices.\n\nTry Chrome or Firefox.');
    } else {
        navigator.mediaDevices.enumerateDevices().then(sources);
    }
}

