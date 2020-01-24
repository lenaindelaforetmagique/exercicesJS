class Point {
  constructor(xC, yC, xT, yT) {

    //current coordinates
    this.xCur = xC;
    this.yCur = yC;

    // target coordinates
    this.xTar = xT;
    this.yTar = yT;

    this.dx = 0;
    this.dy = 0;

    this.color = colorGenerator(Math.random() * 255, Math.random() * 255, Math.random() * 255, 0.5);
    this.dom = document.createElementNS(SVGNS, 'ellipse');
    this.dom.setAttribute('rx', 5);
    this.dom.setAttribute('ry', 5);
    this.dom.setAttribute('fill', this.color);
    this.dom.setAttribute('stroke', colorGenerator(50, 50, 50, 1));
    this.draw();

  }

  update() {
    // spring effect
    let ka = 0.005;
    let ax = (this.xTar - this.xCur) * ka;
    let ay = (this.yTar - this.yCur) * ka;

    // integration
    this.dx += ax;
    this.dy += ay;

    // viscosity
    let kv = 0.9;
    this.dx *= kv;
    this.dy *= kv;

    // position
    this.xCur += this.dx;
    this.yCur += this.dy;

  }

  draw() {
    this.dom.setAttribute('cx', this.xCur);
    this.dom.setAttribute('cy', this.yCur);
  }
}