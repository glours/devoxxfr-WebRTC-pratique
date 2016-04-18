var simpleWebRTC;
var configuration;

function initializeVideoChat(config) {
    configuration = config;
    simpleWebRTC = initWebRtc(config.localVideo, config.remoteVideos, config.opts);

    iceFailed();
    iceConnectivityError();
    addVideo(config);

    chatMessageEvent(config.chatSection);

    simpleWebRTC.on('readyToCall', function () {
        simpleWebRTC.joinRoom(config.roomName);
        $('#' + config.shadowDiv).addClass('hidden');
    });

    simpleWebRTC.on("localMediaError", function(data) {
        console.log("data");
    });
    return simpleWebRTC;
}


function initWebRtc(localVideo, remoteVideos, config) {
    return new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: localVideo,
        // the id/element dom element that will hold remote videos
        remoteVideosEl: remoteVideos,
        // immediately ask for media access
        autoRequestMedia: true,
        media : {
            video : true,
            audio : true
        },
        receiveMedia: { // FIXME: remove old chrome <= 37 constraints format
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        },
        enableDataChannels: true
        //url: config.signalServerUrl,
        //nick : config.nick
    });
}

function iceFailed() {
    // local p2p/ice failure
    simpleWebRTC.on('iceFailed', function (peer) {
        var connectionState = document.querySelector('#container_' + simpleWebRTC.getDomId(peer) + ' .connectionstate');
        if (connectionState) {
            connectionState.innerText = 'Connection failed.';
        }
    });
}

function iceConnectivityError() {
// remote p2p/ice failure
    simpleWebRTC.on('connectivityError', function (peer) {
        var connectionState = document.querySelector('#container_' + simpleWebRTC.getDomId(peer) + ' .connectionstate');
        if (connectionState) {
            connectionState.innerText = 'Connection failed.';
        }
    });
}

function addVideo(config) {
    // a peer video has been added
    simpleWebRTC.on('videoAdded', function (video, peer) {
        var remotes = document.getElementById('remoteVideo');
        if (remotes) {
            var container = document.createElement('div');
            container.id = 'container_' + simpleWebRTC.getDomId(peer);
            container.appendChild(video);

            // suppress contextmenu
            video.oncontextmenu = function () { return false; };

            remotes.appendChild(container);
            // show the ice connection state
            if (peer && peer.pc) {
                var connectionState = document.createElement('div');
                connectionState.className = 'connectionstate';
                container.appendChild(connectionState);
                peer.pc.on('iceConnectionStateChange', function (event) {
                    switch (peer.pc.iceConnectionState) {
                        case 'checking':
                            connectionState.innerText = 'Connecting to peer...';
                            console.info('Connecting to peer...');
                            break;
                        case 'connected':
                            console.info('Connected');
                            break;
                        case 'completed': // on caller side
                            connectionState.innerText = 'Connection established.';
                            console.info('Connection established....');
                            break;
                        case 'disconnected':
                            connectionState.innerText = 'Disconnected.';
                            console.info('Connection disconnected....');
                            break;
                        case 'failed':
                            console.info('Connection failed....');
                            break;
                        case 'closed':
                            connectionState.innerText = 'Connection closed.';
                            console.info('Connection closed....');
                            break;
                    }
                });
            }
        }

    });
}

function sendMessage(msg) {
    simpleWebRTC.sendDirectlyToAll('myChatChannel', 'chatMessage', {message: msg, nick : "The other"});
    $("#"+configuration.chatSection).append('<p><span>Me : </span> ' + msg + '</p>');
    $("#"+configuration.chatSection).scrollTop($("#"+configuration.chatSection)[0].scrollHeight);
}

function chatMessageEvent(chatDiv) {
    simpleWebRTC.on('channelMessage', function(peer, label ,data) {
        if(data.type === 'chatMessage') {
            $("#"+chatDiv).append('<p><bold>' + data.payload.nick + '</bold> : ' + data.payload.message + '</p>');
            $("#"+chatDiv).scrollTop($("#"+chatDiv)[0].scrollHeight);
        }
    });
}

function hangupSession() {
    if (simpleWebRTC) {
        videocallActive = false;
        simpleWebRTC.stopLocalVideo();
        simpleWebRTC.leaveRoom();
        simpleWebRTC.connection.disconnect();
        simpleWebRTC = null;
    }
}

function simpleweb() {
    return simpleWebRTC;
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

