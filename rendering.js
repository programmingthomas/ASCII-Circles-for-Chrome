//Rendering code
//The core rendering code is in this file in case I ever want to port this over to another browser...

function drawAscii(text, bw, canvas, ctx) {
	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width * 0.4, 0, Math.PI * 2, false);
	ctx.stroke();

	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);

	for (var i = 0; i < 96; i++) {
		ctx.save();
		ctx.rotate(i /96 * Math.PI * 2);
	 	if (bw) ctx.fillStyle = "black";
		else ctx.fillStyle = "hsl(" + i / 96 * 360 + ",100%, 50%)"; 
	 	
		ctx.fillText(String.fromCharCode(i + 32), -canvas.width * 0.45, 0);
		ctx.restore();
	}

	for (var i = 0; i < text.length - 1; i++) {
		if (text[i] != text[i + 1])
		{
			var charCode1 = text.charCodeAt(i) - 32;
			var charCode2 = text.charCodeAt(i + 1) - 32;
		
			if (charCode1 >= 0 && charCode1 < 96 && charCode2 >= 0 && charCode2 < 96)
			{
				var angle1 = charCode1 / 96 * Math.PI * 2;
				var angle2 = charCode2 / 96 * Math.PI * 2;
		
				if (bw) ctx.fillStyle = ctx.strokeStyle = "rgba(0, 0, 0, " + Math.max(0.05, 200 / text.length) + ")";
				else ctx.fillStyle = ctx.strokeStyle = "hsla(" + (text.charCodeAt(i + 1) - 32) / 96 * 360 + ", 100%, 50%, " + Math.max(0.05, 20 / text.length) + ")";
				ctx.save();
				ctx.rotate(angle1);
				
				
				
				ctx.beginPath();
				ctx.moveTo(-canvas.width * 0.4, 0);
	
				ctx.restore();
				ctx.save();
				ctx.rotate(angle2);
				ctx.quadraticCurveTo(0, 0, -canvas.width * 0.4, 0);
				ctx.stroke();
				ctx.restore();
			}
		}
	}
	ctx.restore();
}

function drawWords(text, bw, canvas, ctx) {
	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width * 0.4, 0, Math.PI * 2, false);
	ctx.stroke();

	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);

	//Remove all punctuation
	text = text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_~()]/g, "");
	text = text.replace(/[\r\n]/g, " ")
	text = text.replace("\r", " ");
	text = text.toLowerCase();
	var allWords = text.split(" ");

	var words = [];
	var useCount = {};

	for (var i = 0; i < allWords.length; i++)
	{
		var word = allWords[i];
		if (word.length > 0)
		{
			if (words.indexOf(word) < 0)
			{
				words[words.length] = word;
				useCount[word] = 1;
			}
			else useCount[word]++;
		}
	}

	var max = 0;

	for (var i = 0; i < words.length; i++) {
		if (useCount[words[i]] > max) {
			max = useCount[words[i]];
		}
	}

	for (var i = 0; i < words.length; i++) { 
	 	ctx.save();
	 	ctx.rotate(i / words.length * Math.PI * 2);
	 	if (bw) "hsla(0,0%,0%, " + Math.max(0.1, useCount[words[i]] / max) + ")"; 
		else ctx.fillStyle = "hsla(" + i / words.length * 360 + ",100%, 50%, " + Math.max(0.1, useCount[words[i]] / max) + ")"; 
	 	ctx.fillText(words[i], -canvas.width * 0.41 - ctx.measureText(words[i]).width, 0);
	 	ctx.restore();
	 }
 
	 for (var i = 0; i < allWords.length - 1; i++)
	 {
	 	if (allWords[i] != allWords[i + 1])
	 	{
 		
	 		var angle1 = words.indexOf(allWords[i]) / words.length * Math.PI * 2;
	 		var angle2 = words.indexOf(allWords[i + 1]) / words.length * Math.PI * 2;
 
			if (bw) ctx.strokeStyle = "rgba(0, 0, 0, " + Math.max(0.05, 20 / words.length) + ")";
	 		else ctx.strokeStyle = "hsla(" + words.indexOf(allWords[i + 1]) / words.length * 360 + ", 100%, 50%, " + Math.max(0.05, 200 / words.length) + ")";
	 		ctx.save();
	 		ctx.rotate(angle1);
	 		ctx.beginPath();
	 		ctx.moveTo(-canvas.width * 0.4, 0);
 		
	 		ctx.restore();
	 		ctx.save();
	 		ctx.rotate(angle2);
	 		ctx.quadraticCurveTo(0, 0, -canvas.width * 0.4, 0);
	 		ctx.stroke();
	 		ctx.restore();
	 	}
	}
	
	ctx.restore();
}