const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const download = require('download');
const {
  app,
  protocol,
  BrowserWindow
} = electron;

let mainWindow;
let contents;


app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, 'plugins/pepflashplayer64_23_0_0_162.dll'));

// Optional: Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '23.0.0.162');

function ready() {
	
  let displays = electron.screen.getAllDisplays();
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  if(externalDisplay) {
    mainWindow = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50
    });
    mainWindow.loadURL('https://github.com');
  } else {
    mainWindow = new BrowserWindow({
      width: 1280,
      height: 900,
      webPreferences: {
        nodeIntegration: false,
		plugins: true
      }
    });
  }

  mainWindow.loadURL('http://www.weya.lan');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', ready);

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if(mainWindow === null) {
    ready();
  }
});
