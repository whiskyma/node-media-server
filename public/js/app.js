if (flvjs.isSupported()) {
    var videoElement = document.getElementById('videoElement')
    var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'http://192.168.1.8:8000/live/whiskyma.flv' //从流媒体服务器拉流
    })
    flvPlayer.attachMediaElement(videoElement)
    flvPlayer.load()
    flvPlayer.play()
}