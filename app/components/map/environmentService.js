'use strict';
/**
 *	Service storing the application config
 */
app.service('Environment', function() {
	var data = {
		dimension: 48,
		keyCodes: {
			left: 37,
			up: 38,
			right: 39,
			down: 40
		},
		map: null,
		tokens: 0,
		totalTokens: 0,
		transitionInterval: true
	};

	var calculateTotalTokens = function() {
		var numTokens = 0;

		for (var i = 0; i < data.map.length; i++) {
			for (var j = 0; j < data.map[0].length; j++) {
				if (data.map[i][j].token) {
					numTokens++;
				}
			}
		}
		data.totalTokens = numTokens;
	};

	/**
	 *	Data application getters and setters
	 */
	return {
		getDimension: function() {
			return data.dimension;
		},
		getKeyCodes: function() {
			return data.keyCodes;
		},
		getMap: function() {
			return data.map;
		},
		getTransitionInterval: function() {
			return data.transitionInterval;
		},
		getTokens: function() {
			return data.tokens;
		},
		getTotalTokens: function() {
			return data.totalTokens;
		},
		setMap: function(map) {
			// Expects an array of mazes
			if (Array.isArray(map) && map.length > 0) {
				data.map = map.shift();
				// Calculates total custom map tokens to meet winning condition
				calculateTotalTokens();
				data.tokens = 0;
			} else {
				alert('CONGRATULATIONS, YOU PASS ALL LEVELS.');
				document.location.reload();
			}
		},
		setTransitionInterval: function(val) {
			if (typeof val === 'boolean') data.transitionInterval = val;
		},
		incrementToken: function() {
			data.tokens++;
		}
	}
});