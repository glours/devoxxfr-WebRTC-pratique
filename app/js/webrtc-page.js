function displayWebRTCSupport(checkElementId, contentElementId) {
    var contentElement = $("#" + contentElementId);
    if($('#' + checkElementId).is(':checked')) {
        var isSupported = 'Your browser support getUserMedia !';
        if (!isUserMediaSupported()) {
            isSupported = 'getUserMedia() is not supported in your browser';
        }
        contentElement.html(isSupported);
        contentElement.show();
    } else {
        contentElement.hide();
    }
}

function displayMirrorVideo(checkElementId, localStreamBlock, videoSource, audioSource, remoteMenu) {
    var block = $("#" + localStreamBlock);
    var mirror = block.find("video");
    if($('#' + checkElementId).is(':checked')) {
        block.show();
        $('#' + remoteMenu).show();
        if (userMedia()) {
            mirrorVideo(mirror[0],videoSource, audioSource, true, false);
        } else {
            console.log("No userMedia :'-(");
        }
    } else {
        stopLocalSteam(mirror);
        block.hide();
        $('#' + remoteMenu).hide();
    }
}


function hideVideo(hideVideoIcon) {
    var icon  = $('#' + hideVideoIcon +" > span");
    if(icon.hasClass('glyphicon-play')) {
        simpleweb().resume();
        icon.removeClass("glyphicon-play").addClass("glyphicon-pause");
    } else {
        simpleweb().pause();
        icon.removeClass("glyphicon-pause").addClass("glyphicon-play");
    }
}

function muteLocalAudio(muteIcon, videoContent) {
    var video = $('#' + videoContent)[0];
    video.muted = !video.muted;
    if(video.muted) {
        simpleweb().mute();
    } else {
        simpleweb().unmute();
    }
    changeMuteIcon(muteIcon, video.muted);
}

function changeMuteIcon(muteIcon, ismuted) {
    var icon = $('#'+muteIcon +' > span');
    if (ismuted) {
        icon.addClass('alert-danger');
    } else {
        icon.removeClass('alert-danger');
    }
}

function volumeUp(videoContent, muteIcon) {
    var video = $('#' + videoContent)[0];
    var currentVolume = video.volume;
    if (currentVolume < 1.0 || video.muted) {
        if(video.muted) { muteLocalAudio(muteIcon, videoContent);}
        var newVolume = currentVolume + 0.2;
        video.volume = newVolume > 1 ? 1 : newVolume;
        simpleweb().setVolumeForAll(video.volume);
    }
}

function volumeDown(videoContent, muteIcon) {
    var video = $('#' + videoContent)[0];
    var currentVolume = video.volume;
    if (currentVolume > 0.0 && !video.muted) {
        if(video.muted) { muteLocalAudio(muteIcon, videoContent);}
        var newVolume = currentVolume - 0.2;
        if(newVolume <= 0.0 && !video.muted) { muteLocalAudio(muteIcon, videoContent);}
        video.volume = newVolume < 0 ? 0 : newVolume;
        simpleweb().setVolumeForAll(video.volume);
    }
}

function displayRemoteVideo(checkElementId, videoContent) {
    var block = $("#" + videoContent);
    var remote = block.find("video");
    if($('#' + checkElementId).is(':checked')) {
        $(".remote").show();
        if (userMedia()) {

        } else {
            console.log("No userMedia :'-(");
        }
    } else {
        stopRemoteStream(remote);
        $(".remote").hide();
    }
}

function call(btnCall, btnHangup, btnChat) {
    $('#' + btnCall).prop("disabled",true);
    $('#' + btnHangup).prop("disabled",false);
    $('#' + btnChat).prop("disabled",false);
    initializeVideoChat({
        localVideo : 'mirrorVideo',
        remoteVideos : 'remoteVideos',
        roomName :'MyRoom',
        msgBox :'msg',
        chatSection : 'messages',
        localScreenContainer : 'localScreenContainer'
        /*,
         opts : {
         signalServerUrl : 'stun.l.google.com:19302'
         },*/
    });

    var button = $('#screenShareButton'),
        setButton = function (bool) {
            button.innerText = bool ? 'share screen' : 'stop sharing';
        };
    if (!simpleweb().capabilities.screenSharing) {
        button.disabled = 'disabled';
    }
    simpleweb().on('localScreenRemoved', function () {
        setButton(true);
    });

    setButton(true);

    button.click(function () {
        if (simpleweb().getLocalScreen()) {
            simpleweb().stopScreenShare();
            setButton(true);
        } else {
            simpleweb().shareScreen(function (err) {
                if (err) {
                    console.error(err);
                    setButton(true);
                } else {
                    setButton(false);
                }
            });

        }
    });

}

function hangUp(btnCall, btnHangup, btnChat) {
    $('#' + btnCall).prop("disabled",false);
    $('#' + btnHangup).prop("disabled",true);
    $('#' + btnChat).prop("disabled",true);
    hangupSession();
}

function sendLocalMessage(input) {
    sendMessage($('#' + input).val());
    $('#'+ input).val("");
}