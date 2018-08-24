/* jshint node: true */
"use strict";

const electron = require("electron");
const path = require("path");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dirname = __dirname || path.resolve(path.dirname());
const emberAppLocation = `file://${dirname}/index.html`;

let mainWindow = null;

global.sharedObj = { desarrollo: false };

app.on("window-all-closed", function onWindowAllClosed() {
  app.quit();
});

app.on("ready", function onReady() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    minWidth: 800,
    minHeight: 650
  });

  delete mainWindow.module;

  mainWindow.loadURL(emberAppLocation);

  mainWindow.webContents.on("did-fail-load", () => {
    mainWindow.loadURL(emberAppLocation);
  });

  mainWindow.webContents.on("crashed", () => {
    console.log("Your Ember app (or other code) in the main window has crashed.");
    console.log("This is a serious issue that needs to be handled and/or debugged.");
  });

  mainWindow.on("unresponsive", () => {
    console.log("Your Ember app (or other code) has made the window unresponsive.");
  });

  mainWindow.on("responsive", () => {
    console.log("The main window has become responsive again.");
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
