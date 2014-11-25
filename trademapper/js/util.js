define(['jquery'], function($) {
	return {
		intersection: function(arr1, arr2) {
			var ret = [];
			for (var i = 0; i < arr1.length; i++) {
				for (var j = 0; j < arr2.length; j++) {
					if (arr1[i] == arr2[j]) {
						ret.push(arr1[i]);
						break;
					}
				}
			}
			return ret;
		},

		isInt: function(value) {
			return (typeof value === 'number' && (value%1) === 0);
		},

		/*
		 * deep copy of a javascript object
		 */
		deepCopy: function(obj) {
			return $.extend(true, {}, obj);
		},

		corsProxy: function(url) {
			return "http://www.corsproxy.com/" + url.replace(/^https?:\/\//, "");
		},

		getPageOffsetRect: function(elem) {
			var box = elem.getBoundingClientRect();

			return {
				top:    Math.round(box.top + window.pageYOffset),
				bottom: Math.round(box.bottom + window.pageYOffset),
				left:   Math.round(box.left + window.pageXOffset),
				right:  Math.round(box.right + window.pageXOffset)
			};
		},

		// from http://stackoverflow.com/a/979995/3189
		queryString: function () {
			// This function is anonymous, is executed immediately and
			// the return value is assigned to QueryString!
			var query_string = {};
			var query = window.location.search.substring(1);
			// remove trailing /
			if (query.slice(-1) === '/') {
				query = query.slice(0, -1);
			}
			var vars = query.split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				// If first entry with this name
				if (typeof query_string[pair[0]] === "undefined") {
					query_string[pair[0]] = pair[1];
				// If second entry with this name
				} else if (typeof query_string[pair[0]] === "string") {
					var arr = [ query_string[pair[0]], pair[1] ];
					query_string[pair[0]] = arr;
				// If third or later entry with this name
				} else {
					query_string[pair[0]].push(pair[1]);
				}
			}
			return query_string;
		}
	};
});
