import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
        frame: false,
        minHeight: 700,
        minWidth: 800,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    win.setMenu(null)

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        console.log('testing');
        win.loadURL(VITE_DEV_SERVER_URL);
        win.webContents.openDevTools();
    }
    else {
        console.log('testing 2');
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, 'index.html'))
    }
}

app.on('window-all-closed', () => {
    win = null;
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.whenReady().then(createWindow);

ipcMain.on('window-controls', (event, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win !== null) { //  
        switch (options.action) {
            case 'minimize':
                win.minimize()
                break;
            case 'maximize':
                if (win.isMaximized()) {
                    win.unmaximize()
                } else {
                    win.maximize()
                }
                break;
            case 'close':
                win.close();
                break;
            default:
                break;
        }
    }
});
