function distance_between_points_squared(point1, point2) {
    return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
}

function scalar_multiply(vector, scalar) {
    return [vector[0] * scalar, vector[1] * scalar];
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
    // this is going to be less fun to do than I'd hope...
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
