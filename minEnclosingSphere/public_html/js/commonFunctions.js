function distance_between_points_squared(point1, point2) {
    return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
}

function scalar_multiply(line, scalar) {
    var new_endpoint = new Point(scalar * line.endpoint.x, scalar * line.endpoint.y);
    var new_line = new Line(startpoint, new_endpoint);
    return new_line;
}

function midpoint(point1, point2) {
    var point = new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
    return point;
}

function circle_two_points(point1, point2) {
    var center = midpoint(point1, point2);
    var radius = Math.sqrt(distance_between_points_squared(point1, point2)) / 2;
    var circle = new Circle(center, radius)
    return circle;
}

function circle_three_points(point1, point2, point3) {
    var center_x = ((math.pow(point1.x,2) + math.pow(point1.y,2))*(point2.y - point3.y) + 
                (math.pow(point2.x,2) + math.pow(point2.y,2))*(point3.y - point1.y) + 
                (math.pow(point3.x,2) + math.pow(point3.y,2))*(point1.y - point2.y)) /
                (2 * (point1.x *(point2.y - point3.y) + point2.x * (point3.y - point1.y) + point3.x * (point1.y - point2.y)));
    var center_y = ((math.pow(point1.x,2) + math.pow(point1.y,2))*(point3.x - point2.x) + 
                (math.pow(point2.x,2) + math.pow(point2.y,2))*(point1.x - point3.x) + 
                (math.pow(point3.x,2) + math.pow(point3.y,2))*(point2.x - point1.x)) /
                (2 * (point1.x *(point2.y - point3.y) + point2.x * (point3.y - point1.y) + point3.x * (point1.y - point2.y)));
    var center = new Point(center_x, center_y)
    var radius = math.sqrt(distance_between_points_squared(center, point1));
    var return_circle = new Circle(center, radius)
    return return_circle;
}

function find_max_distance(point, list) {
    var max_index = 0;
    var max_square_distance = distance_between_points_squared(point, list[0]);
    for (index = 1, len = list.length; index < len; ++index) {
        candidate = list[index];
        candidate_distance = distance_between_points_squared(point, candidate);
        if (candidate_distance > max_square_distance) {
            max_index = index;
            max_square_distance = candidate_distance;
        }
    }
    return [max_index, max_square_distance];
}
