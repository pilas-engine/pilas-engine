/* jshint node: true */
"use strict";

const electron = require("electron");
const path = require("path");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const dirname = __dirname || path.resolve(path.dirname());
const emberAppLocation = `file://${dirname}/dist/index.html`;
const fs = require("fs");

let mainWindow = null;

global.sharedObj = { desarrollo: true };

app.on("window-all-closed", function onWindowAllClosed() {
  app.quit();
});

app.on("ready", function onReady() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    minWidth: 800,
    minHeight: 650,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true
    }
  });

  var rutas = [`${dirname}/dist/index.html`, `${dirname}/dist/pilas-engine.js`, `${dirname}/dist/assets/pilas-engine.js`, `${dirname}/dist/assets/vendor.js`, `${dirname}/dist/assets/pilas-engine.css`];
  let ultima_actualizacion = new Date();

  rutas.map(function(ruta) {
    fs.watch(ruta, function() {
      let ahora = new Date();
      let tiempo_desde_ultima_actualizacion = (ahora - ultima_actualizacion) / 1000;

      // Previene hacer multiples actualizaciones cuando ember compila varias cosas.
      if (tiempo_desde_ultima_actualizacion > 3) {
        ultima_actualizacion = ahora;
        mainWindow.webContents.send("reload", {});
      }
    });
  });

  delete mainWindow.module;

  mainWindow.loadURL(emberAppLocation);

  mainWindow.webContents.on("did-fail-load", () => {
    mainWindow.loadURL(emberAppLocation);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  process.on("uncaughtException", err => {
    console.log("An exception in the main thread was not handled.");
    console.log("This is a serious issue that needs to be handled and/or debugged.");
    console.log(`Exception: ${err}`);
  });
});
