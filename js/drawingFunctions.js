/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 var w = 500;
 var h = 500;

 var svg = d3.select("body").append("svg");
 svg.attr("width", w)
    .attr("height", h);

function drawObject(obj) {
  if (obj.type === 'point') {
    drawPoint(obj);
  };
}

function drawPoint(obj) {
    var pt = new d3.symbol;
    svg.selectAll()
}
