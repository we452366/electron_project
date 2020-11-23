const { BrowserWindow } = require('electron');
const path = require('path');

let control = null;

const create = () => {
    control = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    control.loadFile(path.resolve(__dirname, '../../render/pages/control/index.html'))
};

module.exports = {
    create
}