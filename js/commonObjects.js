// function Circle(centerPoint, radius) {
//     this.c = centerPoint;
//     this.r = radius;
//     this.toString = function() {
//         return "C(" + this.c.toString() + "," + this.r.toString() + ")";
//     }
// }

// function Point(x, y) {
//     this.x = x;
//     this.y = y;
//     this.toString = function() {
//         return "(" + this.x.toString() + "," + this.y.toString() + ")";
//     }
// }

// function Line(startPoint, endPoint) {
//     this.start = startPoint;
//     this.end = endPoint;
// }

class Circle {
    constructor(center, radius) {
        this.c = center;
        this.r = radius;
        this.active = 1;
    }
    toString() {
        //return "C(" + this.c.toString() + "," + this.r.toString() + ")";
        return "C(" + this.c.toString() + "," + parseFloat(this.r).toFixed(2) + ")";
    };
    contains(p) {
        return (distance_between_points_squared(this.c, p) <= Math.pow(this.r, 2));
    };
    deactivate() {
        this.active = 0;
        return;
    };
    activate() {
        this.active = 1;
        return;
    };
}

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.active = 1;
    }
    toString() {
        //return "(" + this.x.toString() + "," + this.y.toString() + ")";
        return "(" + parseFloat(this.x).toFixed(2) + "," + parseFloat(this.y).toFixed(2) + ")";
    };
    deactivate() {
        this.active = 0;
        return;
    };
    activate() {
        this.active = 1;
        return;
    };
}

class Line {
    constructor(startPoint, endPoint) {
        this.start = startPoint;
        this.end = endPoint;
        this.active = 1;
    }
    toString() {
        return "LineSeg(" + this.start.toString() + "," + this.end.toString() + ")";
    };
    len() {
        return Math.sqrt(distance_between_points_squared(this.start, this.end));
    };
    midpoint() {
        return midpoint(this.start, this.end);
    };
    // concatenate two lines
    append(other) {
        return new Line(this.start, other.end);
    };
    // extend line to a further point
    extendTo(p) {
        return new Line(this.start, p);
    };
    // extend line by some length k -- get unit directional vector and scale it up
    extendBy(k) {
        var sf = this.len() + k;  // new length = scaling factor
        var p = new Point(this.start.x + (this.end.x - this.start.x) * (sf / this.len()), this.start.y + (this.end.y - this.start.y) * (sf / this.len()));
        return new Line(this.start, p);
    };
    deactivate() {
        this.active = 0;
        return;
    };
    activate() {
        this.active = 1;
        return;
    };
}