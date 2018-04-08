// Coding Challenge #74: Clock with p5.js
// https://www.youtube.com/watch?v=E4RyStef-gY
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(200, 200);
  rotate(-90);


  let hr = hour();
  let mn = minute();
  let sc = second();

  // strokeWeight(8);
  // stroke(255);
  // noFill();
  // ellipse(200, 200, 300, 300);

  strokeWeight(4);
  stroke(255, 100, 150);
  noFill();
  let ends = map(sc, 0, 60, 0, 360);
  arc(0, 0, 300, 300, 0, ends); //, CHORD); //OPEN); //PIE);


  stroke(100, 255, 150);
  let endm = map(mn + sc / 60, 0, 60, 0, 360);
  arc(0, 0, 310, 310, 0, endm);

  stroke(100, 150, 255);
  let endh = map(hr % -12 + mn / 60 + sc / 3600, 0, 12, 0, 360);
  arc(0, 0, 320, 320, 0, endh);

  // fill(255);
  // noStroke();
  // text(hr + ':' + mn + ':' + sc, 10, 200);

}