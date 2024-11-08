const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require('node:fs');
const { writeFile, readFile } = require('node:fs/promises');
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false // Disable remote module for security
    }
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:3000')


  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

ipcMain.on('save-image', async (event, dataUrl) => {
  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
  await writeFile(path.join(__dirname, 'saved-image.png'), base64Data, 'base64');
  console.log('Image is saved successfully');
});
ipcMain.handle('read-image', async (event) => {
  const files = await dialog.showOpenDialog({properties: ['openFile']});
  if (files) {
    const data = await readFile(files.filePaths[0]);
    const b64 = Buffer.from(data).toString('base64');
    const dataUrl = 'data:image/png;base64,'+b64;
    return dataUrl;
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

