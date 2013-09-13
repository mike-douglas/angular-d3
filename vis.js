function LineChart()
{
    var width = 400,
        height = 400,
        xScale = d3.scale.linear(),
        yScale = d3.scale.linear(),
        x = function(d, i) { return d; },
        y = function(d, i) { return i; },
        xAxis = d3.svg.axis().scale(xScale),
        area = d3.svg.line()
                    .interpolate('basis')
                    .x(function(d, i) { return xScale(x(d, i)); })
                    .y(function(d, i) { return yScale(y(d, i)); });

    function chart(selection)
    {
        selection.each(function(data) {
            var svg = d3.select(this).append('svg')
                        .attr({
                            width: width,
                            height: height
                        })
                        .append('g')
                        .attr('transform', 'translate(10, 0)');

            xScale.domain(d3.extent(data)).range([0, width - 10]);
            yScale.domain([0, data.length]).range([height - 20, 0]);
            
            svg.append('g')
                .attr({
                    'class': 'data',
                    'transform': 'translate(0, ' + 0 + ')'
                })
                .selectAll('path').data([data])
                    .enter()
                    .append('path')
                    .attr('d', area);

            svg.append('g')
                .attr({
                    'class': 'axis',
                    'transform': 'translate(0, ' + (height - 20) + ')'
                })
                .call(xAxis);
        });
    }

    chart.width = function(value) {
        if (value == undefined) return width;

        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (value == undefined) return height;

        height = value;
        return chart;
    };

    chart.xAxis = function(value) {
        if (value == undefined) return xAxis;

        xAxis = value;
        return chart;
    };

    return chart;
}