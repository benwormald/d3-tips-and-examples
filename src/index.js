$.getScript( "src/js/simple-linechart.js" );
$.getScript( "src/js/simple-linechart-dash.js" );
$.getScript( "src/js/simple-linechart-labeled.js" );

var margin = {top: 50, right: 150, bottom: 80, left: 50},
    width = 640 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format('%d-%b-%y').parse;
//set ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);
