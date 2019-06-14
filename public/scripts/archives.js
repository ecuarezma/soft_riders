/* global $ */
$(document).ready(()=>{
  
  playlistCall();
});

function addPlaylists(playlists) {
 playlists.forEach( playlist => {
  let newDiv = $(`<div class="mixcloud">${playlist.link}</div`);
  $('.container').append(newDiv);
  }); 
}

async function playlistCall(){
  let playlistsMixcloud = await $.getJSON('/api/playlists');
  addPlaylists(playlistsMixcloud);
}
