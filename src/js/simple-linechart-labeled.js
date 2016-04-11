var chart3 = d3.select('.simple-linechart-labeled')
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
    console.log(d.open);
  });
  //scale range of data
  x.domain(d3.extent(data, function(d) { return d.date }));
  y.domain([0, d3.max(data, function(d) {return Math.max(d.close, d.open) })]);

  var valueline3 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });
  var valueline4 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.open); });
  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom").ticks(10);

  chart3.append('text')
      .attr('x', width/2)
      .attr('y', 0 - (margin.top/2))
      .attr('text-anchor', 'middle')
      .attr('class', 'h4')
      .text('Value vs. Date');

  chart3.append('path')
      .attr('class', 'line')
      .style('stroke', 'rgb(135, 131, 217)')
      .attr('d', valueline3(data));

  chart3.append('text')
      .attr('transform', 'translate(' + (width+3) + ',' + y(data[0].close) +')')
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .attr('font-size', '10px')
      .style('fill', 'rgb(135, 131, 217)')
      .text('Series 1');

  chart3.append('path')
      .attr('class', 'line')
      .style('stroke', 'rgb(209, 100, 49)')
      .attr('d', valueline4(data));

  chart3.append('text')
      .attr('transform', 'translate(' + (width+3) + ',' + y(data[0].open) +')')
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .attr('font-size', '10px')
      .style('fill', 'rgb(209, 100, 49)')
      .text('Series 2');

  chart3.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')') //we need to move (transform) it to the bottom by a set amount
      .call(xAxis)
      .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', function(d) {
          return 'rotate(-65)'
        });

  chart3.append('text') // text label for the x axis
      .attr('transform',
            'translate(' + (width/2) + ',' + + (height + margin.bottom -10) +')')
      .style('text-anchor', 'middle')
      .text('Date');

  chart3.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

  chart3.append('text')
      .attr('transform', 'rotate(270)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height/2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Value');
});
