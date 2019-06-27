/* global body $ */
$(document).ready(() => {
//CALLING SPOTIFY API
fetch(url, { 
  headers: {'Authorization':`Bearer ${token}`}
})
.then(res => res.json().then(data => data.items))
.then(loadPlaylists)

});
let token = x;
const user = 'englishwallpaper';
const url = `https://api.spotify.com/v1/users/${user}/playlists?limit=50`;

function loadPlaylists(data){
  data.forEach(playlist => {
    const src           = playlist.images[0].url,
          display_name  = playlist.owner.display_name
    let newDiv = 
    $(`<div class="playlist-card">
        <img src= "${src}"/>
      </div>`)
    if(display_name !== 'Miki Lee'){
      $('.spotify-container').append(newDiv);
    };
  });
};



// CODE FOR SPOTIFY EMBEDDED PLAYER  
// <iframe src="https://open.spotify.com/embed/playlist/<%= body.items[0].id %>" 
//         width="300" 
//         height="380" 
//         frameborder="0" 
//         allowtransparency="true" 
//         allow="encrypted-media">
// </iframe>