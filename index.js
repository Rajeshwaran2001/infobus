const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  // Get the screen size of the user's display
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  
  // Create the main window with the screen size
  mainWindow = new BrowserWindow({ width, height });
  mainWindow.loadURL('https://test.infobus.in/login');

  

  // Check for updates on app start
  autoUpdater.checkForUpdatesAndNotify();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common for
// applications and their menu bar to stay active until the user quits explicitly
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Listen for updates
autoUpdater.on('update-available', () => {
  console.log('Update available');
});

autoUpdater.on('update-not-available', () => {
  console.log('No update available');
});

autoUpdater.on('error', (err) => {
  console.error('Error checking for updates', err);
});

autoUpdater.on('download-progress', (progressObj) => {
  console.log(`Downloaded ${progressObj.percent}%`);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded');
  // Prompt the user to install the update
  autoUpdater.quitAndInstall();
});