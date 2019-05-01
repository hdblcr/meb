// file: exactAlgorithm.js

/* Authors Note: 
    I must say, I am sorry for writing this with pyhton conventions. I reckognize that javscript uses Java's CamelCase but I don't like it
*/

class ExactMinBall {
    constructor(points) {
        this.points_to_add = points;
        this.solution_flag = 0;
        this.points_added = [];
        this.solution_circle = null;
        this.boundary_points = [];
        this.step_index = 0;
        this.points_to_draw = [];
        this.lines_to_draw = [];
        this.circles_to_draw = [];
   }

   quick_solve() {
       for(i = 0; i < this.points_to_add.length; i++) {
           this.solve_next_point()
       }
       this.solution_circle.optimal();
   }

   solve_next_point() {
       // remove the first point and create a variable for it
        var adding_point;
        if(this.points_to_add.length == 0) {
            return;
        }
        else {
            adding_point = this.points_to_add.shift();
        }
        
        // if we have a small number of points
        if(this.points_added.length < 2) {
            if(this.solution_circle == null) {
                this.solution_circle = new Circle(adding_point, 0);
                this.boundary_points = [adding_point];
            }
            else {
                this.solution_circle = circle_two_points(points_added[0], adding_point);
                this.boundary_points.push(adding_point);
            }
        }

        //generally check points
        else{
            // in the circle
            if(distance_between_points_squared(this.solution_circle.c, adding_point) < this.solution_circle.r * this.solution_circle.r){
                this.points_added.push(adding_point);
            }
            // out of the circle
            else{
                var distance_tuple = find_max_distance(adding_point, this.points_added);
                var cross_point = this.points_added[distance_tuple[0]];
                var potential_circle = circle_two_points(cross_point, adding_point);
                distance_tuple = find_max_distance(potential_circle.c, this.points_added);
                
                // is there an already added point outside the new circle?
                if(distance_tuple[1] > potential_circle.r * potential_circle.r) {
                    var third_point = this.points_added[distance_tuple[0]];
                    this.solution_circle = circle_three_points(adding_point, cross_point, third_point);
                    this.boundary_points = [adding_point, cross_point, third_point];
                }
                // the new circle covers them all
                else {
                    this.solution_circle = potential_circle();
                    this.boundary_points = [adding_point, cross_point];
                }
            }
        }
        
        // the point has been added
        this.points_added.push(adding_point);

        // Check if complete
        this.check_solved();
   }

   check_solved() {
       if(this.points_to_add.length == 0) {
           this.solution_flag = 1;
       }
   }

   add_point(point) {
       this.points_to_add.push(point);
       this.solution_flag = 0;
       console.log(this.points_to_add);
   }

   clear() {
        this.points_added = [];
        this.points_to_add = [];
        this.solution_circle = null;
        this.boundary_points = [];
        this.solution_flag = 0;
        this.step_index = 0;
        this.points_to_draw = [];
        this.lines_to_draw = [];
        this.circles_to_draw = [];
   }

   add_points(points) {
       points.forEach( function(point) {
           this.points_to_add.push(point);
       });
    }

    draw_elements(){
        console.log("Drawing Elements");
        console.log(this.circles_to_draw, this.lines_to_draw, this.points_to_draw);
        draw(this.points_to_draw, this.lines_to_draw, this.circles_to_draw);
        this.points_to_draw = [];
        this.lines_to_draw = [];
        this.circles_to_draw = [];
    }

    visual_step() {
        console.log("step "+ this.step_index, this.points_added, this.points_to_add);
        switch(this.step_index) {
            case 0:
                this.show_base_circle();
                break;
            case 1:
                this.show_new_point();
                break;
            case 2:
                this.show_cross_distance();
                break;
            case 3:
                this.show_potential_circle();
                break;
            case 4:
                this.show_third_distance();
                break;
            case 5:
                this.show_final_circle();
        }
    }

    show_base_circle() {
        if(this.solution_circle != null) {
            this.circles_to_draw.push(this.solution_circle);
            this.points_added.forEach(this.points_to_draw.push, this);
            this.draw_elements();
        }
        this.step_index++;
    }

    show_new_point() {
        var adding_point;
        if(this.points_to_add.length == 0) {
            this.step_index = 0;
            return;
        }
        else {
            adding_point = this.points_to_add[0];
        }
        if(this.solution_circle == null) {
            this.solution_circle = new Circle(adding_point, 1);
            this.boundary_points = [adding_point];
            this.points_added.push(adding_point);
            this.points_to_add.shift();
            this.step_index = 0;
        }
        else { 
            this.points_to_draw.push(adding_point);
            if(this.points_added.length == 1) {
                this.solution_circle = circle_two_points(this.points_added[0], adding_point);
                this.boundary_points.push(adding_point);
                this.points_added.push(adding_point);
                this.points_to_add.shift();
                this.check_solved();
                this.step_index = 0;
            }
            else {
                this.circles_to_draw.push(this.solution_circle);
                this.points_added.forEach(this.points_to_draw.push, this);
                this.points_to_draw.push(adding_point);
                if(distance_between_points_squared(adding_point,this.solution_circle.c) > this.solution_circle.r * this.solution_circle.r) {
                    this.boundary_points = [adding_point];
                    this.step_index++;
                }
                else {
                    this.step_index = 0;
                    this.points_added.push(adding_point);
                    this.points_to_add.shift()
                }
            }
        }
        this.circles_to_draw.push(this.solution_circle);
        this.draw_elements();
    }
    
    
    show_cross_distance() {
        var adding_point;
        if(this.points_to_add.length == 0) {
            this.step_index = 0;
            return;
        }
        else {
            adding_point = this.points_to_add[0];
        }
        if(this.solution_circle == null) {
            this.step_index = 0;
            return;
        }
        else {
            var distance_tuple = find_max_distance(adding_point, this.points_added);
            var cross_point = this.points_added[distance_tuple[0]];
            var crossline = new Line(adding_point, cross_point);
            this.lines_to_draw.push(crossline);
            this.boundary_points.push(cross_point);
            this.step_index++;
        }
        this.draw_elements();
    }

    show_potential_circle() {
        var adding_point;
        var cross_point;
        if(this.points_to_add.length == 0) {
            this.step_index = 0;
            return;
        }
        else {
            adding_point = this.points_to_add[0];
        }
        if(this.boundary_points.length == 2) {
            cross_point = this.boundary_points[1];
            var potential_circle = circle_two_points(adding_point, cross_point);
            this.circles_to_draw.push(potential_circle);
            var distance_tuple = find_max_distance(potential_circle.c, this.points_added);
            if(distance_tuple[1] > potential_circle.r * potential_circle.r) {
                this.step_index++;
                this.boundary_points.push(this.points_added[distance_tuple[0]]);
            }
            else{
                this.step_index = 0;
                this.points_added.push(adding_point);
                this.points_to_add.shift();
                this.check_solved();
            }
            this.points_added.forEach(this.points_to_draw.push, this);
            this.solution_circle = potential_circle;
        }
        this.draw_elements();
    }
    
    show_third_distance() {
        var third_point;
        if(this.boundary_points.length == 3) {
            third_point = this.boundary_points[2];
            var third_line = new Line(third_point,this.solution_circle.c);
            this.lines_to_draw.push(third_line);
            this.circles_to_draw.push(this.solution_circle);
            this.step_index++;
        }
        else {
            this.step_index = 0;
            return;
        }
        this.draw_elements();
    }

    show_final_circle() {
        var adding_point;
        var cross_point;
        var third_point;
        if(this.boundary_points.length == 3) {
            adding_point = this.boundary_points[0];
            cross_point = this.boundary_points[1];
            third_point = this.boundary_points[2];
            this.solution_circle = circle_three_points(adding_point, cross_point, third_point);
            this.points_added.push(adding_point);
            this.points_to_add.shift();
            this.points_added.forEach(this.points_to_draw.push, this);
            this.step_index = 0;
            this.check_solved();
            this.circles_to_draw.push(this.solution_circle);
        }
        else {
            this.step_index = 0;
            return;
        }
        this.draw_elements();
    }
}