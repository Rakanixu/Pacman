'use strict';
/**
 *	Phantom Factory - Instantiable
 */
app.factory('Phantom', function() {
	var instantiate = function(ph) {
		var originalPhantom = {};

		this.phantomName = ph.phantomName;
		this.phantomNumber = ph.phantomNumber,
		this.phantomState = ph.phantomState;
		this.top = ph.top;
		this.left = ph.left;
		this.transition = ph.transition;
		this.position = {
			x: ph.position.x,
			y: ph.position.y
		};

		this.getPhantomState = function() {
			return this;
		};

		this.getPhantomPosition = function() {
			return this.position;
		};

		this.setPhantomState = function(ph) {
			if (ph.phantomName) this.phantomName = ph.phantomName;
			if (ph.phantomState) this.phantomState = ph.phantomState;
			if (ph.top) this.top = ph.top;
			if (ph.left) this.left = ph.left;
			if (ph.transition) this.transition = ph.transition;
		};

		this.setPhantomPosition = function(ph) {
			if (ph.x !== undefined) this.position.x = ph.x;
			if (ph.y !== undefined) this.position.y = ph.y;				
		};

		this.resetPhantom = function() {
			// Deep copy of the original phantom instance into the custom object instance
			angular.copy(originalPhantom, this);
		};

		// Deep copy of the instance created just after initialize to be able to reset the instance when needed
		angular.copy(this, originalPhantom);
	};

	return {
		constructor: instantiate
	}
});