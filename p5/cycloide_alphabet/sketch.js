// <-- Global variables
var WIDTH = 1050;
var HEIGHT = 600;
var chaine = "A   BCDEFGHIJKL\nMNOPQRSTUVWX\nYZ";
//var chaine = "abcdefghijkl\nmnoOpqrstuvwx\nyz";
var chaine = "Joyeux\nAnniversaire\n   Valery";
var listeCercles = [];

var X0 = 0;
var Y0 = 80;
var DX = 80;
var DY = 170;

// Global variables -->

function setup() {
  frameRate(20);
  createCanvas(WIDTH, HEIGHT);
  noFill();

  background(0);
  Points.init();
  var xCur = X0;
  var yCur = Y0;
  for (var i = 0; i < chaine.length; i++) {
    var carac = chaine[i];
    if (carac === '\n') {
      yCur += DY;
      xCur = X0;
    } else {
      xCur += DX;
      var coeff_lettre = coefficients(carac);
      if (coeff_lettre.length > 0) {
        ajouteCercle(xCur, yCur, coeff_lettre);
      }
    }
  }
}

function ajouteCercle(posX, posY, coeffs) {
  var cercles = [];
  for (var k = 0; k < coeffs.length; k += 3) {
    var newCircle = Object.create(Circle);
    newCircle.init(coeffs[k], coeffs[k + 1], coeffs[k + 2]);
    cercles.push(newCircle);

  }

  for (var i = 1; i < cercles.length; i++) {
    cercles[0].addChild(cercles[i]);
  }
  cercles[0].xC = posX;
  cercles[0].yC = posY;
  listeCercles.push(cercles[0]);
}

function draw() {
  background(0);
  strokeWeight(1);
  stroke(0, 255, 0, 100);
  for (var i = 0; i < listeCercles.length; i++) {
    listeCercles[i].update();
    listeCercles[i].draw();
  }


  stroke(255, 0, 255);
  strokeWeight(2);
  Points.draw();
}


function mouseReleased() {
  Points.init();
}