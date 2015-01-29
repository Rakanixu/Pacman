'use strict';
/**
 *	Pacman singleton service 
 */
app.service('Pacman', function() {
	var pacman = {
			pacmanName: 'pacman',
			pacmanState: 39,
			top: '0',
			left: '0',
			transition: 'all 0.3s linear',
			transform: 'rotate(0deg)',
			position: {
				x: 0,
				y: 0
			}
		},
		originalPacman = {};

	// Deep copy of pacman object, stores its first state to reset when necessary
	angular.copy(pacman, originalPacman);

	return {
		getPacmanState: function() {
			return pacman;
		},
		getPacmanPosition: function() {
			return pacman.position;
		},
		setPacmanState: function(pman) {
			if (pman.pacmanName) pacman.pacmanName = pman.pacmanName;
			if (pman.pacmanState) pacman.pacmanState = pman.pacmanState;
			if (pman.top) pacman.top = pman.top;
			if (pman.left) pacman.left = pman.left;
			if (pman.transition) pacman.transition = pman.transition;
			if (pman.transform) pacman.transform = pman.transform;
		},
		setPacmanPosition: function(pman) {
			if (pman.x !== undefined) pacman.position.x = pman.x;
			if (pman.y !== undefined) pacman.position.y = pman.y;				
		},
		resetPacmanState: function() {
			// Deep copy of the original pacman object to reset its values
			angular.copy(originalPacman, pacman);
		}
	}			
});