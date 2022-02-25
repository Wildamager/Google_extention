let error;

document.addEventListener("contextmenu", function(event){
    let track_elem=document.activeElement;
    artist_elem=track_elem.querySelectorAll("a.artist_link");
    if( artist_elem.length == 0 ){
        artist_elem=track_elem.querySelectorAll(".audio_row__performers>a");
    }
    name_of_track_elem=track_elem.querySelectorAll("a.audio_row__title_inner ");
    music_info=[];
    music_info.push(artist_elem[0].textContent); 
    music_info.push(name_of_track_elem[0].textContent);

    chrome.runtime.sendMessage({done: music_info});

}, true);

    
