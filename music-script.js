var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Lets working"});
port.onMessage.addListener(function(request) {
    let info_of_music=request.done
    let url_of_image=request.info
    document.getElementById("name_of_track").innerHTML = info_of_music[1]
    document.getElementById("artist_of_track").innerHTML = info_of_music[0]
    document.getElementById('Image_of_albom').src=url_of_image
});



