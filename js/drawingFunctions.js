/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 // document.write("<script src=\"https://d3js.org/d3.v5.min.js\"></script>");

console.log("Hello World");
// alert("Hello world alert");
var w = window.innerWidth * 0.9,
    h = window.innerHeight - 200,
    margin = { top: 40, right: 0, bottom: 20, left: 0 };

var ptSize = 3;

var plot = d3.select("body")
             .append("svg")
             .attr("width", w)
             .attr("height", h);

function clearScreen() {
  plot.selectAll("circle").remove();
  plot.selectAll("line").remove();
  plot.selectAll("point").remove();
};

function drawLines(lineData){
  return plot.selectAll(".line")
      .data(lineData)
      .enter()
      .append("line")
      .attr("x1", function(d) { return d.start.x; })
      .attr("y1", function(d) { return d.start.y; })
      .attr("x2", function(d) { return d.end.x; })
      .attr("y2", function(d) { return d.end.y; })
      .attr("class", function(d) {
        if (d.active === 1) {
          return "activeLine";
        } else {
          return "inactiveLine";
        }
      });
}

function drawPoints(points) {
  return plot.selectAll(".point")
    .data(points)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", ptSize)
    .attr("class", function(d) {
      if (d.active === 1) {
        return "activePoint";
      } else {
        return "inactivePoint";
      }
    });
}

function drawCircles(circles) {
  return plot.selectAll(".circle")
    .data(circles)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.c.x; })
    .attr("cy", function(d) { return d.c.y; })
    .attr("r", function(d) { return d.r; })
    .attr("class", function(d) {
      if (d.active === 1) {
        return "activeCircle";
      } else if (d.active === 0) {
        return "inactiveCircle";
      } else if (d.active === 2) {
        return "optimalCircle";
      } else {
        return "";
      }
    });
}

function drawObject(allObjs) {
  draw(allObjs[0], allObjs[1], allObjs[2]);
}

function draw(points, lines, circles) {
  // draw the things
  clearScreen();
  drawLines(lines);
  drawPoints(points);
  drawCircles(circles);
}

function drawOptimal(circle) {
  drawCircles([circle]);
}
