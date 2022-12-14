const { app, BrowserWindow } = require("electron");
const ipc = require("electron").ipcMain;
const { join } = require("path");

const autoUpdater = require("./main_modules/autoUpdater");

const { createLoadingWindow } = require("./main_modules/createLoadingWindow");
const { createMainWindow } = require("./main_modules/createMainWindow");

let window = null;
let loading = null;

app.setAppUserModelId(process.execPath);
app.setName("Zen");

app.once("ready", () => {
  require("vue-cli-plugin-electron-builder/lib").createProtocol("app");
  let loadingWindow = createLoadingWindow(app);
  let window = createMainWindow(app, loadingWindow);
  autoUpdater.init();

  ipc.on("event", (event, args) => {
    if (args.type == "forceQuit") {
      intent = true;
      app.quit();
    }

    if (args.type == "open") {
      window.show();
    }

    if (args.type == "hide") {
      window.minimize();
    }

    if (args.type == "notif_clicked") {
      ZEN_UNREAD = 0;
      window.show();
    }
  });
});
