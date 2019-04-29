// Approx. alg.

class ApproxMinBall {
    constructor(pts) {
        this.pts = pts;
        this.index = 1;
        this.ball = new Circle(pts[0], 0);
        this.line = null;
        if (pts.length <= 1)
            this.done = 1;
        else
            this.done = 0;
    }
    next() {
        var p = this.pts[this.index];
        if (this.ball.contains(p))
            return;
        else            
            return;
    };
    solve() {
        if (this.done) { return;}
        document.write("list of points: " + this.pts.toString() + "<br>");
        while (this.index < this.pts.length) {
            var p = this.pts[this.index];
            this.index++;
            if (this.ball.contains(p)) {
                continue;
            }
            else {
                // find line k from new point p to ball center
                this.line = new Line(p, this.ball.c);
                // extend line to by radius r to hit point q
                this.line = this.line.extendBy(this.ball.r);

                // TODO draw line here

                // find midpoint c of line pq
                var newCenter = this.line.midpoint();
                this.ball = new Circle(newCenter, .5 * this.line.len());
                // TODO draw circle here
            }
        }
        document.write("done! <br>");
        this.done = 1;
        return this.ball;
    };
}
