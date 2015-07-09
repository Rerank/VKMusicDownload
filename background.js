chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

if (request.command == 'download') {
	var url = request.params.url;
	var filename = request.params.filename;
	chrome.downloads.download({
		url: url,
		filename: filename 
	});
};

});