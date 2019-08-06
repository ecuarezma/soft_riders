/* global $ */
$(document).ready(() => {
  //MOBILE MENU TOGGLE
  $("nav .bars").on("click", () => {
    $("footer, .promos-player, .promos-container, .title").toggleClass(
      "blur-background"
    );
    $(".navbar ul").slideToggle();
  });

  //EVENT LISTENER FOR PLAYER
  $(".promos-container").on("click", ".promo-btn", function() {
    let src = $(this)
        .children("#promo-img")
        .attr("src"),
      key = $(this)
        .children("#promo-img")
        .attr("key");
    $(".promos-player")
      .children()
      .remove();
    $(".promos-player").append(
      `<video  id='my-video' class='video-js' controls autoplay preload='auto'
              poster='${src}'>
        <source src='/media/videos/promos/${key}' type='video/mp4'>
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
      `<div class="promo-btn">
        <img
        id="promo-img"
        src="/media/images/${file.image}"
        key="${file.video}"/>
      </div>`
    );
    $(".promos-container").append(newDiv);
  });
});

let promo_array = [
  { image: "button2.jpg", video: "IMG_0597.mp4" },
  { image: "button3.jpg", video: "IMG_1289.TRIM.MOV" },
  { image: "button4.jpg", video: "IMG_1414.TRIM.MOV" },
  { image: "button5.jpg", video: "IMG_1978.TRIM.MOV" },
  { image: "button6.jpg", video: "IMG_2495.TRIM.MOV" },
  { image: "button7.jpg", video: "IMG_2985.TRIM.MOV" },
  { image: "button8.jpg", video: "IMG_5133.TRIM.MOV" },
  { image: "button9.jpg", video: "IMG_5871.TRIM.MOV" },
  {
    image: "button10.jpg",
    video: "joined_video_94f462e0f44d4329815033e03f3c8fd3.mp4"
  },
  { image: "button11.jpg", video: "SR5.mp4" },
  { image: "button12.jpg", video: "SRpromo8-1.mp4" }
];
