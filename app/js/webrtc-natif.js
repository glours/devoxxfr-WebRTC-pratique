var audioSelect;
var videoSelect;
var localPeerConnection;
var remotePeerConnection;
var localDataChannel;
var remoteDataChannel;

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

function stopLocalSteam(content) {
    content.src = null;
    localDataChannel.close();
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


function remoteVideo(videoContent, display) {

    var servers = null;
    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;


    localPeerConnection = new RTCPeerConnection(servers);
    localPeerConnection.onicecandidate = localIceCandidate;

    localDataChannel = localPeerConnection.createDataChannel('My_Channel_Name', {reliable : false});

    localDataChannel.onopen = handleDataChannelStateChange;
    localDataChannel.onerror = handleDataChannelStateChange;
    localDataChannel.onmessage = function(event) { handleMessage(event, display);};



    remotePeerConnection = new RTCPeerConnection(servers);
    remotePeerConnection.onicecandidate = remoteIceCandidate;
    remotePeerConnection.onaddstream = function(event) {
        window.remoteStream = event.stream;
        videoContent.src = URL.createObjectURL(window.remoteStream);
    };
    remotePeerConnection.ondatachannel = function(event) {
        remoteDataChannel = event.channel;
        remoteDataChannel.onopen = handleDataChannelStateChange;
        remoteDataChannel.onclose = handleDataChannelStateChange;
        // Specific case of our example, usually you don't have to manage remote display.
        remoteDataChannel.onmessage = function(event) { handleMessage(event, $('#messages') );};
    };

    localPeerConnection.addStream(localStream);
    localPeerConnection.createOffer(localDescription,errorCallback);
}

function localDescription(description){
    localPeerConnection.setLocalDescription(description);
    remotePeerConnection.setRemoteDescription(description);
    remotePeerConnection.createAnswer(remoteDescription,errorCallback);
}

function remoteDescription(description){
    remotePeerConnection.setLocalDescription(description);
    localPeerConnection.setRemoteDescription(description);
}

function localIceCandidate(event){
    if (event.candidate) {
        remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
    }
}

function remoteIceCandidate(event){
    if (event.candidate) {
        localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
    }
}

function stopRemoteStream(remote) {
    remote.src = null;
    remoteDataChannel.close();
    window.remoteStream.getTracks().forEach(function (track) { track.stop(); });
}

function handleDataChannelStateChange(event) {
    var state = this.readyState;
    console.log(state);
}

function handleMessage(event, display) {
    display.append('<p>' + event.data + '</p>');
}

function sendLocalData(input) {
    sendData(input, localDataChannel);
}

function sendRemoteData(input) {
    sendData(input, remoteDataChannel);
}

function sendData(input, channel) {
    channel.send(input);
}

function initRemoteDataChannel(event) {
    remoteDataChannel = event.channel;
    remoteDataChannel.onopen = handleDataChannelStateChange;
    remoteDataChannel.onclose = handleDataChannelStateChange;
    // Specific case of our example, usually you don't have to manage remote display.
    remoteDataChannel.onmessage = function(event) { handleMessage(event, $('#chat') );};
}