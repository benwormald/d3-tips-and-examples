var margin = {top: 80, right: 10, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
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
// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select('body')
            .append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.csv('data.csv', function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close; //+ sets to a numeric value
  });

  //scale range of data
  x.domain(d3.extent(data, function(d) { return d.date }));
  y.domain([0, d3.max(data, function(d) {return d.close })]);

  svg.append('path')
      .attr('class', 'line')
      .attr('d', valueline(data));

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);
  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
});
