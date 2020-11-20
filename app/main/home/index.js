const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

let home = null;

const create = () => {
    home = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if(isDev) {
        home.loadURL('http://localhost:3000');
    } else {
        home.loadURL(url.format({
            pathname: path.join(__dirname, '../../render/build/index.html')
        }))
    }
};

const send = (channel, ...args) => {
    home.webContents.send(channel, ...args)
};

module.exports = {
    create,
    send
}