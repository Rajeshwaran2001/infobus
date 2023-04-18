const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
let loadingScreen;

function createLoadingScreen() {
  // Create the loading screen with a loading indicator
  loadingScreen = new BrowserWindow({ width: 400, height: 400, frame: false });
  loadingScreen.loadURL(`file://${__dirname}/loading.html`);
  loadingScreen.on('closed', () => (loadingScreen = null));
}

function createWindow() {
  // Get the screen size of the user's display
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

  // Create the main window with the screen size
  mainWindow = new BrowserWindow({ width, height, show: false });
  mainWindow.loadURL('https://infobus.in/login');

  // Show the loading screen while the page is loading
  mainWindow.once('ready-to-show', () => {
    if (loadingScreen) {
      loadingScreen.close();
    }
    mainWindow.show();
  });

  // Check for updates on app start
  autoUpdater.checkForUpdatesAndNotify();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createLoadingScreen();
  createWindow();
});

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

// Prevent the app from running during uninstallation
app.on('before-quit', () => {
  if (process.platform === 'win32' && process.argv.includes('--squirrel-uninstall')) {
    app.exit();
  }
});

// Listen for updates
app.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

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