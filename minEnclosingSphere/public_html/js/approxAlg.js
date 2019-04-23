// Approx. alg.

class ApproxMinBall {
    constructor(pts) {
        this.pts = pts;
        this.index = 0;
        this.ball = new Circle(pts[0], 0);
    }
    next() {
        var p = this.pts[this.index];
        if (this.ball.contains(p))
            return;
        else
            return;  // return new Circle
    }

}
var pts = [ new Point(1,4)];
var x = new ApproxMinBall(pts);
alert(x.ball.toString());