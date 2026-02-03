const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // DEV: load Vite dev server
  win.loadURL('http://localhost:5173')

  // PROD (later):
  // win.loadFile('../frontend/dist/index.html')
}

app.whenReady().then(createWindow)
