/* global body $ */
$(document).ready(()=>{
   const data = $.parseJSON(body);
   data.items.forEach(playlist=> {
      const src           = playlist.images[0].url,
            display_name  = playlist.owner.display_name
      let newDiv = 
      $(`<div class="playlist">
          <img src= "${src}"/>
        </div>`)
      if(display_name !== 'Miki Lee'){
        $('#curated').append(newDiv);
      }else {
        $('#soft_riders').append(newDiv);
      }
      
      
   });

})

// CODE FOR SPOTIFY EMBEDDED PLAYER  
// <iframe src="https://open.spotify.com/embed/playlist/<%= body.items[0].id %>" 
//         width="300" 
//         height="380" 
//         frameborder="0" 
//         allowtransparency="true" 
//         allow="encrypted-media">
// </iframe>