const { ipcRenderer, desktopCapturer } = window.require('electron');

const btn = document.getElementById('jmpBtn');

const startControl = () => {
    ipcRenderer.send('control', 1)
};

btn.addEventListener('click', startControl, true);

// 绑定响应事件
window.createAnswer = createAnswer;

function getScreenStream() {
    return new Promise((_resolve, _reject) => {
        desktopCapturer.getSources({
            types: ['window', 'screen']
        }).then(
            async sources => {
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
                        _resolve(stream)
                    } catch(_reject) {
                        console.error(_reject)
                    }
                }
            }
        )
    })
};

// WebRTC连接
const pc = new window.RTCPeerConnection({});

// 创建一个远程响应
async function createAnswer(offer) {
    const screenStream = await getScreenStream(offer);
    pc.addStream(screenStream);
    await pc.setRemoteDescription(offer);
    await pc.setLocalDescription(await pc.createAnswer());

    console.log('answer', JSON.stringify(pc.localDescription));

    return pc.localDescription;
}