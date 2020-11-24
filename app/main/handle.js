const { Menu, MenuItem } = require('electron');

const menu = new Menu();

module.exports = function() {
    console.log('menu', menu)
}

