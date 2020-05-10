const { app, BrowserWindow } = require("electron");
const path = require("path");

const pantalla_completa = false;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: pantalla_completa
  });

  mainWindow.loadFile("index.html");

  // Activa esta linea para abrir las herramientas de desarrollo.
  // mainWindow.webContents.openDevTools()

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createWindow();
});
