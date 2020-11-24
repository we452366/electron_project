const { app } = require('electron');
const { create: createHome } = require('./home'); 
const handleIPC = require('./ipc');
const handle = require('./handle');

app.on('ready', () => {
    handleIPC();
    createHome();
    handle();
})