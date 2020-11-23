const { desktopCapturer } = require('electron');

const video = document.getElementById('control-video');

const play = stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => video.play()
};

(function(){
    return new Promise((_resolve, _reject) => {
        desktopCapturer.getSources({
            types: ['window', 'screen']
        }).then(
            async sources => {
                console.log('sources', sources);

                for(const source of sources) {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            audio: false,
                            video: {
                                mandatory: {
                                    chromeMediaSource: 'desktop',
                                    chromeMediaSourceId: source.id,
                                    maxWidth: window.screen.width,
                                    maxHeight: window.screen.height
                                }
                            }
                        });
                        play(stream)
                    } catch(e) {
                        console.error(e)
                    }
                }
            }
        )
    })
})();