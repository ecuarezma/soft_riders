/* global $ */
$(document).ready(() => {
  $("nav .bars").on("click", () => {
    $("footer, .container:not(.navbar-header)").toggleClass("blur-background");
    $(".navbar ul").slideToggle();
  });
});
