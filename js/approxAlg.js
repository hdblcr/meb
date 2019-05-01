// Approx. alg.

class ApproxMinBall {
    constructor() {
        this.pts = [];
        this.index = 0;
        this.ball = null;
        this.line = null;
        this.pts2draw = [];
        this.lines2draw = [];
        this.circles2draw = [];
        this.things2draw = false;
    }
    addPoint(p) {
        this.pts.push(p);
    };
    clearQueues() {
        this.pts2draw = [];
        this.lines2draw = [];
        this.circles2draw = [];
        this.things2draw = false;
    }
    solve() {
        if (this.pts.length == 0) {return;}
        while (this.index < this.pts.length) {
            if (this.index == 0) {
                var p = this.pts[this.index];
                this.ball = new Circle(p, 0);
                this.index++;
            }
            else {
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
        return this.ball;
    };
    drawNext() {
        if (this.things2draw) {
            draw(this.pts2draw, this.lines2draw, this.circles2draw);
            this.clearQueues();
        }
        else {
            this.nextPoint();
        }
    };
    nextPoint() {
        if (this.pts.length == 0) return;
        if (this.index >= this.pts.length) return;
        var p = this.pts[this.index];
        this.pts2draw.push(p);
        this.things2draw = true;
        if (this.index == 0) {
            this.ball = new Circle(p, 0);
        }
        else if ( !(this.ball.contains(p)) ) {
            // find line k from new point p to ball center
            this.line = new Line(p, this.ball.c);
            // extend line by radius r to hit point q
            this.line = this.line.extendBy(this.ball.r);
            // add full line to draw queue
            this.lines2draw.push(this.line);
            // find midpoint c of line pq
            var newCenter = this.line.midpoint();
            this.ball = new Circle(newCenter, .5 * this.line.len());
            // add new circle to draw queue
            this.circles2draw.push(this.ball);
            this.things2draw = true;
        }
        this.index++;
        this.drawNext();
    };
}
