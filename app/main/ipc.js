const { ipcMain } = require('electron');

const { send: sendHome } = require('./home');
const { create: createControl } = require('./control');

module.exports = function() {
    ipcMain.handle('home', async () => {
        // mock
        let code = Math.floor(Math.random() * ( 1 - 0 )) + 0;
        console.log('home state', code);
        return code;
    });
    ipcMain.on('control', async (e,code) => {
        sendHome('control state change', code, 1);
        createControl();
    })
}