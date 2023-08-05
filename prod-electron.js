/* jshint node: true */
"use strict";

const electron = require("electron");
const path = require("path");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const dirname = __dirname || path.resolve(path.dirname());
const emberAppLocation = `file://${dirname}/index.html`;

let mainWindow = null;
let necesita_confirmar_para_cerrar_la_ventana = false;

global.sharedObj = { desarrollo: false };

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
      nodeIntegration: true
    }
  });

  // Este evento "cambia-estado-guardado" sirve para que electron
  // sepa si tiene que pedirle al usuario configuración para cerrar
  // la ventana o no. Hay un service de lado de ember llamado Proyecto
  // que se encarga de mantener informado a este proceso principal
  // el estado de guardado.
  ipcMain.on('cambia-estado-guardado', (event, estado) => {
    // esta variable se usa nuevamente en el handler para cerrar
    // la ventana, buscar "close" en este mismo archivo para más
    // detalles.
    necesita_confirmar_para_cerrar_la_ventana = estado;
  });


  delete mainWindow.module;

  mainWindow.loadURL(emberAppLocation);

  mainWindow.webContents.on("did-fail-load", () => {
    mainWindow.loadURL(emberAppLocation);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  var close = false;

  mainWindow.on("close", (event) => {
    if (necesita_confirmar_para_cerrar_la_ventana && close === false) {
      event.preventDefault();

      electron.dialog.showMessageBox({
        type: 'warning',
        buttons: ['No', 'Sí, quiero salir'],
        title: '¿Realmente quieres salir?',
        message: '¿Realmente quieres salir?, se pueden perder los cambios sin guardar',
        cancelId: 1,
        defaultId: 1,
        noLink: true
      }).then((val) => {

        if (val.response === 0) {
          // Cancel the close process
        } else if (mainWindow) {
          close = true
          mainWindow.close()
        }
      });
    }
  });


  process.on("uncaughtException", err => {
    console.log("An exception in the main thread was not handled.");
    console.log("This is a serious issue that needs to be handled and/or debugged.");
    console.log(`Exception: ${err}`);
  });
});
