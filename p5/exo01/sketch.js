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



  strokeWeight(8);
  stroke(100, 150, 255);
  noFill();
  let hr2 = hr % -12 + mn / 60 + sc / 3600;
  let endh = map(hr2, 0, 12, 0, 360);
  let r = 100;
  arc(0, 0, 2 * r, 2 * r, 0, endh);
  line(0, 0, r * 1, r * 0);
  line(0, 0, r * cos(hr2 * 30), r * sin(hr2 * 30));


  strokeWeight(4);
  stroke(100, 255, 150);
  r = 120;
  let mn2 = mn + sc / 60;
  let endm = map(mn2, 0, 60, 0, 360);
  arc(0, 0, 2 * r, 2 * r, 0, endm);
  line(0, 0, r * 1, r * 0);
  line(0, 0, r * cos(mn2 * 6), r * sin(mn2 * 6));

  r = 140;
  strokeWeight(2);
  stroke(255, 100, 150);

  let ends = map(sc, 0, 60, 0, 360);
  arc(0, 0, 2 * r, 2 * r, 0, ends); //, CHORD); //OPEN); //PIE);
  line(0, 0, r * 1, r * 0);
  line(0, 0, r * cos(sc * 6), r * sin(sc * 6));


  // fill(255);
  // noStroke();
  // text(hr + ':' + mn + ':' + sc, 10, 200);

}