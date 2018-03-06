const path = require('path')
const electron = require('electron')
const ipcMain = electron.ipcMain
const app = electron.app
const Menu = electron.Menu
const Tray = electron.Tray

let appIcon = null

ipcMain.on('toggle-tray', function (event) {
    if (appIcon === null || appIcon.isDestroyed()) {
        createTrayIcon();
    } else {
        appIcon.destroy()
    }
})

ipcMain.on('destroy-tray', function () {
    appIcon.destroy();
})

ipcMain.on('quit-application', function () {
    console.log('Quit App');
})

app.on('window-all-closed', function () {
    if (process.platform === 'darwin' && (appIcon === null || appIcon.isDestroyed())) {
        createTrayIcon();
    }
    //if (appIcon) appIcon.destroy()
})

function createTrayIcon() {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, iconName)

    appIcon = new Tray(iconPath)

    const contextMenu = Menu.buildFromTemplate(
        [
            {
                label: 'Remove from tray',
                click: function () {
                    event.sender.send('tray-removed')
                }
            },
            {
                label: 'Quit ElectronHour',
                click: function () {
                    event.sender.send('tray-quit')
                }
            }
        ]
    )

    appIcon.setToolTip('ElectronHour')
    appIcon.setContextMenu(contextMenu)
}
