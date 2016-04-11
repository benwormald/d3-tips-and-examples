// Define the line

var chart4 = d3.select('.linechart-update-data')
            .append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
var valueline = d3.svg.line()
    .interpolate('monotone') //smooths line, makes steps, etc.
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

$('#option').change(function() {
  if ($(this).is(':checked')) {
    updateData();
  } else {
    revertData();
  }
})

d3.csv('data.csv', function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close; //+ sets to a numeric value
  });

  //scale range of data
  x.domain(d3.extent(data, function(d) { return d.date }));
  y.domain([0, d3.max(data, function(d) {return d.close })]);


  chart4.append('text')
      .attr('x', width/2)
      .attr('y', 0 - (margin.top/2))
      .attr('text-anchor', 'middle')
      .attr('class', 'h4')
      .text('Value vs. Date');

  chart4.append('path')
      .attr('class', 'line')
      .style('stroke', 'rgb(85, 186, 159)')
      .attr('d', valueline(data));

  chart4.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')') //we need to move (transform) it to the bottom by a set amount
      .call(xAxis);

  chart4.append('text') // text label for the x axis
      .attr('transform',
            'translate(' + (width/2) + ',' + + (height + margin.bottom - 10) +')')
      .style('text-anchor', 'middle')
      .text('Date');

  chart4.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

  chart4.append('text')
      .attr('transform', 'rotate(270)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height/2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Value');
});


function updateData() {
  console.log('gotta update');
  d3.csv("data-alt.csv", function(error, data) {
    data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  // Scale the range of the data again
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

// Select the section we want to apply our changes to
  var chart4 = d3.select(".linechart-update-data").transition();

  // Make the changes
      chart4.select(".line")   // change the line
          .duration(750)
          .attr("d", valueline(data));
      chart4.select(".x.axis") // change the x axis
          .duration(750)
          .call(xAxis);
      chart4.select(".y.axis") // change the y axis
          .duration(750)
          .call(yAxis);
  });
}

function revertData() {
  console.log('gotta update');
  d3.csv("data.csv", function(error, data) {
    data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  // Scale the range of the data again
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

// Select the section we want to apply our changes to
  var chart4 = d3.select(".linechart-update-data").transition();

  // Make the changes
      chart4.select(".line")   // change the line
          .duration(750)
          .attr("d", valueline(data));
      chart4.select(".x.axis") // change the x axis
          .duration(750)
          .call(xAxis);
      chart4.select(".y.axis") // change the y axis
          .duration(750)
          .call(yAxis);
  });
}
