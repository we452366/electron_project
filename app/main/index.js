const { app } = require('electron');
const { create: createHome } = require('./home'); 
const handleIPC = require('./ipc');

app.on('ready', () => {
    handleIPC();
    createHome();
})