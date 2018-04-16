// <-- Global variables
var WIDTH = 800;
var HEIGHT = 600;
var circle0 = Object.create(Circle);
circle0.init(0, 0, 0);

// for (var i = 0; i < 3; i++) {
//   r /= 2;
//   dt *= 5;
//   var circle2 = Object.create(Circle);
//   circle2.init(r, t, dt);
//   circle0.addChild(circle2);
// }


var Shape = {
  init: function() {
    this.points = [];
    this.coefficients = [];
  },
  draw: function() {
    var lg = this.points.length;
    if (lg > 0) {
      for (var i = 0; i < this.points.length - 1; i++) {
        line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);
      }
      line(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y, this.points[0].x, this.points[0].y);
    }
  },
  calculateCoefficients: function(nMax) {
    nMax = Math.abs(nMax);
    var circles = [];

    // -- points complexes --
    var nb = this.points.length;
    var pts = [];
    for (var k = 0; k < nb; k++) {
      var pt = Object.create(Complex);
      pt.init(this.points[k].x - WIDTH / 2, this.points[k].y - HEIGHT / 2);
      pts.push(pt);
    }
    var dt = []; // delta t
    var t = []; // t abscisse curviligne
    var lTot = 0; // chemin total
    for (var k = 0; k < nb - 1; k++) {
      var dl = Math.sqrt(
        Math.pow(this.points[k + 1].x - this.points[k].x, 2) +
        Math.pow(this.points[k + 1].y - this.points[k].y, 2)
      );
      dt.push(dl);
      t.push(lTot);
      lTot += dl;
    }
    // dernier segment
    var dl = Math.sqrt(
      Math.pow(this.points[nb - 1].x - this.points[0].x, 2) +
      Math.pow(this.points[nb - 1].y - this.points[0].y, 2)
    );
    dt.push(dl);
    t.push(lTot);
    lTot += dl;
    // console.log(lTot);

    // -- Coefficients de Fourier --
    for (var n = -nMax; n <= nMax; n++) {
      // -- harmonique n --
      var circle = Object.create(Circle);

      var periode = -2 * Math.PI * n / lTot;

      var res = Object.create(Complex);
      // Sum((a_k+i×b_k)×e^(-i×2nπ×k/N)/N

      for (var k = 0; k < nb; k++) {
        var nb2 = Object.create(Complex);
        nb2.init2(1, periode * t[k]);
        nb2.mult(pts[k]);
        nb2.kmult(dt[k]);
        res.add(nb2);
      }
      res.kmult(1 / lTot);

      circle.init(res.mod(), res.arg(), periode);
      //circle.init(20, 0, dt / 100);

      circles.push(circle);
    }

    circle0 = circles[0];

    circle0.xC = WIDTH / 2;
    circle0.yC = HEIGHT / 2;
    for (var i = 1; i < circles.length; i++) {
      circle0.addChild(circles[i]);
    }

  }
};


// Global variables -->

function setup() {
  frameRate(20);
  createCanvas(WIDTH, HEIGHT);
  //angleMode(DEGREES);
  noFill();
  stroke(255);
  background(0);
  Points.init();
  Shape.init();
  var truc = Object.create(Complex);
  var truc2 = Object.create(Complex);
  truc.init(-12, -0.1);
  truc2.init(12, 1);
  truc.mult(truc2);
  // console.log(truc.re, truc.im); //mod(), truc.arg());



}

function draw() {
  background(0);
  circle0.update();
  strokeWeight(1);
  stroke(0, 255, 0);
  circle0.draw();


  stroke(0, 255, 255);
  Shape.draw();
  stroke(255, 0, 255);
  strokeWeight(2);
  Points.draw();

}



function mousePressed() {
  background(0);
  circle0.init(0, 0, 0);
  Shape.init();
  Points.init();
}

function mouseDragged() {
  strokeWeight(3);
  stroke(255);
  point(mouseX, mouseY);
  Shape.points.push(createVector(mouseX, mouseY));
}

function mouseReleased() {
  Shape.draw();
  Shape.calculateCoefficients(10);
}