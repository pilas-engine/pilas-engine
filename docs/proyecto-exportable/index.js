const{app:app,BrowserWindow:BrowserWindow}=require("electron"),path=require("path"),pantalla_completa=!1
let mainWindow
function createWindow(){mainWindow=new BrowserWindow({width:800,height:600,fullscreen:!1}),mainWindow.setMenu(null),mainWindow.removeMenu(),mainWindow.loadFile("index.html"),mainWindow.on("closed",(function(){mainWindow=null}))}app.on("ready",createWindow),app.on("window-all-closed",(function(){app.quit()})),app.on("activate",(function(){null===mainWindow&&createWindow()}))
