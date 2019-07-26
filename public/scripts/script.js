/* global $ */
$(document).ready(() => {
  $("#join-button").on("click", () => {
    $(".signup-container").fadeIn(200);
  });

  $(".signup-container").on("click", ".fa-times", () => {
    $(".signup-container").fadeOut(200);
  });

  $("nav .bars").on("click", () => {
    $("video, footer, .container:not(.navbar-header)").toggleClass(
      "blur-background"
    );
    $(".navbar ul").slideToggle();
  });
});
