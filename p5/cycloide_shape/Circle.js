var Points = {
  init: function() {
    this.listPts = [];
  },
  addPoint: function(x, y) {
    this.listPts.push(createVector(x, y));
  },
  draw: function() {
    for (var i = 0; i < this.listPts.length; i++) {
      point(this.listPts[i].x, this.listPts[i].y);
    }
  }
};

var Circle = {
  init: function(r, teta0, dteta) {
    this.r = r;
    this.teta = teta0;
    this.dteta = dteta;

    this.xC = null;
    this.yC = null;
    this.xP = null;
    this.yP = null;

    this.parent = null;
    this.child = null;
  },
  addParent: function(parent) {
    this.parent = parent;
  },
  addChild: function(child) {
    if (this.child === null) {
      this.child = child;
      this.child.addParent(this);
    } else {
      this.child.addChild(child);
    }
  },
  update: function() {
    this.teta += this.dteta;
    if (this.parent !== null) {
      this.xC = this.parent.xP;
      this.yC = this.parent.yP;
    }
    // else {
    //   this.xC = 0;
    //   this.yC = 0;
    // }
    this.xP = this.xC + this.r * Math.cos(this.teta);
    this.yP = this.yC + this.r * Math.sin(this.teta);
    if (this.child !== null) {
      this.child.update();
    }
  },
  draw: function() {
    ellipse(this.xC, this.yC, this.r * 2, this.r * 2);
    line(this.xC, this.yC, this.xP, this.yP);
    if (this.child !== null) {
      this.child.draw();
    } else {
      Points.addPoint(this.xP, this.yP);
    }
  }
};