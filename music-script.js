var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Lets working"});
port.onMessage.addListener(function(request,senger,sendResponse) {
    let info_of_music=request.done
    document.getElementById("name_of_track").innerHTML = info_of_music[1]
    document.getElementById("artist_of_track").innerHTML = info_of_music[0]
});



