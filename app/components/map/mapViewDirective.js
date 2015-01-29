'use strict';
/**
 *	Custom directive to compile dynamically the visual map
 */
app.directive('mapView', function($compile, Environment) {
	var generateMapHTMLMarkup = function(map) {
		var i = 0,
			j = 0,
			html = '<table class="map">';

		for (i = 0; i < map.length; i++) {
			html += '<tr>';
			for (j = 0; j < map[0].length; j++) {
				var style = '',
					token = false;
				
				if (!map[i][j].left) style += 'border-left: 1px solid #fff;';
				if (!map[i][j].top) style += 'border-top: 1px solid #fff;';
				if (!map[i][j].right) style += 'border-right: 1px solid #fff;';
				if (!map[i][j].bottom) style += 'border-bottom: 1px solid #fff;';

				html += '<td ng-class="{\'dot\': ' + 'map[' + i + '][' + j + '].token' + '}" ' + 
						'style="' + style + '"></td>';
			}
			html += '</tr>';
		}
		html += '</table>';

		return html;
	};

	return {
		link: function($scope, $element, attrs) {
			// Watching map in our scope. When $scope.map changes, view is updated
			$scope.$watch('map', function() {
				// Compile the HTML template and attach to map-view directive
				var linkToDOM = $compile(generateMapHTMLMarkup(Environment.getMap()));
				// Links template and scope
				var mapView = linkToDOM($scope);
				// Appends compiled template to DOM directive
				$element.empty();
				$element.append(mapView);
			});
		}
	}
});