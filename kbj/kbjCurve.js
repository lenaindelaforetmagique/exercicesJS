pointList_to_string = function(points_) {
  let list = "";
  for (let point of points_) {
    list += (point.x) + ',' + (point.y) + ' ';
  }
  return list;
}

allongementParcours = function(pointA, pointB, newPoint) {
  let distAB = distance2points(pointA, pointB);
  let distAC = distance2points(pointA, newPoint);
  let distBC = distance2points(pointB, newPoint);

  return distAC + distBC - distAB;
}

distance2points = function(pointA, pointB) {
  return distAB = ((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2) ** 0.5;
}


class SimplePoint {
  constructor(x_ = 0, y_ = 0) {
    this.x = x_;
    this.y = y_;
  }
}

class Point {
  constructor(x_ = 0, y_ = 0, parent_) {
    this.x = x_;
    this.y = y_;
    this.parent = parent_;

    this.dom = document.createElementNS(SVGNS, 'ellipse');
    this.dom.setAttribute("class", "Point");
    this.dom.setAttribute('rx', 5);
    this.dom.setAttribute('ry', 5);

    this.addEvents();
    this.updateDom();
  }

  updateDom() {
    this.dom.setAttribute('cx', this.x);
    this.dom.setAttribute('cy', this.y);
  }

  addEvents() {
    var thiz = this;
    this.dom.addEventListener("mousedown", function(e) {
      e.preventDefault();
      thiz.parent.selectedPoint = thiz;
    }, false);
  }

}


class KBJCurve {
  constructor() {
    this.points = [];

    this.dom = document.createElementNS(SVGNS, 'g');
    this.segments = document.createElementNS(SVGNS, 'polyline');
    this.segments.setAttribute('class', 'segments');
    this.dom.appendChild(this.segments);

    this.update();
  }

  addPoint(point_) {
    this.points.push(point_);
    this.dom.appendChild(point_.dom);
    this.update();
  }

  update() {

    // recalcul de l'ordre
    if (this.points.length > 2) {
      console.log("coui");
      let newList = [];
      newList.push(this.points[0]);
      newList.push(this.points[1]);
      this.points.splice(0, 2);

      for (let point of this.points) {
        let i_min = 0;
        let dist_min = distance2points(newList[0], point);
        let dist_comp = distance2points(newList.last(), point);
        if (dist_comp < dist_min) {
          dist_min = dist_comp;
          i_min = newList.length;
        }

        for (let i = 0; i < newList.length - 1; i++) {
          dist_comp = allongementParcours(newList[i], newList[i + 1], point);
          if (dist_comp < dist_min) {
            dist_min = dist_comp;
            i_min = i + 1;
          }
        }
        newList.splice(i_min, 0, point);
      }
      this.points = newList;
    }

    this.updateDom();
  }

  updateDom() {
    for (let node of this.points) {
      node.updateDom();
    }
    this.segments.setAttribute('points', pointList_to_string(this.points));

  }

  calculatePoints() {
    let result = [];
    let nbPts = 500;
    for (let i = 0; i < nbPts; i++) {
      let fact = i / (nbPts - 1);
      let newPointList = this.reduceList(this.nodes, fact);
      while (newPointList.length > 1) {
        newPointList = this.reduceList(newPointList, fact);
      }
      result.push(newPointList[0]);
    }
    return result;
  }

  reduceList(list_, fact = 0) {
    let result = [];
    for (let i = 0; i < list_.length - 1; i++) {
      let newX = list_[i].x * (1 - fact) + list_[i + 1].x * fact;
      let newY = list_[i].y * (1 - fact) + list_[i + 1].y * fact;
      result.push(new SimplePoint(newX, newY));
    }
    return result;
  }
}