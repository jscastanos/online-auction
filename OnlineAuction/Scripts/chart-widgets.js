function lineChartWidget(element, dataset, chartHeight, lineColor, pathColor, pointerLineColor, pointerBgColor) {

      // Load data
    // ------------------------------

    dataset.forEach(function (d) {
        d.date = d.tranID
        d.alpha = d.qty;
    });

    // Main variables
    var d3Container = d3.select(element),
        margin = { top: 0, right: 0, bottom: 0, left: 0 },
        width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
        height = chartHeight - margin.top - margin.bottom,
        padding = 20;

    // Format date
    var parseDate = d3.time.format("%m/%d/%y").parse,
        formatDate = d3.time.format("%a, %B %e");


    // Add tooltip
    // ------------------------------

    var tooltip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function (d) {
            return "<ul class='list-unstyled mb-5'>" +
                "<li>" + "<div class='text-size-base mt-5 mb-5'><i class='icon-check2 position-left'></i>" + formatDate(d.dateTran) + "</div>" + "</li>" +
                "<li>" + "Items: &nbsp;" + "<span class='text-semibold pull-right'>" + d.alpha + "</span>" + "</li>" +
                "<li>" + "Total: &nbsp; " + "<span class='text-semibold pull-right'>" + "&#8369;" + (d.alpha * d.retail).toFixed(2) + "</span>" + "</li>" +
            "</ul>";
        });


    // Create chart
    // ------------------------------

    // Add svg element
    var container = d3Container.append('svg');

    // Add SVG group
    var svg = container
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(tooltip);




    // Construct scales
    // ------------------------------

    // Horizontal
    var x = d3.time.scale()
        .range([padding, width - padding]);

    // Vertical
    var y = d3.scale.linear()
        .range([height, 5]);


    // Set input domains
    // ------------------------------

    // Horizontal
    x.domain(d3.extent(dataset, function (d) {
        return d.date;
    }));

    // Vertical
    y.domain([0, d3.max(dataset, function (d) {
        return Math.max(d.alpha);
    })]);


    // Construct chart layout
    // ------------------------------

    // Line
    var line = d3.svg.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.alpha);
        });


    //
    // Append chart elements
    //

    // Add mask for animation
    // ------------------------------

    // Add clip path
    var clip = svg.append("defs")
        .append("clipPath")
        .attr("id", "clip-line-small");

    // Add clip shape
    var clipRect = clip.append("rect")
        .attr('class', 'clip')
        .attr("width", 0)
        .attr("height", height);

    // Animate mask
    clipRect
          .transition()
              .duration(1000)
              .ease('linear')
              .attr("width", width);


    // Line
    // ------------------------------

    // Path
    var path = svg.append('path')
        .attr({
            'd': line(dataset),
            "clip-path": "url(#clip-line-small)",
            'class': 'd3-line d3-line-medium'
        })
        .style('stroke', lineColor);

    // Animate path
    svg.select('.line-tickets')
        .transition()
            .duration(1000)
            .ease('linear');


    // Add vertical guide lines
    // ------------------------------

    // Bind data
    var guide = svg.append('g')
        .selectAll('.d3-line-guides-group')
        .data(dataset);

    // Append lines
    guide
        .enter()
        .append('line')
            .attr('class', 'd3-line-guides')
            .attr('x1', function (d, i) {
                return x(d.date);
            })
            .attr('y1', function (d, i) {
                return height;
            })
            .attr('x2', function (d, i) {
                return x(d.date);
            })
            .attr('y2', function (d, i) {
                return height;
            })
            .style('stroke', pathColor)
            .style('stroke-dasharray', '4,2')
            .style('shape-rendering', 'crispEdges');

    // Animate guide lines
    guide
        .transition()
            .duration(1000)
            .delay(function (d, i) { return i * 150; })
            .attr('y2', function (d, i) {
                return y(d.alpha);
            });


    // Alpha app points
    // ------------------------------

    // Add points
    var points = svg.insert('g')
        .selectAll('.d3-line-circle')
        .data(dataset)
        .enter()
        .append('circle')
            .attr('class', 'd3-line-circle d3-line-circle-medium')
            .attr("cx", line.x())
            .attr("cy", line.y())
            .attr("r", 3)
            .style({
                'stroke': pointerLineColor,
                'fill': pointerBgColor
            });

    // Animate points on page load
    points
        .style('opacity', 0)
        .transition()
            .duration(250)
            .ease('linear')
            .delay(1000)
            .style('opacity', 1);

    // Add user interaction
    points
        .on("mouseover", function (d) {
            tooltip.offset([-10, 0]).show(d);

            // Animate circle radius
            d3.select(this).transition().duration(250).attr('r', 4);
        })

        // Hide tooltip
        .on("mouseout", function (d) {
            tooltip.hide(d);

            // Animate circle radius
            d3.select(this).transition().duration(250).attr('r', 3);
        });

    // Change tooltip direction of first point
    d3.select(points[0][0])
        .on("mouseover", function (d) {
            tooltip.offset([0, 10]).direction('e').show(d);

            // Animate circle radius
            d3.select(this).transition().duration(250).attr('r', 4);
        })
        .on("mouseout", function (d) {
            tooltip.direction('n').hide(d);

            // Animate circle radius
            d3.select(this).transition().duration(250).attr('r', 3);
        });

    // Change tooltip direction of last point
    d3.select(points[0][points.size() - 1])
        .on("mouseover", function (d) {
            tooltip.offset([0, -10]).direction('w').show(d);

            // Animate circle radius
            d3.select(this).transition().duration(250).attr('r', 4);
        })
        .on("mouseout", function (d) {
            tooltip.direction('n').hide(d);

            // Animate circle radius
            d3.select(this).transition().duration(250).attr('r', 3);
        });


    // Resize chart
    // ------------------------------

    // Call function on window resize
    $(window).on('resize', lineChartResize);

    // Call function on sidebar width change
    $(document).on('click', '.sidebar-control', lineChartResize);

    // Resize function
    // 
    // Since D3 doesn't support SVG resize by default,
    // we need to manually specify parts of the graph that need to 
    // be updated on window resize
    function lineChartResize() {

        // Layout variables
        width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


        // Layout
        // -------------------------

        // Main svg width
        container.attr("width", width + margin.left + margin.right);

        // Width of appended group
        svg.attr("width", width + margin.left + margin.right);

        // Horizontal range
        x.range([padding, width - padding]);


        // Chart elements
        // -------------------------

        // Mask
        clipRect.attr("width", width);

        // Line path
        svg.selectAll('.d3-line').attr("d", line(dataset));

        // Circles
        svg.selectAll('.d3-line-circle').attr("cx", line.x());

        // Guide lines
        svg.selectAll('.d3-line-guides')
            .attr('x1', function (d, i) {
                return x(d.date);
            })
            .attr('x2', function (d, i) {
                return x(d.date);
            });
    }
}

function barChartWidget(element, barQty, height, animate, easing, duration, delay, color, tooltip) {


    // Basic setup
    // ------------------------------

    // Add data set
    var bardata = [];
    for (var i = 0; i < barQty; i++) {
        bardata.push(Math.round(Math.random() * 10) + 10);
    }

    // Main variables
    var d3Container = d3.select(element),
        width = d3Container.node().getBoundingClientRect().width;



    // Construct scales
    // ------------------------------

    // Horizontal
    var x = d3.scale.ordinal()
        .rangeBands([0, width], 0.3);

    // Vertical
    var y = d3.scale.linear()
        .range([0, height]);



    // Set input domains
    // ------------------------------

    // Horizontal
    x.domain(d3.range(0, bardata.length));

    // Vertical
    y.domain([0, d3.max(bardata)]);



    // Create chart
    // ------------------------------

    // Add svg element
    var container = d3Container.append('svg');

    // Add SVG group
    var svg = container
        .attr('width', width)
        .attr('height', height)
        .append('g');



    //
    // Append chart elements
    //

    // Bars
    var bars = svg.selectAll('rect')
        .data(bardata)
        .enter()
        .append('rect')
            .attr('class', 'd3-random-bars')
            .attr('width', x.rangeBand())
            .attr('x', function (d, i) {
                return x(i);
            })
            .style('fill', color);



    // Tooltip
    // ------------------------------

    // Initiate
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);

    // Show and hide
    if (tooltip == "hours" || tooltip == "goal" || tooltip == "members") {
        bars.call(tip)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
    }

    // Daily meetings tooltip content
    if (tooltip == "hours") {
        tip.html(function (d, i) {
            return "<div class='text-center'>" +
                    "<h6 class='no-margin'>" + d + "</h6>" +
                    "<span class='text-size-small'>meetings</span>" +
                    "<div class='text-size-small'>" + i + ":00" + "</div>" +
                "</div>";
        });
    }

    // Statements tooltip content
    if (tooltip == "goal") {
        tip.html(function (d, i) {
            return "<div class='text-center'>" +
                    "<h6 class='no-margin'>" + d + "</h6>" +
                    "<span class='text-size-small'>statements</span>" +
                    "<div class='text-size-small'>" + i + ":00" + "</div>" +
                "</div>";
        });
    }

    // Online members tooltip content
    if (tooltip == "members") {
        tip.html(function (d, i) {
            return "<div class='text-center'>" +
                    "<h6 class='no-margin'>" + d + "0" + "</h6>" +
                    "<span class='text-size-small'>members</span>" +
                    "<div class='text-size-small'>" + i + ":00" + "</div>" +
                "</div>";
        });
    }



    // Bar loading animation
    // ------------------------------

    // Choose between animated or static
    if (animate) {
        withAnimation();
    } else {
        withoutAnimation();
    }

    // Animate on load
    function withAnimation() {
        bars
            .attr('height', 0)
            .attr('y', height)
            .transition()
                .attr('height', function (d) {
                    return y(d);
                })
                .attr('y', function (d) {
                    return height - y(d);
                })
                .delay(function (d, i) {
                    return i * delay;
                })
                .duration(duration)
                .ease(easing);
    }

    // Load without animateion
    function withoutAnimation() {
        bars
            .attr('height', function (d) {
                return y(d);
            })
            .attr('y', function (d) {
                return height - y(d);
            });
    }



    // Resize chart
    // ------------------------------

    // Call function on window resize
    $(window).on('resize', barsResize);

    // Call function on sidebar width change
    $(document).on('click', '.sidebar-control', barsResize);

    // Resize function
    // 
    // Since D3 doesn't support SVG resize by default,
    // we need to manually specify parts of the graph that need to 
    // be updated on window resize
    function barsResize() {

        // Layout variables
        width = d3Container.node().getBoundingClientRect().width;


        // Layout
        // -------------------------

        // Main svg width
        container.attr("width", width);

        // Width of appended group
        svg.attr("width", width);

        // Horizontal range
        x.rangeBands([0, width], 0.3);


        // Chart elements
        // -------------------------

        // Bars
        svg.selectAll('.d3-random-bars')
            .attr('width', x.rangeBand())
            .attr('x', function (d, i) {
                return x(i);
            });
    }
}

function donutChartWidget(t, e) {
    var a = [{
        status: "Horny Goat Weed Tea",
        icon: "<span class='status-mark border-blue-300 position-left'></span>",
        value: 439,
        color: "#29B6F6"
    }, {
        status: "Civet Coffee",
        icon: "<span class='status-mark border-danger-300 position-left'></span>",
        value: 290,
        color: "#EF5350"
    }, {
        status: "Mang Inasal",
        icon: "<span class='status-mark border-success-300 position-left'></span>",
        value: 190,
        color: "#81C784"
    }, {
        status: "Head &amp; Shoulder",
        icon: "<span class='status-mark border-grey-300 position-left'></span>",
        value: 148,
        color: "#999"
    }],
        n = d3.select(t),
        r = e / 2 - 2,
        i = d3.sum(a, function (t) {
            return t.value
        }),
        s = d3.tip().attr("class", "d3-tip").offset([-10, 0]).direction("e").html(function (t) {
            return "<ul class='list-unstyled mb-5'><li><div class='text-size-base mb-5 mt-5'>" + t.data.icon + t.data.status + "</div></li><li>Total: &nbsp;<span class='text-semibold pull-right'>" + t.value + "</span></li><li>Share: &nbsp;<span class='text-semibold pull-right'>" + (100 / (i / t.value)).toFixed(2) + "%</span></li></ul>"
        }),
        l = n.append("svg").call(s),
        o = l.attr("width", e).attr("height", e).append("g").attr("transform", "translate(" + e / 2 + "," + e / 2 + ")"),
        d = d3.layout.pie().sort(null).startAngle(Math.PI).endAngle(3 * Math.PI).value(function (t) {
            return t.value
        }),
        c = d3.svg.arc().outerRadius(r).innerRadius(r / 2),
        u = o.selectAll(".d3-arc").data(d(a)).enter().append("g").attr("class", "d3-arc").style("stroke", "#fff").style("cursor", "pointer"),
        p = u.append("path").style("fill", function (t) {
            return t.data.color
        });
    p.on("mouseover", function (t, e) {
        d3.select(this).transition().duration(500).ease("elastic").attr("transform", function (t) {
            return t.midAngle = (t.endAngle - t.startAngle) / 2 + t.startAngle, "translate(" + 2 * Math.sin(t.midAngle) + "," + 2 * -Math.cos(t.midAngle) + ")"
        })
    }).on("mousemove", function (t) {
        s.show(t).style("top", d3.event.pageY - 40 + "px").style("left", d3.event.pageX + 30 + "px")
    }).on("mouseout", function (t, e) {
        d3.select(this).transition().duration(500).ease("bounce").attr("transform", "translate(0,0)"), s.hide(t)
    }), p.transition().delay(function (t, e) {
        return 500 * e
    }).duration(500).attrTween("d", function (t) {
        var e = d3.interpolate(t.startAngle, t.endAngle);
        return function (a) {
            return t.endAngle = e(a), c(t)
        }
    })
}