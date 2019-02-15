var font;

function preload() {
  font = loadFont('Stoclet_ITC_Light.ttf');
}

function setup() {
  console.log();
  let prenom = decodeURIComponent(window.location.search.substring(1)) + " !";
  points = font.textToPoints("Joyeux", 10, 150, 150);
  points = points.concat(font.textToPoints("anniversaire", 20, 300, 150));
  points = points.concat(font.textToPoints(prenom, 30, 450, 150));

  let u_ = new Universe(points);

  var updateCB = function(timestamp) {
    u_.refresh(timestamp);
    window.requestAnimationFrame(updateCB);
  };
  updateCB(0);
}