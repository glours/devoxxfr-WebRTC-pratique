function displayWebRTCSupport(checkElementId, contentElementId) {
    if($('#' + checkElementId).is(':checked')) {
        var isSupported = 'Your browser support getUserMedia !';
        if (!isUserMediaSupported()) {
            isSupported = 'getUserMedia() is not supported in your browser';
        }
        $("#" + contentElementId).html(isSupported);
        $('#' + contentElementId).show();
    } else {
        $('#' + contentElementId).hide();
    }
}