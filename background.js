function toFull(link){
	console.log("making full: ", link);
	const slashPIndex = link.indexOf("/p/");
	if (slashPIndex > -1){
		const slashidx = link.lastIndexOf("/");
		const fullLink = link.substring(0,slashidx) + "/media/?size=l";
		console.log("full: ", fullLink);
		return fullLink;
	}
	return link;
}

linkCallback = function(word){
	const url = word.pageUrl;
	if (url.indexOf("/p/")!=-1){
		chrome.tabs.create({url: toFull(url)});
		return 0;
	}
	const query = word.linkUrl;
	chrome.tabs.create({url: toFull(query)});
};

chrome.contextMenus.create({
	title: "Open Full Size",
	"documentUrlPatterns":["*://*.instagram.com/*"],
	contexts:["link","page"],  // ContextType
	onclick: linkCallback // A callback function
});
