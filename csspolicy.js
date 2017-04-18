(function() {
	let destyled = false;

	let matchDomain = (allowedHosts) => {
		let host = window.location.hostname;
		for (let i = 0; i < allowedHosts.length; i++)
		{
			if (host.endsWith(allowedHosts[i]))
			{
				return true;
			}
		}
		return false;
	};

	let maybeDestyle = (allowedHosts) => {
		console.log(allowedHosts);
		if (matchDomain(allowedHosts))
		{
			// This domain is authorized to use CSS.
			return;
		}
		destyled = true;
		let styles = document.getElementsByTagName('style');
		console.log(`${styles.length} inline style blocks to remove`);
		for (let i = 0; i < styles.length; i++)
		{
			styles[i].remove();
		}
		let sheets = document.querySelectorAll('link[rel=stylesheet]');
		console.log(`${sheets.length} stylesheet links to remove`);
		for (let i = 0; i < sheets.length; i++)
		{
			sheets[i].remove();
		}
		console.log(`CSS Policy: removed ${styles.length} inline styles and ${sheets.length} stylesheets`);
	};

	browser.storage.local.get("allowedHosts")
	.then((allowedHosts) => {
		console.log(allowedHosts);
		allowedHosts = allowedHosts.allowedHosts.hosts || ['google.com', 'github.com'];
		maybeDestyle(allowedHosts);
	}, (err) => {
		console.log(`error loading allowedHosts: $err Assuming nothing is allowed.`);
		maybeDestyle([]);
	});

	browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
		console.log(request);
		browser.storage.local.get("allowedHosts")
		.then((allowedHosts) => {
			allowedHosts = allowedHosts.allowedHosts.hosts || ['google.com', 'github.com'];
			if (matchDomain(allowedHosts))
			{
				window.location.reload();
			}
			else
			{
				maybeDestyle(allowedHosts);
			}
		});
	});
})();
