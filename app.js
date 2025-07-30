const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { compareLoots } = require('./compareLoots');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);


ipcMain.handle('compare-files', async (event, chestFile, lootFile) => {
  const result = compareLoots(chestFile, lootFile);
  return result;
});
