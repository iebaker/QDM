/* Markov Text generator, (c) Izaak Baker 2013. 
 * Special thanks to Michael Burns for his invaluable
 * help debugging (read: dealing with the inanities of
 * javascript).  */

function begin() {
	$("#inputbox").text("A Markov chain is a probabilistic algorithm which is here used to generate text.  The result is often comedic, especially if the seed text contains a lot of repeated words.  Click on the button below a few times to see it in action.  Then, if you like, try changing the text in this box and running it again to see what it does.");  
}

function initMarkov() {
	var string = runMarkov();
	$("#outputbox").text(string);
}

function runMarkov() {
	var S = $("#inputbox").val();
	var N = 100;
	N = parseInt(N);
	var A = generateGraph(S);
	var result = markovify(A, N);
	return result;
}

function generateGraph(string) {
	var associateArray = new Array();
	var wordArray = string.split(/[ \n]/);
	var prev = "";
	for(var i = 0; i < wordArray.length; i++) {
		// Make sure that that associateArray[prev] IS an array
		if (!(associateArray[prev]) || (Object.prototype.toString.call(associateArray[prev]) !== "[object Array]"))
			associateArray[prev] = [];
		
		// Push the next word on, or "" if it was the last word
		if (wordArray[i])
			associateArray[prev].push(wordArray[i]);
		else
			associateArray[prev].push("");
		
		//Update the current word
		prev = wordArray[i];
	}
	
	// push the empty string into the end of the array
	if (associateArray[wordArray[wordArray.length - 1]])
		associateArray[wordArray[wordArray.length - 1 ]].push("")
	else
		associateArray[wordArray[wordArray.length - 1]] = [""];
	
	// And we're finally done!
	return associateArray;
}

function markovify(associateArray, length) {
	var resultArray = new Array();
	var keyArray = Object.keys(associateArray);
	console.log(keyArray);
	var k = keyArray[Math.floor(((associateArray.length + 1) * Math.random()))];
	for(var i = 0; i < length; ++i) {
		k = associateArray[k][Math.floor(((associateArray[k].length) * Math.random()))];
	
		resultArray.push( k );
	}
	return resultArray.join(" ");
}

function selectBox() {
	$("#outputbox").select();
}
