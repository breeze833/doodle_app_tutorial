const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('localAPI', {
  saveImage: (dataUrl) => ipcRenderer.send('save-image', dataUrl)
});
