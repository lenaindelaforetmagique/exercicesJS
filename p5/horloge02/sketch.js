// Coding Challenge #74: Clock with p5.js
// https://www.youtube.com/watch?v=E4RyStef-gY
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}


function draw() {
  background(0);
  translate(200, 200);


  let hr = hour();
  let mn = minute();
  let sc = second();

  // hr = map(mouseX, 0, 400, 0, 12);
  // mn = map(mouseX, 0, 400, 0, 60);
  // sc = map(mouseY, 0, 200, 0, 60);

  let rh = 90;
  let rm = rh / 3;
  let rs = rm / 3;
  let tetah = map(hr % 12, 0, 12, -90, 270);
  let centerH = createVector(rh * cos(tetah), rh * sin(tetah));

  let tetam = map(mn, 0, 60, -90, 270);
  let centerM = createVector((rh + rm) * cos(tetam), (rh + rm) * sin(tetam)).add(centerH);

  let tetas = map(sc, 0, 60, -90, 270);
  let centerS = createVector((rm + rs) * cos(tetas), (rm + rs) * sin(tetas)).add(centerM);

  // console.log(centerH.x);
  strokeWeight(2);
  noFill();
  stroke(255, 100, 150);

  ellipse(centerH.x, centerH.y, 2 * rh, 2 * rh);

  stroke(100, 255, 150);
  ellipse(centerM.x, centerM.y, 2 * rm, 2 * rm);
  stroke(150, 100, 252);
  ellipse(centerS.x, centerS.y, 2 * rs, 2 * rs);


}