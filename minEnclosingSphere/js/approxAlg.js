// Approx. alg.

class ApproxMinBall {
    constructor(pts) {
        this.pts = pts;
        this.index = 1;
        this.ball = new Circle(pts[0], 0);
        this.line = null;
    }
    next() {
        var p = this.pts[this.index];
        if (this.ball.contains(p))
            return;
        else            
            return;
    }
    solve() {
        document.write("list of points: " + this.pts.toString() + "<br>");
        var i = 1;
        while (this.index < this.pts.length) {
            // document.write("iteration " + i + "<br>");
            i++;
            var p = this.pts[this.index];
            this.index++;
            // document.write("this is p: " + p.toString() + "<br>");
            if (this.ball.contains(p)) {
                // document.write("point already in ball: " + this.ball.toString() + "<br>");
                continue;
            }
            else {
                // document.write(p.toString() + " not in ball: " + this.ball.toString() + "<br>");
                // find line k from new point p to ball center
                this.line = new Line(p, this.ball.c);
                // document.write("first line: " + this.line.toString() + "<br>");
                // extend line to by radius r to hit point q
                this.line = this.line.extendBy(this.ball.r);

                // TODO draw line here
                // document.write("draw line: " + this.line.toString() + "<br>");

                // find midpoint c of line pq
                var newCenter = this.line.midpoint();
                this.ball = new Circle(newCenter, .5 * this.line.len());
                // TODO draw circle here
                // document.write("new circle: " + this.ball.toString() + "<br>");
            }
        }
        document.write("done! <br>");
        return this.ball;
    }
}
