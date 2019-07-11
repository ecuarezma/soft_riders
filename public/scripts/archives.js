/* global $ */
$(document).ready(() => {
  playlistCall();

  mixcloud_grid.on("click", "#image", function() {
    let key = $(this).attr("key");
    let mq = window.matchMedia("(max-width: 576px)");
    mixcloud_content.children().remove();
    if (mq.matches) {
      mixcloud_content.append(
        `<div class="mixplayer">
          <iframe 
            id="play-widget"
            width="100%" 
            height="60px" 
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&autoplay=1&feed=${key}" 
            frameborder="0" 
            allow="autoplay">
          </iframe>
        </div>`
      );
    } else {
      mixcloud_content.append(
        `<div class="mixplayer">
          <img  id="play-image" 
                src="${$(this).attr("src")}" 
                width="100%" 
                style="object-fit: cover; border-radius: .5rem"
          />
          <iframe 
            id="play-widget" 
            width="100%" 
            height="400px" 
            src="https://www.mixcloud.com/widget/iframe/?light=1&autoplay=1&feed=${key}" 
            frameborder="0" 
            allow="autoplay">
          </iframe>
        </div>`
      );
    }
  });
});

const mixcloud_grid = $(".mixcloud-grid");
const mixcloud_content = $(".mixcloud-content");

//functions for calling api's
const url = "https://api.mixcloud.com/soft_riders/cloudcasts/";

function addPlaylists(playlists) {
  playlists.map((playlist, index) => {
    let newDiv = $(
      `<div class="playlist-card">
      <img 
        id="image"
        src="${playlist.pictures.extra_large}" 
        alt="${playlist.name} - image not found" 
        key="${playlist.key}" 
      />
      <p id="caption">${playlist.name}</p>
    </div`
    );
    mixcloud_grid.append(newDiv);
  });
}

async function playlistCall() {
  let playlistsMixcloud = await $.getJSON(url);
  let imgArray = playlistsMixcloud.data;
  addPlaylists(imgArray);
  console.log(imgArray);
}
