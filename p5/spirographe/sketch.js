// <-- Global variables
var r0 = 100;
var teta0 = 0;
var teta1 = 0;
//var dteta1 = 5; // Math.PI / 180;
var ds2 = 5; // pixels

var r1 = r0 / 2; // * (Math.random() * 2 - 1);
var r2 = Math.abs(r1); // * Math.random() * 2;

var WIDTH = 600;
var HEIGHT = 600;

var Points = {
  init: function(NBmax) {
    this.listPts = [];
    this.NBmax = NBmax;
    this.stepColor = 255 / (NBmax - 1);
  },
  addPoint: function(x, y) {
    this.listPts.push(createVector(x, y));
    var lg = this.listPts.length;

    if (lg > this.NBmax) {
      this.listPts = this.listPts.slice(lg - this.NBmax, lg);
    }
  },
  draw: function() {
    var color = 255;
    strokeWeight(1);

    for (var i = this.listPts.length - 1; i >= 0; i--) {
      //color -= this.stepColor;
      stroke(color);
      point(this.listPts[i].x, this.listPts[i].y);
    }
  }
};

// Global variables -->

function setup() {
  frameRate(30);
  createCanvas(WIDTH, HEIGHT);
  //angleMode(DEGREES);
  Points.init(10000);
}

function draw() {
  translate(WIDTH / 2, HEIGHT / 2);
  background(0);

  if (mouseIsPressed) {
    Points.listPts = [];
    var dx = mouseX - WIDTH / 2;
    var dy = mouseY - HEIGHT / 2;
    var r = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);
    var alpha = Math.acos(dx / r);

    // r1 = Math.cos(r * PI / 2 / r0) * r0 / 2;
    // r2 = r1 * alpha * 2 / PI;
    r1 = map(mouseX, 0, WIDTH, -1, 1) * r0 * 2;
    r2 = map(mouseY, 0, HEIGHT, 0, 2) * r1;
  }

  var x1 = (r0 + r1) * cos(teta0);
  var y1 = (r0 + r1) * sin(teta0);

  var x2 = x1 + r2 * cos(teta1 + teta0);
  var y2 = y1 + r2 * sin(teta1 + teta0);

  strokeWeight(2);
  stroke(255 / 2);
  // smooth(); // semble compatible avec derniere version seulement
  noFill();

  ellipse(0, 0, r0 * 2, r0 * 2);
  ellipse(x1, y1, r1 * 2, r1 * 2);
  point(x1, y1);
  line(x1, y1, x2, y2);
  Points.addPoint(x2, y2);
  Points.draw();

  if (r1 !== 0) {
    var dteta1 = ds2 / r2 * Math.sign(r1);
    teta1 += dteta1;
    teta0 += dteta1 * r1 / r0;
  }
}