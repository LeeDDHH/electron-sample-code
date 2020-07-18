const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve("./preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.on("require-send-notice", (e) => {
    const notification = new Notification({
      title: "基本的な通知",
      body: "簡単なメッセージ",
      silent: false,
    });

    notification.show();

    setTimeout(
      (notification) => {
        notification.close();
      },
      5000,
      notification
    );
  });

  ipcMain.handle("is-notification-supported", (event) => {
    return Notification.isSupported();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
