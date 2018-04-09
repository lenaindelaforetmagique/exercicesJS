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

  strokeWeight(2);
  stroke(255, 100, 150);
  noFill();
  let ends = map(sc, 0, 60, 0, 360);
  arc(0, 0, 300, 300, 0, ends); //, CHORD); //OPEN); //PIE);
  line(0, 0, 140 * cos(sc * 6), 140 * sin(sc * 6));

  strokeWeight(4);
  stroke(100, 255, 150);
  let mn2 = mn + sc / 60;
  let endm = map(mn2, 0, 60, 0, 360);
  arc(0, 0, 310, 310, 0, endm);
  line(0, 0, 120 * cos(mn2 * 6), 120 * sin(mn2 * 6));

  strokeWeight(8);
  stroke(100, 150, 255);
  let hr2 = hr % -12 + mn / 60 + sc / 3600;
  let endh = map(hr2, 0, 12, 0, 360);
  arc(0, 0, 320, 320, 0, endh);
  line(0, 0, 60 * cos(hr2 * 30), 60 * sin(hr2 * 30));

  // fill(255);
  // noStroke();
  // text(hr + ':' + mn + ':' + sc, 10, 200);

}