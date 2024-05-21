const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });

  win.webContents.openDevTools({ mode: "right" });

  win.loadFile("./src/html/index.html").then(() => {
    win.webContents.send("updateText", "Version checking..");
    fetch("https://api.github.com/repos/khe4oyan/test/releases/latest", {
      method: "GET",
    })
    .then((r) => r.json())
    .then((d) => {
      const remoteVersion = d.name
      const localVersion = app.getVersion()
      
      
      console.log('========= #1.1');
      console.log(remoteVersion, localVersion);
      
      let updateText = "No updates";
      if (remoteVersion !== localVersion) {
        updateText = "Close this app and update app";
        win.webContents.send(
          "onDownloadNewVersionInstaller",
          d.assets[0].browser_download_url
        );
      }
      
      win.webContents.send("updateText", updateText);
    });
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
