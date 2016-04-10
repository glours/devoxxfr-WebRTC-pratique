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

function displayMirrorVideo(checkElementId, videoElementId, videoSource, audioSource) {
    var mirror = $("#" + videoElementId);
    if($('#' + checkElementId).is(':checked')) {
        mirror.show();
        if (userMedia()) {
            mirrorVideo(mirror[0],videoSource, audioSource, true, false);
        } else {
            console.log("No userMedia :'-(");
        }
    } else {
        stopStream(mirror);
        mirror.hide();
    }
}

$(document).ready(function(){

});

