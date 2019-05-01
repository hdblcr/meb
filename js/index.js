/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 var points = []
 var centery = new Point(50, 50);
 var edgey = new Point(750,250);
 var pointy = new Point(500, 100);
 var points = [centery, edgey, pointy];
 var circley = new Circle(centery, 30);
 var circlez = new Circle(edgey, 45);
 circlez.deactivate();
 var liney = new Line(centery, edgey);
 var linez = new Line(centery, pointy);
 linez.deactivate();
 var circles = [circley, circlez];
 var liness = [liney, linez];

 draw(points, liness, circles);
 d3.select("svg")
   .on("click", function() {
     coord = d3.mouse(this)
     console.log(coord)
     pt = new Point(coord[0], coord[1]);
     for (i = 0; i < points.length; i++) {
       points[i].deactivate();
     }
     points.push(pt)
     draw(points, [], []); // draw the dot
   });

var center = new Point(50, 50);
var circle = new Circle(center, 30);
drawCircle(circle);

          function randomPoint() {
            var newval = Math.random() * 500;
            return newval;
          };

          function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['X',               'Y'],
                [ randomPoint(),    randomPoint()],
                [ randomPoint(),    randomPoint()],
                [ randomPoint(),    randomPoint()],
                [ randomPoint(),    randomPoint()],
                [ randomPoint(),    randomPoint()],
                [ randomPoint(),    randomPoint()]
                ]);

            var options = {
                title: 'Random Points',
                hAxis: {title: 'X', minValue: 0, maxValue: 100},
                vAxis: {title: 'Y', minValue: 0, maxValue: 100},
                legend: 'none'
              };

            var chart = new google.visualization.ScatterChart(document.getElementById('buncha_points'));

            chart.draw(data, options);
          }

          function drawChart2() {
            var data = new google.visualization.DataTable();
            data.addColumn('number');
            data.addColumn('number');
//            data.addRow([randomPoint(), randomPoint()]);

            var options = {
              legend: 'none',
              colors: ['#087037'],
              pointShape: 'star',
              pointSize: 18,
              animation: {
                duration: 200,
                easing: 'linear'
              },
              hAxis: {title: 'X', minValue: 0, maxValue: 100},
              vAxis: {title: 'Y', minValue: 0, maxValue: 100}
            };

            var chart = new google.visualization.ScatterChart(document.getElementById('buncha_points_delay'));

            // Start the animation by listening to the first 'ready' event.
            google.visualization.events.addOneTimeListener(chart, 'ready', addPoint);
            chart.draw(data, options);

            // Pause with click
//            google.visualization.events.addListener(chart, 'click', pause);

//             Control all other animations by listening to the 'animationfinish' event.
//            google.visualization.events.addListener(chart, 'animationfinish', addPoint);

            google.visualization.events.addListener(chart, 'click', addPoint);

            function addPoint() {
              data.addRow([randomPoint(), randomPoint()]);
              chart.draw(data, options);
            }
          }

          function startDraw() {
              drawChart3();
              setTimeout(endDraw, 120000);
          }

          function endDraw() {
              drawChart3();
          }

          function handler(go) {
              if (go) {

              }
          }

          function drawChart3() {
            var data = new google.visualization.DataTable();
            data.addColumn('number');
            data.addColumn('number');

            var options = {
              legend: 'none',
              colors: ['#087037'],
              pointShape: 'square',
              pointSize: 18,
              animation: {
                duration: 200,
                easing: 'linear'
              },
              hAxis: {title: 'X', minValue: 0, maxValue: 100},
              vAxis: {title: 'Y', minValue: 0, maxValue: 100}
            };

            var chart = new google.visualization.ScatterChart(document.getElementById('auto_till_stop'));

            // Start the animation by listening to the first 'ready' event.
            google.visualization.events.addOneTimeListener(chart, 'ready', addPoint);
            chart.draw(data, options);

            // this is the part the handler should do
            google.visualization.events.addListener(chart, 'click', addPoint);

            function addPoint() {
              data.addRow([randomPoint(), randomPoint()]);
              chart.draw(data, options);
            }
          }

          function svg1() {
              var point = new Point(randomPoint(), randomPoint());
              var newString = "<svg width='500' height='500'>";
              newString += "<circle cx='250' cy='250' r='200' stroke='green' stroke-width='4' fill='blue'/>";
              newString += "<circle cx='250' cy='250' r='5' stroke-width='5' />";
              newString += "</svg>";
              document.getElementById('svg1').innerHTML = newString;
              window.addEventListener("DOMContentLoaded", initialize);
          }
