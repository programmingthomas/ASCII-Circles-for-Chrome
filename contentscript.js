//Content script.js

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
		console.log("Request " + request);
        if(request.method == "getText"){
			console.log("Sending data back");
            sendResponse({data: document.all[0].innerText, method: "getText"}); //same as innerText
        }
    }
);