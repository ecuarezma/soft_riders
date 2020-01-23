/* global $ */
$(document).ready(() => {
  $("#join-button").on("click", () => {
    $("#audio-player, #join-button, #logo").addClass("darken");
    $(".signup-container").fadeIn(200);
  });

  $(".signup-container").on("click", ".fa-times", () => {
    $(".signup-container").fadeOut(200);
    $("#audio-player, #join-button, #logo").removeClass("darken");
  });

  $("nav .bars").on("click", () => {
    $(
      "video, #audio-player, footer, .container:not(.navbar-header)"
    ).toggleClass("blur-background");
    $(".navbar ul").slideToggle();
  });

  const video = document.querySelector("video");
  if (video.hasAttribute("autoplay")) {
    $("video")
      .append(`<source src="/media/videos/backgrounds/strawberry.mp4" type="video/mp4">
    <source src="/media/videos/backgrounds/strawberry.webm" type="video/webm">
    <source src="/media/videos/backgrounds/strawberry.ogv" type="video/ogg">`);
  }
});
