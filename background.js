function toFull(link){
	takenby = link.indexOf("?taken-by=");
	if (takenby > -1){
		fullLink = link.substring(0,takenby-1) + "/media/?size=l";
		return fullLink;
	}
	return link;
}

linkCallback = function(word){
	var url = word.pageUrl;
	if (url.indexOf("?taken-by=")!=-1){
		chrome.tabs.create({url: toFull(url)});
		return 0;
	}
	var query = word.linkUrl;
	chrome.tabs.create({url: toFull(query)});
};

chrome.contextMenus.create({
	title: "Open Full Size",
	"documentUrlPatterns":["*://*.instagram.com/*"],
	contexts:["link","page"],  // ContextType
	onclick: linkCallback // A callback function
});
