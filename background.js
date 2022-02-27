let music=[];
chrome.runtime.onMessage.addListener(function(request,senger,sendResponse) {
    music=request.done;
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id:"Spotify-link",
        title:"Искать в Spotify"
    });
})

const CLIENT_ID = encodeURIComponent('0333bde7cf744533976bdbd69d61aa75');
const RESPONSE_TYPE = encodeURIComponent('token');
const REDIRECT_URI = encodeURIComponent('https://pobbbfjbnhjfkmnjddefcchncbofdfeh.chromiumapp.org/');
const SCOPE = encodeURIComponent('user-read-email, user-read-private');
const SHOW_DIALOG = encodeURIComponent('true');
let STATE = '';
let ACCESS_TOKEN = '';
let user_signed_in = false;
  
function create_spotify_endpoint() {
    STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));
  
    let oauth2_url =
          `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`;
  
    console.log(oauth2_url);
  
    return oauth2_url;
}

    ///"https://api.spotify.com/v1/search?q=Linkin+Park&type=track&limit=5&access_token=\(token)" 


  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        if (user_signed_in) {
            console.log("User is already signed in.");
        } else {
            chrome.identity.launchWebAuthFlow({
                url: create_spotify_endpoint(),
                interactive: true
                }, function (redirect_url) {
                if (chrome.runtime.lastError) {
                    sendResponse({ message: 'fail' });
                } else {
                    if (redirect_url.includes('callback?error=access_denied')) {
                        sendResponse({ message: 'fail' });
                    } else {
                        ACCESS_TOKEN = redirect_url.substring(redirect_url.indexOf('access_token=') + 13);
                        ACCESS_TOKEN = ACCESS_TOKEN.substring(0, ACCESS_TOKEN.indexOf('&'));
                        let state = redirect_url.substring(redirect_url.indexOf('state=') + 6);
                
                        if (state === STATE) {
                            console.log("SUCCESS")
                            user_signed_in = true;
                
                            setTimeout(() => {
                                ACCESS_TOKEN = '';
                                user_signed_in = false;
                            }, 3600000);
                
                            chrome.browserAction.setPopup({ popup: 'popup.html' }, () => {
                                sendResponse({ message: 'success' });
                            });
                        } else {
                            sendResponse({ message: 'fail' });
                        }
                    }
                }
            });
        }
        
    return true;
    } else if (request.message === 'logout') {
        user_signed_in = false;
        chrome.browserAction.setPopup({ popup: 'popup.html' }, () => {
            sendResponse({ message: 'success' });
        });
  
        return true;
    }
});

    

    

function search_music(ACCESS_TOKEN,music){
    console.log(ACCESS_TOKEN)
    let q=music[1].replace(' ','+')
    console.log(q)
    fetch(`https://api.spotify.com/v1/search?q=${q}?&type=track&limit=5&access_token=${ACCESS_TOKEN}`).then(function(response){
        response.json().then(function(data) {
            test_pars_json(data,music)
            console.log(data['tracks'])
        });
        }).catch(function(error) {
            console.log('Fetch Error:', error);
        });
}

function msg(){
    console.log(music);
}

function test_pars_json(data,music){
    console.log(data['tracks']);
    chrome.runtime.onConnect.addListener(function(port) {
        console.assert(port.name === "knockknock");
        port.onMessage.addListener(function(msg) {
          if (msg.joke === "Lets working")
            port.postMessage({done: music});
        });
    });
}

chrome.contextMenus.onClicked.addListener(function(info,tab){
    if (info.menuItemId == "Spotify-link") {
        msg();
        search_music(ACCESS_TOKEN,music)
    }
})

    