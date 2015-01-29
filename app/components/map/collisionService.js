'use strict';
/**
 *	Service managing collisions
 */
app.service('CollisionsFactory', function(Pacman) {
	var getPosition = function(character) {
		var position; 

		if (character === Pacman.getPacmanState().pacmanName) {
			position = angular.element('.pacman-wrapper').position();
		} else {
			position = angular.element('.' + character).position();
		}
		return position;
	};

	return {
		/**
		 * Checks collisions between pacman and phantoms
		 */
		checkCollision: function(character1, character2) {
			var positionPacman = getPosition(character1),
				positionPhantom = getPosition(character2);

			if ((Math.abs(positionPacman.top - positionPhantom.top) < 25) && 
					(Math.abs(positionPacman.left - positionPhantom.left) < 25)) {
				return false;
			} else {
				return true;
			}
		}
	}
});