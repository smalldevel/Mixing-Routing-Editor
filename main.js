const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'Mixing Routing Editor',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');

  const menu = Menu.buildFromTemplate([
    {
      label: 'Datei',
      submenu: [
        { label: 'Projekt speichern', accelerator: 'CmdOrCtrl+S', click: () => win.webContents.executeJavaScript('exportJSON()') },
        { label: 'Drucken', accelerator: 'CmdOrCtrl+P', click: () => win.webContents.print() },
        { type: 'separator' },
        { role: 'quit', label: 'Beenden' },
      ],
    },
    {
      label: 'Ansicht',
      submenu: [
        { label: 'Kanäle', accelerator: 'CmdOrCtrl+1', click: () => win.webContents.executeJavaScript("switchTab('channels')") },
        { label: 'Routing-Matrix', accelerator: 'CmdOrCtrl+2', click: () => win.webContents.executeJavaScript("switchTab('routing')") },
        { label: 'Outputs', accelerator: 'CmdOrCtrl+3', click: () => win.webContents.executeJavaScript("switchTab('outputs')") },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Vollbild' },
        { role: 'toggleDevTools', label: 'Entwicklertools' },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
