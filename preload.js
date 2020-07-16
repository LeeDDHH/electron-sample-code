const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  isSupportedNotice: () => ipcRenderer.invoke("is-notification-supported").then(result => result).catch(err => console.log(err)),
  noSupportedNotice: () => false,
  notice: () => ipcRenderer.send("require-send-notice"),
});
