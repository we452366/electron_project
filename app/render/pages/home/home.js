const { ipcRenderer } = window.require('electron');

const btn = document.getElementById('jmpBtn');

const startControl = () => {
    ipcRenderer.send('control', 1)
};

btn.addEventListener('click', startControl, true);