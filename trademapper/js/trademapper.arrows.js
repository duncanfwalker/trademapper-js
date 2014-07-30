
define(["d3"], function(d3) {
	"use strict";
	var mapsvg, config, svgdefs, arrowColours,

	/*
	 * Save the svg we use for later user
	 * Add the arrow head to defs/marker in the SVG
	 */
	init = function(svgElement, colours) {
		mapsvg = svgElement;
		arrowColours = colours;
		addDefsToSvg();
	},

	addDefsToSvg = function() {
		svgdefs = mapsvg.append("defs");
		// first add arrow head
		svgdefs.append("marker")
				.attr("id", "markerArrow")
				.attr("viewBox", "0 0 10 10")
				.attr("markerUnits", "strokeWidth")
				.attr("refX", "10")
				.attr("refY", "5")
				.attr("markerWidth", "4")
				.attr("markerHeight", "3")
				.attr("orient", "auto")
			.append("path")
				.attr("d", "M 0 0 L 10 5 L 0 10 z")
				.attr("class", "route-arrow-head");

		// now add a gradient
		var gradient = svgdefs.append("linearGradient")
			.attr("id", "route-grad");
		gradient.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", arrowColours.pathStart)
			.attr("stop-opacity", "0.5");
		gradient.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", arrowColours.pathEnd)
			.attr("stop-opacity", "0.5");
	},

	/*
	 * Draw a route - the route argument is basically a list of point
	 */
	drawRoute = function(route) {
		var routeline = d3.svg.line()
			.interpolate("monotone")
			.x(function(d) { return d.point[0]; })
			.y(function(d) { return d.point[1]; });

		mapsvg
			.append("path")
				.datum(route.points)
				.attr("class", "route-arrow")
				.attr("d", routeline)
				.attr("marker-end", "url(#markerArrow)")
				.attr("stroke", "url(#route-grad)")
				.attr("stroke-width", 2);
	},

	drawRouteCollection = function(collection) {
		var routeList = collection.getRoutes();
		for (var i = 0; i < routeList.length; i++) {
			if (routeList[i].points.length >= 2) {
				drawRoute(routeList[i]);
			}
		}
	};

	return {
		init: init,
		addDefsToSvg: addDefsToSvg,
		drawRoute: drawRoute,
		drawRouteCollection: drawRouteCollection
	};
});
