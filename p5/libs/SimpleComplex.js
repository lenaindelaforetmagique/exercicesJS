/* SimpleComplex.js
X. Morin
----
A simple class for simple calculations with complex numbers.

Contains:
* init    z=a+ib
* init2   z=r×e^(iθ)
* mod     |z|
* arg     θ
* add     z+=z2
* sub     z-=z2
* mult    z*=z2
* kmult   z*=k

Create a complex object with:
var a_complex_number = Object.create(Complex);

*/

var Complex = {
  re: 0,
  im: 0,
  init: function(a, b) {
    // initialize with real and imaginary parts
    this.re = a;
    this.im = b;
  },
  init2: function(r, teta) {
    // initialize with polar coordinates
    this.re = r * Math.cos(teta);
    this.im = r * Math.sin(teta);
  },
  mod: function() {
    // returns the module of complex
    return Math.sqrt(this.re * this.re + this.im * this.im);
  },
  arg: function() {
    // returns the argument of complex
    if (this.im === 0 && this.re < 0) {
      return Math.PI;
    } else {
      return 2 * Math.atan(this.im / (this.re + this.mod()));
    }
  },
  add: function(z2) {
    // adds to this _z2_
    this.re += z2.re;
    this.im += z2.im;
  },
  sub: function(z2) {
    // substracts this by _z2_
    this.re -= z2.re;
    this.im -= z2.im;
  },
  mult: function(z2) {
    // multiplies this by _z2_
    this.init(this.re * z2.re - this.im * z2.im,
      this.re * z2.im + this.im * z2.re);
  },
  kmult: function(scal) {
    // multiplies this by _scal_
    this.re *= scal;
    this.im *= scal;
  }
};