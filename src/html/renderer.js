electronAPI.onUpdateText((response) => {
	const p = document.querySelector('.version');
	p.innerHTML = response;
});

electronAPI.onDownloadNewVersionInstaller((response) => {
	const a = document.createElement('a');
	a.href = response;
	a.download = response;
	a.click();
});

const button = document.querySelector('#msgButton');
button.addEventListener("click", () => {
	electronAPI.sendMessage();
});