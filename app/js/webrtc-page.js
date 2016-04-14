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


function hideVideo(hideVideoIcon, videoContent) {
    var video = $('#' + videoContent)[0];
    if(video.paused) {
        video.play();
        $('#' + hideVideoIcon +" > span").removeClass("glyphicon-play").addClass("glyphicon-pause");
    } else {
        video.pause();
        $('#' + hideVideoIcon +" > span").removeClass("glyphicon-pause").addClass("glyphicon-play");
    }
}

function muteLocalAudio(muteIcon, videoContent) {
    var video = $('#' + videoContent)[0];
    video.muted = !video.muted;
    changeMuteIcon(muteIcon, video.muted);
}

function changeMuteIcon(muteIcon, isMuted) {
    var icon = $('#'+muteIcon);
    if (isMuted) {
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
    }
}

function displayRemoteVideo(checkElementId, videoContent) {
    var block = $("#" + videoContent);
    var remote = block.find("video");
    if($('#' + checkElementId).is(':checked')) {
        block.show();
        if (userMedia()) {

        } else {
            console.log("No userMedia :'-(");
        }
    } else {
        stopRemoteStream(remote);
        block.hide();
    }
}

function call(btnCall, btnHangup, remoteVideoContent) {
    $('#' + btnCall)[0].disabled = true;
    $('#' + btnHangup)[0].disabled = false;
    remoteVideo($('#' + remoteVideoContent)[0]);
}

function hangUp(btnCall, btnHangup, remoteVideoContent) {
    $('#' + btnCall)[0].disabled = false;
    $('#' + btnHangup)[0].disabled = true;
    stopRemoteStream(remoteVideoContent[0]);
}