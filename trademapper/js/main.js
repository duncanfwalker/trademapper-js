require.config({
	baseUrl: 'js',
	paths: {
		d3: "d3/d3",
		topojson: "d3/topojson.v1"
	}
});

// once loaded, get to work
require(["d3", "trademapper", "domReady!"], function(d3, tm, doc) {
	"use strict";
	var config = {width: 2000};
	tm.init("#trademapper", "#form-filters", config);
});
