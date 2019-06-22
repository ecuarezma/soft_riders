/* global $ */
$(document).ready(()=>{
  
  playlistCall();

});






//functions for calling api's
const url = 'https://api.mixcloud.com/soft_riders/cloudcasts/';

function addPlaylists(playlists) {
 playlists.forEach( (playlist, index) => {
  let newDiv = $(
    `<div class="mixcloud card">
      <img src="${playlist.pictures.large}" alt="mixcloud playlist ${index}" />
    </div`);
  $('.container').append(newDiv);
  }); 
}

async function playlistCall(){
  let playlistsMixcloud = await $.getJSON(url);
  // console.log(playlistsMixcloud.data[0].pictures.large)
  let imgArray = playlistsMixcloud.data
  addPlaylists(imgArray);
}
