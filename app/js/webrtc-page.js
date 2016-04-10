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

function displayMirrorVideo(checkElementId, videoElementId) {
    if($('#' + checkElementId).is(':checked')) {
        if (userMedia()) {
            var mirror = $("#" + videoElementId)[0];
            mirrorVideo(mirror, true, false);
        } else {
            console.log("No userMedia :'-(");
        }
    } else {
        $('#' + videoElementId).hide();
    }
}