// Coding Challenge #74: Clock with p5.js
// https://www.youtube.com/watch?v=E4RyStef-gY

var Line = {
  init: function(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  },
  draw: function() {

    //stroke(100, 100);
    strokeWeight(1);
    line(this.x0, this.y0, this.x1, this.y1);
  }
};

var lines = [];

var r0 = 80;
var r1 = 130;
var r2 = 180;

var NBmax = 400;


function setup() {
  frameRate(1);
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB);
}


function draw() {
  background(0);
  translate(200, 200);

  let hr = hour();
  let mn = minute();
  let sc = second();

  var teta0 = map(hr + mn / 60, 0, 12, -90, 270);
  var teta1 = map(mn + sc / 60, 0, 60, -90, 270);
  var teta2 = map(sc, 0, 60, -90, 270);

  let x0 = r0 * cos(teta0);
  let y0 = r0 * sin(teta0);
  let x1 = r1 * cos(teta1);
  let y1 = r1 * sin(teta1);
  let x2 = r2 * cos(teta2);
  let y2 = r2 * sin(teta2);

  // stroke(125, 125, 255);
  // line(0, 0, x0, y0);
  // line(0, 0, x1, y1);
  // line(0, 0, x2, y2);


  var ln = Object.create(Line);
  ln.init(x0, y0, x2, y2);
  lines.push(ln);

  var ln2 = Object.create(Line);
  ln2.init(x1, y1, x2, y2);
  lines.push(ln2);

  if (lines.length > NBmax) {
    lines = lines.splice(lines.length - NBmax, lines.length);
  }


  let color = 0
  lines.forEach(function(line) {
    color += 1;
    stroke(map(color, 0, lines.length, 0, 255));
    line.draw();
  });

  stroke(255);
  noFill();
  ellipse(x0, y0, 30, 30);
  ellipse(x1, y1, 20, 20);
  ellipse(x2, y2, 10, 10);



}