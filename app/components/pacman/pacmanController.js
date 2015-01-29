'use strict';
/**
 *	Controller managing pacman and user interactions
 */
app.controller('PacmanController', function($scope, $timeout, Environment, Pacman, CollisionsFactory) {
	var dimension = Environment.getDimension();
		
	/**
	 *	Pacman's movement. left / up / right / down
	 */
	var applyMovement = function(key) {
		switch (key) {
			case Environment.getKeyCodes().left:
				// Checks maze movement avilability
				if (Environment.getMap()[Pacman.getPacmanPosition().y][Pacman.getPacmanPosition().x].left) {
					Pacman.setPacmanPosition({
						x: Pacman.getPacmanPosition().x - 1,
						y: Pacman.getPacmanPosition().y
					});

					Pacman.setPacmanState({
						pacmanState: Environment.getKeyCodes().left,
						top: angular.element('.pacman-wrapper').position().top + 'px',
						left: (Pacman.getPacmanPosition().x * dimension) + 'px',
						transition: Pacman.getPacmanState().transition,
						transform: 'rotate(180deg)'
					});
				}
				break;
			case Environment.getKeyCodes().up:
				// Checks maze movement avilability
				if (Environment.getMap()[Pacman.getPacmanPosition().y][Pacman.getPacmanPosition().x].top) {
					Pacman.setPacmanPosition({
						x: Pacman.getPacmanPosition().x,
						y: Pacman.getPacmanPosition().y - 1
					});

					Pacman.setPacmanState({
						pacmanState: Environment.getKeyCodes().up,
						top: (Pacman.getPacmanPosition().y * dimension) + 'px',
						left: angular.element('.pacman-wrapper').position().left + 'px',
						transition: Pacman.getPacmanState().transition,
						transform: 'rotate(-90deg)'
					});
				}
				break;
			case Environment.getKeyCodes().right:
				// Checks maze movement avilability
				if (Environment.getMap()[Pacman.getPacmanPosition().y][Pacman.getPacmanPosition().x].right) {
					Pacman.setPacmanPosition({
						x: Pacman.getPacmanPosition().x + 1,
						y: Pacman.getPacmanPosition().y
					});

					Pacman.setPacmanState({
						pacmanState: Environment.getKeyCodes().right,
						top: angular.element('.pacman-wrapper').position().top + 'px',
						left: (Pacman.getPacmanPosition().x * dimension) + 'px',
						transition: Pacman.getPacmanState().transition,
						transform: 'rotate(0deg)'
					});
				}
				break;
			case Environment.getKeyCodes().down:
				// Checks maze movement avilability
				if (Environment.getMap()[Pacman.getPacmanPosition().y][Pacman.getPacmanPosition().x].bottom) {
					Pacman.setPacmanPosition({
						x: Pacman.getPacmanPosition().x,
						y: Pacman.getPacmanPosition().y + 1
					});

					Pacman.setPacmanState({
						pacmanState: Environment.getKeyCodes().down,
						top: (Pacman.getPacmanPosition().y * dimension) + 'px',
						left: angular.element('.pacman-wrapper').position().left + 'px',
						transition: Pacman.getPacmanState().transition,
						transform: 'rotate(90deg)'
					});
				}
				break;
		}

		// Sets the ng-style directives. Pacman's rotation and transition 
		$scope.pacmanRotation = {
			'transform': Pacman.getPacmanState().transform
		}

		$scope.pacmanTransition = { 
			'top': Pacman.getPacmanState().top,
			'left': Pacman.getPacmanState().left,
			'-webkit-transition': Pacman.getPacmanState().transition,
			'-moz-transition': Pacman.getPacmanState().transition,
			'-o-transition': Pacman.getPacmanState().transition,
			'transition': Pacman.getPacmanState().transition
		};

		// Token is counted as consumed after a while, when pacman moved to next possible state
		$timeout(eatToken, 220);
	};

	/**
	 *	Pacman's eat action. Updates view and model
	 */
	var eatToken = function() {
		if (Environment.getMap()[Pacman.getPacmanPosition().y][Pacman.getPacmanPosition().x].token) {
			Environment.incrementToken();
			$scope.map[Pacman.getPacmanPosition().y][Pacman.getPacmanPosition().x].token = false;
			
			// Checking if there are more tokens 
			if (Environment.getTokens() >= Environment.getTotalTokens()) {
				loadNextLevel();
			}
		}			
	};

	/**
	 *	Loads next level and resets game items
	 */
	var loadNextLevel = function() {
		// Dispatch event to child controllers - $broadcast
		// Resets phantoms 
		$scope.$broadcast('resetPhantoms');

		// Resets Pacman to init state
		Pacman.resetPacmanState();
		$scope.pacmanTransition = { 
			'top': Pacman.getPacmanState().top,
			'left': Pacman.getPacmanState().left
		};

		// Resets map
		Environment.setMap(map.mazes);
		$scope.map = Environment.getMap();
	};

	/**
	 *	Binds keyboard events with the controller
	 */
	$scope.onKeyDown = function(keyEvent) {
		var timer = function() {
			// Movement its being applied, no transition is available until interval is met
			Environment.setTransitionInterval(false);
			setTimeout(function() {
				// Movement transition may finish, next movement is available
				Environment.setTransitionInterval(true);
			}, 280);
		};

		// Checks the time interval since the last keyboard event
		// If before movement transition has been executed and finished, next one is available
		if (Environment.getTransitionInterval()) {
			applyMovement(keyEvent.keyCode);
			timer();
		}
	};

	// Loads first level when app is initialize
	loadNextLevel();
});