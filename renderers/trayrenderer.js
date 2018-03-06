const ipc = require('electron').ipcRenderer
const trayBtn = document.getElementById('put-in-tray')

trayBtn.addEventListener('click', function (event) {
    ipc.send('toggle-tray')
})

ipc.on('tray-quit', function() {
    console.log('Quit')
})

ipc.on('tray-removed', function () {
  ipc.send('destroy-tray')
})
