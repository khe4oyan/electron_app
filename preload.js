const { contextBridge, ipcRenderer } = require("electron");

// Экспортируем функцию для рендер-процесса через contextBridge
contextBridge.exposeInMainWorld("electronAPI", {
	onUpdateText(callback) {
		ipcRenderer.on('updateText', (_, response) => {
			callback(response);
		});
	},
	onDownloadNewVersionInstaller(callback) {
		ipcRenderer.on('onDownloadNewVersionInstaller', (_, response) => {
			callback(response);
		});
	},
	sendMessage() {
		ipcRenderer.send('msg', 'message');
	}
});
