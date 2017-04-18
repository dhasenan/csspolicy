let lert = (msg) => {
	document.getElementById("lert").innerText = msg;
};

/*
Given the name of a beast, get the URL to the corresponding image.
*/
/*
Listen for clicks in the popup.

If the click is on one of the beasts:
  Inject the "beastify.js" content script in the active tab.

  Then get the active tab and send "beastify.js" a message
  containing the URL to the chosen beast's image.

If it's on a button wich contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/
let reloadCurrentTab = () => {
	browser.tabs.query({active: true, currentWindow: true})
		.then(
				(tabs) => browser.tabs.sendMessage(tabs[0].id, allowedHosts),
				(err) => lert('send err; ' + err));
};

let updateButton = document.getElementById('update');
updateButton.addEventListener("click", (e) => {
	let glommed = document.getElementById("allowedHosts").value;
	let hosts = glommed.split('\n');
	browser.storage.local.set({allowedHosts: {hosts}})
		.then(() => reloadCurrentTab(), (err) => lert('onoz! ' + err));
	//window.close();
});

browser.storage.local.get("allowedHosts")
.then((allowedHosts) => {
	lert('hosts: ' + JSON.stringify(allowedHosts));
	if (allowedHosts && allowedHosts.allowedHosts && allowedHosts.allowedHosts.hosts)
	{
		document.getElementById("allowedHosts").value = allowedHosts.allowedHosts.hosts.join('\n');
	}
}, (err) => lert('failed!'));
