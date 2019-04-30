/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 // document.write("<script src=\"https://d3js.org/d3.v5.min.js\"></script>");

console.log("Hello World");
// alert("Hello world alert");

 var w = 500;
 var h = 500;

 var plot = new d3.select("body").append("svg");
 plot.attr("width", w)
    .attr("fill", 'red')
    .attr("height", h);

function clearScreen() {
  plot.selectAll("shapes").remove();
}

var drawObject;

function drawCircle(d) {
  return d3.geoCircle()
           .center([d.c.x, d.c.y])
           .radius(d.r);
}

function drawPoint(d) {
  return d3.geoCircle()
                .center([d.x, d.y])
                .radius(5);
}

function drawLine(d) {
  return d3.lineTo(d.end.x, d.end.y);
}
drawObject = function(data) {
  // var drawCircle;
  var drawPoint, drawLine;

  clearScreen();
  //
  // drawCircle = d3.geoCircle()
  //                .center([d.c.x, d.c.y])
  //                .radius(d.r);

  // drawPoint = d3.geoCircle()
  //               .center([d.x, d.y])
  //               .radius(5);

  // drawLine = d3.lineTo(d.end.x, d.end.y);

  plot.selectAll("shapes")
     .data(data)
     .enter()
     .append(function(d){
       if (d.type === 'point') {
         return "svg:path";
       } else if (d.type === 'circle') {
         return "svg:path";
       } else if (d.type === 'line') {
         return "svg:path";
       };
     })
     .attr("d", function(d) {
       if (d.type === 'point') {
         return drawPoint(d);
       } else if (d.type === 'circle') {
         return drawCircle(d);
       } else if (d.type === 'line') {
         plot.moveTo(d.start.x, d.start.y)
         return drawLine(d);
       };
     })
     .attr("class", function(d) {
       if (d.type === 'point') {
         if (d.active === 1) {
           return "activePoint";
         } else {
           return "inactivePoint";
         }
       } else if (d.type === 'circle') {
         if (d.active === 1) {
           return "activeCircle";
         } else {
           return "inactiveCircle";
         }
       } else if (d.type === 'line') {
         if (d.active === 1) {
           return "activeLine";
         } else {
           return "inactiveLine";
         }
       };
     });
}

function draw(data) {
  return drawObject(data);
}

//
// function drawPoint(obj) {
//     var pt = svg.append("circle");
//     pt.attr("cx", obj.c.x)
//           .attr("cy", obj.c.y)
//           .attr("r", 5);
//     if (obj.active === 1) {
//       pt.attr("class", "activePoint");
//     } else {
//       pt.attr("class", "inactivePoint");
//     }
// // }
//
// function drawCircle([obj]) {
//   dataset = [obj.c.x, obj.c.y, obj.r];
//   var cir = svg.selectAll("circle")
//                .data(dataset)
//                .enter()
//                .append("circle");
//   cir.attr("cx", obj.c.x)
//      .attr("cy", obj.c.y)
//      .attr("r", obj.r);
// }
//
//   function drawLine(obj) {
//     svg.moveTo(obj.start.x, obj.start.y);
//     var line = d3.lineTo(obj.end.x, obj.end.y);
//     if (obj.active === 1) {
//       line.attr("class", "activeLine");
//     } else {
//       line.attr("class", "inactiveLine");
//     }
//   }
// //
// // function drawLine(obj) {
// //   var line = d3.path();
// //   line.moveTo(obj.start.x, obj.start.y);
// //   line.lineTo(obj.end.x, obj.end.y);
// //   if (obj.active === 1) {
// //     line.attr("class", "activeLine");
// //   } else {
// //     line.attr("class", "inactiveLine");
// //   }
// //   svg.append(line);
// // }
