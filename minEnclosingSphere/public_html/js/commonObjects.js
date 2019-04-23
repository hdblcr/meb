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
    }
    toString() {
        return "C(" + this.c.toString() + "," + this.r.toString() + ")";
    };
    contains(p) {
        return distance_between_points_squared(c, p) <= Math.pow(radius, 2);
    };
}

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return "(" + this.x.toString() + "," + this.y.toString() + ")";
    };
}

class Line {
    constructor(startPoint, endPoint) {
        this.start = startPoint;
        this.end = endPoint;
    }
    toString() {
        return "LineSeg(" + this.start.toString() + "," + this.end.toString() + ")";
    };
}