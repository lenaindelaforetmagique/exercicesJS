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
  add: function(nb) {
    // adds to this _nb_
    this.re += nb.re;
    this.im += nb.im;
  },
  sub: function(nb) {
    // substracts this by _nb_
    this.re -= nb.re;
    this.im -= nb.im;
  },
  mult: function(nb) {
    // multiplies this by _nb_
    this.init(this.re * nb.re - this.im * nb.im,
      this.re * nb.im + this.im * nb.re);
  },
  kmult: function(scal) {
    // multiplies this by _scal_
    this.re *= scal;
    this.im *= scal;
  }
};