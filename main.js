const {app, BrowserWindow} = require("electron")


function createWindow(){
	const mainWindow = new BrowserWindow({
		width:800,
		height:600
	})

	mainWindow.loadFile("src/ui/index.html")

	// for js console
	mainWindow.webContents.openDevTools()
}


app.whenReady().then(() => {
	createWindow()
})