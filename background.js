
function msg(){
    var authOptions1 = {
        url: 'https://api.spotify.com/v1/users/' + '0333bde7cf744533976bdbd69d61aa75' + '/playlists',
        form: { // data = form
            'name': name,
            'public': false
        },
        json: true, // dataType: json = json: true
        headers: {
            'Authorization': 'Bearer ' + '8af112ef715a4a07bda9f6bf11313d8',
            'Content-Type': 'application/json',
        }
    };
    
    request.post(authOptions1, function(error, response, body) {
        console.log(body);
    }); 
}

chrome.contextMenus.create({
    id:"Spotify-link",
    title:"Искать в Spotify"
});


chrome.contextMenus.onClicked.addListener(function(info,tab){
    if (info.menuItemId == "Spotify-link") {
        msg();
    }
})
let music=[];
 
chrome.runtime.onMessage.addListener(function(request,senger,sendResponse) {
    music=request.done;
  });


  