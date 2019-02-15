var SVGNS = "http://www.w3.org/2000/svg";
colorGenerator = function(r = 0, g = 0, b = 0, alpha = 1) {
  return `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


class Universe {
  constructor(points_) {
    this.remainingPoints = points_;
    this.createdPoints = [];

    this.container = document.getElementById("container");
    this.dom = document.createElementNS(SVGNS, "svg");
    this.container.appendChild(this.dom);

    this.viewBox = new ViewBox(this.dom);
    this.addEvents();
    this.lastUpdate = Date.now();
  }

  createPoint(x_ = 0, y_ = 0) {
    if (this.remainingPoints.length > 0) {
      let i = getRandomInt(0, this.remainingPoints.length);
      let newPoint = new Point(x_, y_, this.remainingPoints[i].x, this.remainingPoints[i].y);
      this.dom.appendChild(newPoint.dom);
      this.createdPoints.push(newPoint);
      this.remainingPoints.splice(i, 1);
    }
  }


  addEvents() {
    let thiz = this;
    this.touchEvent = new TouchEvent();
    this.mouseDown = false;

    this.clickFired = null;

    this.mouseClick = function(x_, y_) {
      let realX = thiz.viewBox.realX(x_);
      let realY = thiz.viewBox.realY(y_);
      thiz.createPoint(realX, realY);
    }

    // MOUSE events
    this.container.addEventListener("mousedown", function(e) {
      e.preventDefault();
      if (!thiz.clickFired) {
        thiz.mouseDown = true;
        thiz.mouseClick(e.clientX, e.clientY);
      }
    }, false);

    this.container.addEventListener("mousemove", function(e) {
      e.preventDefault();
      if (thiz.mouseDown) {
        thiz.mouseClick(e.clientX, e.clientY);
      }
    }, false);

    this.container.addEventListener("mouseup", function(e) {
      e.preventDefault();
      thiz.mouseDown = false;
      thiz.clickFired = false;
    }, false);

    this.container.addEventListener("wheel", function(e) {
      e.preventDefault();
      let k = 1.1;
      if (e.deltaY > 0) {
        k = 1 / k;
      }
      thiz.viewBox.scale(e.clientX, e.clientY, k);
    }, false);


    // TOUCH events
    this.container.addEventListener("touchstart", function(e) {
      e.preventDefault();
      if (!thiz.clickFired) {
        thiz.mouseDown = true;
        thiz.touchEvent.saveEvent(e);
        // if (thiz.touchEvent.size == 0) {
        //   thiz.mouseClick(thiz.touchEvent.x, thiz.touchEvent.y);
        // }
      }
    }, false);

    this.container.addEventListener("touchmove", function(e) {
      e.preventDefault();
      let newTouch = new TouchEvent();
      newTouch.saveEvent(e, true);
      if (newTouch.size == 0) {
        thiz.mouseClick(newTouch.x, newTouch.y);
      } else {
        let dx = newTouch.x - thiz.touchEvent.x;
        let dy = newTouch.y - thiz.touchEvent.y;
        thiz.viewBox.translate(-dx, -dy);
        thiz.viewBox.scale(newTouch.x, newTouch.y, newTouch.size / thiz.touchEvent.size);
      }
      thiz.touchEvent = newTouch;
    }, false);

    this.container.addEventListener("touchend", function(e) {
      e.preventDefault();
      if (!thiz.clickFired && !thiz.touchEvent.hasMoved) {
        if (thiz.touchEvent.size == 0) {
          thiz.mouseClick(thiz.touchEvent.x, thiz.touchEvent.y);
        }
      }

      thiz.mouseDown = false;
      thiz.clickFired = false;
      thiz.touchEvent.reset();
    }, false);

    this.container.addEventListener("touchcancel", function(e) {
      e.preventDefault();
      thiz.mouseDown = false;
      thiz.clickFired = false;
      thiz.touchEvent.reset();
    }, false);

    this.container.addEventListener("touchleave", function(e) {
      e.preventDefault();
      thiz.mouseDown = false;
      thiz.clickFired = false;
      thiz.touchEvent.reset();
    }, false);


    // OTHER events
    window.onresize = function(e) {
      thiz.viewBox.resize();
    }
  }

  refresh() {
    let now = Date.now();
    if (now - this.lastUpdate > 20) {
      this.lastUpdate = now;
      for (let point of this.createdPoints) {
        point.update();
        point.draw();
      }
    }
  }
}

class ViewBox {
  constructor(parent_) {
    this.parent = parent_;
    this.xMin = 0;
    this.yMin = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.set();
  }

  repr() {
    return this.xMin + " " + this.yMin + " " + this.width + " " + this.height;
  }

  set() {
    this.parent.setAttributeNS(null, 'viewBox', this.repr());
  }

  realX(x) {
    // Returns the "real" X in the viewBox from a click on the parent Dom...
    let domRect = this.parent.getBoundingClientRect();
    return (x - domRect.left) / domRect.width * this.width + this.xMin;
  }

  realY(y) {
    // Returns the "real" Y in the viewBox from a click on the parent Dom...
    let domRect = this.parent.getBoundingClientRect();
    return (y - domRect.top) / domRect.height * this.height + this.yMin;
  }

  // Events
  resize() {
    this.height = this.width * window.innerHeight / window.innerWidth;
    this.set();
  }

  scale(x, y, fact = 1) {
    let coorX = this.realX(x);
    let coorY = this.realY(y);

    this.xMin = coorX - (coorX - this.xMin) / fact;
    this.yMin = coorY - (coorY - this.yMin) / fact;
    this.width /= fact;
    this.height /= fact;
    this.set();
  }

  translate(dx, dy) {
    let domRect = this.parent.getBoundingClientRect();
    this.xMin += dx / domRect.width * this.width;
    this.yMin += dy / domRect.height * this.height;
    this.set();
  }
}

class TouchEvent {
  constructor() {
    this.init();
  }

  init() {
    this.x = null;
    this.y = null;
    this.size = null;
    this.hasMoved = null;
  }

  saveEvent(e, hasMoved_ = false) {
    // position
    let x = 0;
    let y = 0;
    let n = e.touches.length;
    for (let i = 0; i < n; i++) {
      x += e.touches[i].clientX / n;
      y += e.touches[i].clientY / n;
    }
    this.x = x;
    this.y = y;

    // size
    let lMax = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let l = Math.pow(e.touches[i].clientX - e.touches[j].clientX, 2);
        l += Math.pow(e.touches[i].clientY - e.touches[j].clientY, 2);
        lMax = Math.max(lMax, l);
      }
    }
    this.size = Math.pow(lMax, 0.5);

    // has hasMoved
    this.hasMoved = hasMoved_;
  }

  reset() {
    // this.init();
  }
}