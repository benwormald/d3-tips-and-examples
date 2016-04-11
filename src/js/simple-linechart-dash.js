var chart2 = d3.select('.simple-linechart-dash')
            .append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.csv('data2.csv', function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.open = +d.open;
    d.close = +d.close; //+ sets to a numeric value
  });
  //scale range of data
  x.domain(d3.extent(data, function(d) { return d.date }));
  y.domain([0, d3.max(data, function(d) {return Math.max(d.close, d.open) })]);

  var valueline = d3.svg.line()
      .interpolate('monotone') //smooths line, makes steps, etc.
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });
  var valueline2 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.open); });

  chart2.append('text')
      .attr('x', width/2)
      .attr('y', 0 - (margin.top/2))
      .attr('text-anchor', 'middle')
      .attr('class', 'h4')
      .text('Value vs. Date');

  chart2.append('path')
      .attr('class', 'line')
      .attr('stroke-dasharray', ('3, 3'))
      .attr('d', valueline(data));

  chart2.append('path')
      .attr('class', 'line')
      .style('stroke', 'rgb(85, 186, 159)')
      .attr('d', valueline2(data));

  chart2.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')') //we need to move (transform) it to the bottom by a set amount
      .call(xAxis);

  chart2.append('text') // text label for the x axis
      .attr('transform',
            'translate(' + (width/2) + ',' + + (height + margin.bottom -10) +')')
      .style('text-anchor', 'middle')
      .text('Date');

  chart2.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

  chart2.append('text')
      .attr('transform', 'rotate(270)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height/2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Value');
});
