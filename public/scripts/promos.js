/* global $ */
$(document).ready(() => {
  //MOBILE MENU TOGGLE
  $("nav .bars").on("click", () => {
    $("footer, .container:not(.navbar-header), #promos-title").toggleClass(
      "blur-background"
    );
    $(".navbar ul").slideToggle();
  });

  $(".promos-container").on("click", ".promo", function() {
    let src = $(this)
      .children("video")
      .attr("src");
    $(".promos-player")
      .children()
      .remove();
    $(".promos-player").append(
      `<video  id='my-video' class='video-js' controls autoplay preload='auto'
              poster='' data-setup='{}'>
        <source src='${src}' type='video/mp4'>
        <p class='vjs-no-js'>
          To view this video please enable JavaScript, and consider upgrading to a web browser that
          <a href='https://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a>
        </p>
      </video>`
    );
  });

  //LOAD THUMBNAILS
  promo_array.map(file => {
    let newDiv = $(
      `<div class="promo">
        <video  
        id="promo-thumbnail"
        src="/media/videos/promos/${file}"></video>
      </div>`
    );
    $(".promos-container").append(newDiv);
  });

  //EVENT LISTENER FOR PLAYER
});

let promo_array = [
  "SRpromo8-1.mp4",
  "SR5.mp4",
  "joined_video_94f462e0f44d4329815033e03f3c8fd3.mp4",
  "IMG_5871.TRIM.MOV",
  "IMG_5133.TRIM.MOV",
  "IMG_2985.TRIM.MOV",
  "IMG_2495.TRIM.MOV",
  "IMG_1978.TRIM.MOV",
  "IMG_1414.TRIM.MOV",
  "IMG_1289.TRIM.MOV",
  "IMG_0597.mp4"
];
