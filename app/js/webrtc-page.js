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

}

function muteLocalAudio(muteIcon, videoContent) {

}

function changeMuteIcon(muteIcon, isMuted) {

}

function volumeUp(videoContent, muteIcon) {

}

function volumeDown(videoContent, muteIcon) {

}