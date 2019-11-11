// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Do something
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    // console.log("Page fully loaded.");
    // console.log("Initialize.js");

    // Init request animation frame
    RAF.init();

    // Slide up: intro animation
    Intro.init();

    // Activate 3D rotation layers
    RAF.add(Perspective);

    // Activate Displacement parallax layers
    RAF.add(Parallax);
}