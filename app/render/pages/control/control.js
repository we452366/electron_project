const { desktopCapturer } = require('electron');
const EventEmitter = require('events');
const peer = new EventEmitter();

const video = document.getElementById('control-video');

const play = stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => video.play()
};

peer.on('add stream', stream => {
    console.log('4444');
    play(stream);
})

// 绑定键盘操作事件
window.onkeydown = function(e) {
    console.log('onkeydown', e)
}

// 绑定鼠标操作事件
window.onmouseup = function(e) {
    console.log('onmouseup', e)
}

// 绑定远程连接事件
window.setRemote = setRemote;

// 绑定交互式连接事件
window.addIceCandidate = addIceCandidate;

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
                    } catch(_reject) {
                        console.error(_reject)
                    }
                }
            }
        )
    })
})();

// WebRTC连接
const pc = new window.RTCPeerConnection({});

// 创建一个远程请求
async function createOffer() {
    const offer = await pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true
    });
    await pc.setLocalDescription(offer);
    console.log('pc offer', JSON.stringify(offer));

    return pc.localDescription;
};

createOffer();

// 设置远程SDP Session Description Protocol
async function setRemote(answer) {
    await pc.setRemoteDescription(answer)
}

// 监听媒体流
pc.onaddstream = function(e) {
    console.log('add stream', e);
    peer.emit('add stream', e.stream)
};

// 设置ICE穿透 Interactive Connectivity Establishment
let candidates = [];
async function addIceCandidate(candidate) {
    if(candidate) candidates.push(candidate);

    if(pc.remoteDescription && pc.remoteDescription.type) {
        for( let i=0; i< candidates.length; i++ ) {
            await pc.addIceCandidate(new RTCIceCandidate(candidates[i]))
        };
        candidates = [];
    }
};

// 监听ICE事件
pc.onicecandidate = function(e) {
    console.log('candidate', JSON.stringify(e.candidate));
};

