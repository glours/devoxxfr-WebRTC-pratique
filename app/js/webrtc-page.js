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

function displayMirrorVideo(checkElementId, localStreamBlock, videoSource, audioSource) {
    var block = $("#" + localStreamBlock);
    var mirror = block.find("video");
    if($('#' + checkElementId).is(':checked')) {
        block.show();
        if (userMedia()) {
            mirrorVideo(mirror[0],videoSource, audioSource, true, false);
        } else {
            console.log("No userMedia :'-(");
        }
    } else {
        stopStream(mirror);
        block.hide();
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