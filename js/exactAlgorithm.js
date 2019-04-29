// file: exactAlgorithm.js

class ExactMinBall {
    constructor(points) {
        this.points_to_add = points;
        this.solution_flag = 0;
        this.points_added = [];
        this.solution_circle = null;
        this.boundary_points = [];
   }

   quick_solve() {
       for(i = 0; i < len(this.points_to_add); i++) {
           this.solve_next_point()
       }
   }

   solve_next_point() {
       // remove the first point and create a variable for it
        var adding_point = this.points_to_add.shift()
        
        // if we have a small number of points
        if(len(this.points_added) < 2) {
            if(this.solution_circle == null) {
                this.solution_circle = new Circle(adding_point, 0);
            }
            else {
                this.solution_circle = circle_two_points(points_added[0], adding_point);
            }
            this.boundary_points.push(adding_point);
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
       if(len(this.points_to_add) == 0) {
           this.solution_flag = 1;
       }
   }

   add_point(point) {
       this.points_to_add.push(point);
       this.solution_flag = 0;
   }

   clear() {
       this.points_added = [];
       this.points_to_add = [];
       this.solution_circle = null;
       this.boundary_points = [];
       this.solution_flag = 0;
   }

   add_points(points) {
       points.forEach( function(point) {
           this.points_to_add.push(point);
       });
    }
   
}