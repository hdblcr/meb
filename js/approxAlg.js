// Approx. alg.

class ApproxMinBall {
    constructor() {
        this.pts = [];
        this.index = 0;
        this.ball = null;
        this.line = null;
        this.drawQueue = [];
    }
    addPoint(p) {
        this.pts.push(p);
    };
    solve() {
        if (this.pts.length == 0) return;
        if (this.pts.length == 1) {
            var p = this.pts[this.index];
            this.ball = new Circle(p, 0);
            this.index++;
        }
        else {
            while (this.index < this.pts.length) {
                var p = this.pts[this.index];
                this.index++;
                if (this.ball.contains(p)) {
                    continue;
                }
                else {
                    // find line k from new point p to ball center
                    this.line = new Line(p, this.ball.c);
                    // extend line by radius r to hit point q
                    this.line = this.line.extendBy(this.ball.r);
                    // find midpoint c of line pq
                    var newCenter = this.line.midpoint();
                    this.ball = new Circle(newCenter, .5 * this.line.len());
                }   
            }
        }
        drawObject(this.ball);
        return this.ball;
    };
    drawNext() {
        if (this.drawQueue.length > 0) {
            var x = this.drawQueue.shift();
            drawObject(x);
        }
        else {
            this.nextPoint();
        }
    };
    nextPoint() {
        if (this.pts.length == 0) return;
        if (this.index >= this.pts.length) return;
        var p = this.pts[this.index];
        this.drawQueue.push(p);
        if (this.pts.length == 1) {
            this.ball = new Circle(p, 0);
        }
        else if ( !(this.ball.contains(p)) ) {
            // find line k from new point p to ball center
            this.line = new Line(p, this.ball.c);
            // extend line by radius r to hit point q
            this.line = this.line.extendBy(this.ball.r);
            // add full line to draw queue
            this.drawQueue.push(this.line);
            // find midpoint c of line pq
            var newCenter = this.line.midpoint();
            this.ball = new Circle(newCenter, .5 * this.line.len());
            // add new circle to draw queue
            this.drawQueue.push(this.ball);
        }
        this.index++;
        this.drawNext();
    };
}
