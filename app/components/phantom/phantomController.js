'use strict';
/**
 *	Controller managing phantoms, automated movements and AI
 */
app.controller('PhantomController', function($scope, $timeout, Environment, Phantom, Pacman, CollisionsFactory) {
	var dimension = Environment.getDimension(),
		phantomsPool = [];

	// Initialize phantoms and push them into the pool
	phantomsPool.push(new Phantom.constructor({ 
		phantomName: 'phantom01',
		phantomNumber: 0,
		phantomState: 37,
		top: '375',
		left: '475',
		transition: 'all 0.3s linear',
		position: {
			x: 10,
			y: 10
		}
	}));
	phantomsPool.push(new Phantom.constructor({
		phantomName: 'phantom02',
		phantomNumber: 1,
		phantomState: 37,
		top: '375',
		left: '475',
		transition: 'all 0.3s linear',
		position: {
			x: 10,
			y: 10
		}
	}));
	phantomsPool.push(new Phantom.constructor({
		phantomName: 'phantom03',
		phantomNumber: 2,
		phantomState: 38,
		top: '375',
		left: '475',
		transition: 'all 0.3s linear',
		position: {
			x: 10,
			y: 10
		}
	}));
	phantomsPool.push(new Phantom.constructor({
		phantomName: 'phantom04',
		phantomNumber: 3,
		phantomState: 38,
		top: '375',
		left: '475',
		transition: 'all 0.3s linear',
		position: {
			x: 10,
			y: 10
		}
	}));

	// Binds phantoms to their views
	$scope.phantomTransition = [];

	// Listener on resetPhantoms event. Event is triggered by broadcasting from parent controller.
		$scope.$on('resetPhantoms', function(e) { 
		for (var i = 0; i < phantomsPool.length; i++) {
			// Reset phantom state to its initial values
			phantomsPool[i].resetPhantom();
 			$scope.phantomTransition[i] = {
				'top': phantomsPool[i].getPhantomState().top,
				'left': phantomsPool[i].getPhantomState().left
			};
		}
		});

	/**
	 *	Manage pacman mouth movements - autoexecutes
	 */
	var automatedMouth = function() {
		$scope.close = true;

		var openCloseMouth = function(){
			$scope.close === true ? $scope.close = false : $scope.close = true;
			$timeout(openCloseMouth, 1000);
		};
		// $timeout ensures changes on $scope will update on the data-binding
		$timeout(openCloseMouth, 1);
	}();

	/**
	 *	Manage phantom random movements
	 */
	var automatedPhantom = function(phantom) {
		var applyPhantomMovement = function(phantom) {
			var allowedMovement = false;

			// Apply a left / up / right / down movement depending on its position and pacman position
			switch (nextBestPhantomMovement(phantom)) {
				case Environment.getKeyCodes().left:
					// Checks maze movement avilability
					if (Environment.getMap()[phantom.getPhantomPosition().y][phantom.getPhantomPosition().x].left) {
						allowedMovement = true;
						phantom.setPhantomPosition({
							x: phantom.getPhantomPosition().x - 1,
							y: phantom.getPhantomPosition().y
						});

						phantom.setPhantomState({
							phantomState: Environment.getKeyCodes().left,
							top: angular.element('.' + phantom.getPhantomState().phantomName).position().top + 'px',
							left: (phantom.getPhantomPosition().x * dimension) + 'px',
							transition: phantom.getPhantomState().phantomTransition,
						});
					}
					break;
				case Environment.getKeyCodes().up:
					// Checks maze movement avilability
					if (Environment.getMap()[phantom.getPhantomPosition().y][phantom.getPhantomPosition().x].top) {
						allowedMovement = true;
						phantom.setPhantomPosition({
							x: phantom.getPhantomPosition().x,
							y: phantom.getPhantomPosition().y - 1
						});

						phantom.setPhantomState({
							phantomState: Environment.getKeyCodes().up,
							top: (phantom.getPhantomPosition().y * dimension) + 'px',
							left: angular.element('.' + phantom.getPhantomState().phantomName).position().left + 'px',
							transition: phantom.getPhantomState().phantomTransition,
						});
					}
					break;
				case Environment.getKeyCodes().right:
					// Checks maze movement avilability
					if (Environment.getMap()[phantom.getPhantomPosition().y][phantom.getPhantomPosition().x].right) {
						allowedMovement = true;
						phantom.setPhantomPosition({
							x: phantom.getPhantomPosition().x + 1,
							y: phantom.getPhantomPosition().y
						});

						phantom.setPhantomState({
							phantomState: Environment.getKeyCodes().right,
							top: angular.element('.' + phantom.getPhantomState().phantomName).position().top + 'px',
							left: (phantom.getPhantomPosition().x * dimension) + 'px',
							transition: phantom.getPhantomState().phantomTransition,
						});
					}
					break;
				case Environment.getKeyCodes().down:
					// Checks maze movement avilability
					if (Environment.getMap()[phantom.getPhantomPosition().y][phantom.getPhantomPosition().x].bottom) {
						allowedMovement = true;
						phantom.setPhantomPosition({
							x: phantom.getPhantomPosition().x,
							y: phantom.getPhantomPosition().y + 1
						});

						phantom.setPhantomState({
							phantomState: Environment.getKeyCodes().down,
							top: (phantom.getPhantomPosition().y * dimension) + 'px',
							left: angular.element('.' + phantom.getPhantomState().phantomName).position().left + 'px',
							transition: phantom.getPhantomState().phantomTransition,
						});
					}
					break;						
			}

			// Apply transition to related view element
			$scope.phantomTransition[phantom.getPhantomState().phantomNumber] = {
				'top': phantom.getPhantomState().top,
				'left': phantom.getPhantomState().left,
				'-webkit-transition': phantom.getPhantomState().transition,
				'-moz-transition': phantom.getPhantomState().transition,
				'-o-transition': phantom.getPhantomState().transition,
				'transition': phantom.getPhantomState().transition
			};

			// Wait transition interval+ when movement has been applied or try again if movement was not allowed
			if (allowedMovement) {
				$timeout(function() {
					applyPhantomMovement(phantom);
				}, 320);
			} else {
				$timeout(function() {
					applyPhantomMovement(phantom);
				}, 20);
			}
		};

		$timeout(function() {
			applyPhantomMovement(phantom);
		}, 1);
	};

	/**
	 *	Manage phantom next movement
	 *  Phanton tries to get closer to pacman if they stay in same cartesian axis - in sight does not affect
	 *  Phantom follow its custom direction if possible
	 *  If neither of these conditions are met, random available movement
	 */
	var nextBestPhantomMovement = function(ph) {
		// Pacman and phantom are in same axis
		if (ph.getPhantomPosition().y === Pacman.getPacmanPosition().y) {
			// Phantom tries to get closer to pacman
			if (ph.getPhantomPosition().x > Pacman.getPacmanPosition().x) {
				return checkMovementAvailability(ph, 'left', Environment.getKeyCodes().left);
			} else {
				return checkMovementAvailability(ph, 'right', Environment.getKeyCodes().right);
			}
		// Pacman and phantom are in same axis
		} else if (ph.getPhantomPosition().x === Pacman.getPacmanPosition().x) {
			// Phantom tries to get closer to pacman
			if (ph.getPhantomPosition().y > Pacman.getPacmanPosition().y) {
				return checkMovementAvailability(ph, 'top', Environment.getKeyCodes().up);
			} else {
				return checkMovementAvailability(ph, 'bottom', Environment.getKeyCodes().down);
			}				
		} else {
			switch (ph.getPhantomState().phantomState) {
				case Environment.getKeyCodes().left:
					return checkMovementAvailability(ph, 'left', Environment.getKeyCodes().left);
					break;
				case Environment.getKeyCodes().up:
					return checkMovementAvailability(ph, 'top', Environment.getKeyCodes().up);
					break;					
				case Environment.getKeyCodes().right:
					return checkMovementAvailability(ph, 'right', Environment.getKeyCodes().right);
					break;
				case Environment.getKeyCodes().down:
					return checkMovementAvailability(ph, 'bottom', Environment.getKeyCodes().down);			
					break;
			}
		}
	};

	/**
	 * Calculates if desired movement is available, if not return a random movement
	 */		
	var checkMovementAvailability = function(ph, direction, directionKeyCode) {
		if (Environment.getMap()[ph.getPhantomPosition().y][ph.getPhantomPosition().x][direction]) {
			return directionKeyCode;
		} else {
			// Best path not found, random decision
			return Math.floor(Math.random() * 4) + 37;			
		}
	};

	/**
	 *	Checks if a collision happened every 100 ms - game over condition
	 */
	var collisions = function(phantom) {
		if (CollisionsFactory.checkCollision(Pacman.getPacmanState().pacmanName, phantom.getPhantomState().phantomName)) {
			$timeout(function() {
				collisions(phantom);
			}, 100);
		} else {
			document.location.reload();
		}
	};

	// Start phantoms automated movements
	for (var i = 0; i < phantomsPool.length; i++) {
		automatedPhantom(phantomsPool[i]);
	}

	// Checks collisions between phantoms and pacman
	$timeout(function() {
		for (var i = 0; i < phantomsPool.length; i++) {
			collisions(phantomsPool[i]);
		}
	}, 1);
});