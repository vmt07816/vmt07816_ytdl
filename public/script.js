var mp3Btn = document.getElementById('mp3');
var	mp4Btn = document.getElementById('mp4');
var URLinput = document.querySelector('.URL-input');
// var server = '';

mp3Btn.addEventListener('click', () => {
	console.log(`URL: ${URLinput.value}`);	
	redirectMp3(URLinput.value);
});


mp4Btn.addEventListener('click', () => {
	console.log(`URL: ${URLinput.value}`);	
	redirectMp4(URLinput.value);
});

let results = document.getElementById("result-list");

function handleMessage(request, sender, response) {
  // Handle responses coming back from the background page.
  if (request.msg === "clear-results") {
    results.innerHTML = "";
  }
  if (request.msg === "found-result") {
    // List out responses from the background page as they come in.
    let li = document.createElement("li");
    li.innerText = `Tab id: ${request.id} at url: ${request.url} had ${request.count} hits.`;
    results.appendChild(li);
  }
}

browser.runtime.onMessage.addListener(handleMessage);



function redirectMp3(query) {
	window.location.href = `downloadmp3?url=${query}`;
}

function redirectMp4(query) {
	window.location.href = `downloadmp4?url=${query}`;
}
