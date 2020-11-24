const webSocket = require('ws');
// 创建websocket服务器
const wss = new webSocket.Server({port:8001});

const code2ws = new Map();
wss.on('connection', ( ws, request ) => {
    // 模拟随机码
    const code = Math.floor( Math.random() * ( 999999 - 100000 ) ) + 100000;
    code2ws.set(code, ws);

    // 发送消息
    ws.sendData = ( event, data ) => {
        ws.send(JSON.stringify({event, data}))
    };

    // 发送错误
    ws.sendError = msg => {
        ws.sendData('error', {msg});
    };

    // 监听消息
    ws.on('message', message => {
        console.log('接收过来的消息', message);
        // 容错处理
        let parsedMessage = {};
        try {
            parsedMessage = JSON.parse(message)
        } catch(e) {
            ws.sendError('message invalid');
            console.log('parse message error', e);
            return;
        }
        // 解构消息内容
        const { event, data } = parsedMessage;
        if ( event == 'login' ) {
            ws.sendData('已登录', { code })
        } else if ( event == 'control' ) {
            // 转换数据类型
            const remote = +data.remote;

            if(code2ws.has(remote)) {
                ws.sendData('已被控制', { remote });
                ws.sendRemote = code2ws.get(remote).sendData;
                code2ws.get(remote).sendData = ws.sendData;
            }
        } else if ( event == 'forward' ) {
            ws.sendData(data.event, data.data)
        }
    });

    // 关闭消息
    ws.on('close', () => {
        code2ws.delete(code);
        clearTimeout(ws._closeTimeout)
    });

    // 模拟延时
    ws._closeTimeout = setTimeout(() => {
        ws.terminate()
    }, 10*60*1000)
})