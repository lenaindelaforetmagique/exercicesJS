// <-- Global variables
var WIDTH = 800;
var HEIGHT = 600;
var circle0 = Object.create(Circle);
var r = 100;
var t = 0;
var dt = Math.PI / 1800;
circle0.init(r, t, dt);
for (var i = 0; i < 3; i++) {
  r /= 2;
  dt *= 5;
  var circle2 = Object.create(Circle);
  circle2.init(r, t, dt);
  circle0.addChild(circle2);
}




// Global variables -->

function setup() {
  frameRate(30);
  createCanvas(WIDTH, HEIGHT);
  //angleMode(DEGREES);
  noFill();
  stroke(255);
  Points.init();
}

function draw() {
  translate(WIDTH / 2, HEIGHT / 2);
  if (mouseIsPressed) {
    Points.init();
  }
  // if (mouseIsPressed) {
  //
  //   stroke(255);
  //   strokeWeight(3);
  //   point(mouseX, mouseY);
  // }
  background(0);
  circle0.update();
  stroke(0, 200, 0);
  strokeWeight(1);
  circle0.draw();
  stroke(255, 0, 255);
  strokeWeight(2);
  Points.draw();

}