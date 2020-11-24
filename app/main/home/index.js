const { BrowserWindow } = require('electron');
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

    
    home.loadURL(url.format({
        pathname: path.join(__dirname, '../../render/pages/home/index.html')
    }))
    
};

const send = (channel, ...args) => {
    home.webContents.send(channel, ...args)
};

module.exports = {
    create,
    send
}