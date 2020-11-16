const { app, BrowserWindow } = require('electron');
let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.on('close', () => {
        mainWindow = null
    })
})