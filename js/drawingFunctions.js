/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
echo "hello world";

 var w = 500;
 var h = 500;

 var svg = new d3.select("body").append("svg");
 svg.attr("width", w)
    .attr("fill", 'red')
    .attr("height", h);

function clearScreen() {}

function drawObject(obj) {
  if (obj.type === 'point') {
    drawPoint(obj);
  } else if (obj.type === 'circle') {
    drawCircle(obj);
  } else if (obj.type === 'line') {
    drawLine(obj);
  };
}

function drawPoint(obj) {
    var pt = svg.append("circle");
    pt.attr("cx", obj.c.x)
          .attr("cy", obj.c.y)
          .attr("r", 5);
    if (pt.active === 1) {
      pt.attr("class", "activePoint");
    } else {
      pt.attr("class", "inactivePoint");
    }
}

function drawCircle(obj) {
  dataset = [obj.c.x, obj.c.y, obj.r];
  var cir = svg.selectAll("circle")
               .data(dataset)
               .enter()
               .append("circle");
  cir.attr("cx", obj.c.x)
                     .attr("cy", obj.c.y)
                     .attr("r", obj.r);

  // var newCir = svg.append("circle");
  // newCir.attr("cx", obj.c.x)
  //       .attr("cy", obj.c.y)
  //       .attr("r", obj.r);
  // if (obj.active === 1) {
  //   newCir.attr("class", "activeCircle");
  // } else {
  //   newCir.attr("class", "inactiveCircle");
  // }
}

function drawLine(obj) {
  var line = d3.path();
  line.moveTo(obj.start.x, obj.start.y);
  line.lineTo(obj.end.x, obj.end.y);
  if (obj.active === 1) {
    line.attr("class", "activeLine");
  } else {
    line.attr("class", "inactiveLine");
  }
  svg.append(line);
}
