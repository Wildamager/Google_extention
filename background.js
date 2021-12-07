
function msg(){
    console.log(music);
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


  