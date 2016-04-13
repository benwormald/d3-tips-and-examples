// Define the line

var chart1 = d3.select('.simple-linechart')
            .append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.csv('data2.csv', function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close; //+ sets to a numeric value
  });

  //scale range of data
  x.domain(d3.extent(data, function(d) { return d.date }));
  y.domain([0, d3.max(data, function(d) {return d.close })]);

  var valueline = d3.svg.line()
      .interpolate('step-before') //smooths line, makes steps, etc.
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });

  chart1.append('text')
      .attr('x', width/2)
      .attr('y', 0 - (margin.top/2))
      .attr('text-anchor', 'middle')
      .attr('class', 'h4')
      .text('Value vs. Date');

  chart1.append('path')
      .attr('class', 'line')
      .attr('d', valueline(data));

  chart1.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')') //we need to move (transform) it to the bottom by a set amount
      .call(xAxis);

  chart1.append('text') // text label for the x axis
      .attr('transform',
            'translate(' + (width/2) + ',' + + (height + margin.bottom - 10) +')')
      .style('text-anchor', 'middle')
      .text('Date');

  chart1.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

  chart1.append('text')
      .attr('transform', 'rotate(270)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height/2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Value');
  
});
