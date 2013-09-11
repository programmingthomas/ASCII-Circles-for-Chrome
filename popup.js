//Popup.js
var canvas, ctx;
var modeAscii;
var modeBw;
var asciiReplaceSpaces;

function changeMode(newMode, newSpaces) {
	localStorage['modeAscii'] = modeAscii = newMode;
	localStorage['spaces'] = asciiReplaceSpaces = newSpaces;
	refresh();
}

function changeColor(newColor) {
	localStorage['modeBw'] = modeBw = newColor;
	refresh();
}

function refresh() {
	chrome.tabs.getSelected(null, function(tab) {
	    chrome.tabs.sendRequest(tab.id, {method: "getText"}, function(response) {
			if (response != null)
			{
				if (response.method == "getText")
				{
					if (asciiReplaceSpaces) response.data = response.data.replace(/\s+/g, '');
					console.log(response.data);
					// canvas.width = canvas.width;
					ctx.restore();
					ctx.clearRect(0,0,canvas.width,canvas.height);
					if (modeAscii) drawAscii(response.data, modeBw, canvas, ctx);
					else drawWords(response.data, modeBw, canvas, ctx);
					return;
				}
			}
	        draw("REFRESH!");
	    });
	});
}

function popupLoaded() {
	modeAscii = localStorage['modeAscii'] == "true" || localStorage['modeAscii'] == true;
	modeBw = localStorage['modeBw'] == "true" || localStorage['modeBw'] == true;
	asciiReplaceSpaces = localStorage['spaces'] == "true" || localStorage['spaces'] == true;
	canvas = document.getElementById("ctx");
	canvas.width = canvas.width;
	ctx = canvas.getContext("2d");
	document.getElementById("asciibutton").onclick = function() { changeMode(true, false); };
	document.getElementById("nospacesbutton").onclick = function() {changeMode(true, true); };
	document.getElementById("wordbutton").onclick = function() { changeMode(false, false); };
	document.getElementById("bwbutton").onclick = function() { changeColor(true); };
	document.getElementById("colorbutton").onclick = function() { changeColor(false); };
	document.getElementById("pngbutton").onclick = function() {
		var data = canvas.toDataURL();
		window.open(data, '_blank');
	};
	refresh();
}

document.addEventListener('DOMContentLoaded', function () {
	popupLoaded();
});