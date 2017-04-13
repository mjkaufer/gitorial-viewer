function httpGetAsync(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, true);
	xmlHttp.send(null);
}

var showGitorialButton = document.getElementById('showGitorial');
var currentRepoAddress = null;
var currentFileName = "index.html";

showGitorialButton.onclick = function() {
	currentRepoAddress = document.getElementById('address').value;
	currentFileName = document.getElementById('fileName').value;

	// if (repoAddress == null) {
	// 	return alert('please enter a repo URL');
	// } else if (fileName == null) {
	// 	return alert('please enter a file name');
	// }

	var commitsUrl = "https://api.github.com/repos/" + currentRepoAddress + "/commits";


	httpGetAsync(commitsUrl, loadCommits);
}

//this is only really gonna work for the last 30 commits...
function loadCommits(commitsJSONString) {
	// console.log(typeof commitsJSON)
	var commitsJSON = JSON.parse(commitsJSONString);
	console.log(commitsJSON);
	var tableBody = document.getElementById('commitsBody');
	tableBody.innerHTML = "";//clear commits table

	for (var i = 0; i < commitsJSON.length; i++) {
		var commitData = commitsJSON[commitsJSON.length - 1 - i];

		var newTableRow = document.createElement('tr');

		// var newCommitNumberElement = document.createElement('td');
		// newCommitNumberElement.innerHTML = i;

		var newCommitHashElement = document.createElement('td');
		var newCommitHashElementLink = document.createElement('a');
		newCommitHashElementLink.setAttribute('hash', commitData.sha);
		newCommitHashElementLink.innerHTML = commitData.sha.substr(0, 6) + "...";
		newCommitHashElement.append(newCommitHashElementLink);

		newCommitHashElementLink.onclick = function(event){
			var commitHash = event.target.getAttribute('hash');
			loadFileFromHash(commitHash);
			//todo, error checking for if user clicks 10 files at once
		}

		if (commitsJSON.length - 1 - i == 0) {
			//if we're at the first element, we'll load its data
			loadFileFromHash(commitData.sha);
		}

		var newCommitMessageElement = document.createElement('td');
		newCommitMessageElement.innerHTML = commitData.commit.message;

		// newTableRow.append(newCommitNumberElement);
		newTableRow.append(newCommitHashElement);
		newTableRow.append(newCommitMessageElement);

		tableBody.append(newTableRow);
		//https://api.github.com/repos/HackGT/catalyst-project-page/contents/index.html?ref=ec8dc17c671a6502756a1314321db72db3c7b858
	}
}

function loadFileFromHash(hash) {
	if (currentFileName.substr(0, 1) != "/") {
		currentFileName = "/" + currentFileName;
	}

	var requestURL = "https://raw.githubusercontent.com/" + currentRepoAddress +  "/" + hash + currentFileName;
	console.log(requestURL);

	httpGetAsync(requestURL, function(resultFile) {
		console.log(resultFile)
		document.getElementById('fileOutput').innerHTML = Prism.highlight(resultFile, Prism.languages.html);
	})

}