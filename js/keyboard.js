// Functions responsible for keyboard events handling
game.moveLeft = function () {
	game.player.direction = "left"
	// game is what happens when you try to implement the whole physics by yourself V
	clearInterval(game.player.moveInterval)
	game.player.moveInterval = setInterval(function () {
		for (var i = 1; i < 120; i++) {
			setTimeout(function () {
				// Player can't move faster is there's friction from the ground
				if (game.player.isInAir) {
					game.player.x -= 0.2
				} else {
					game.player.x -= 0.1
				}
				game.requestRedraw()
				if (!game.checkCollisions()) {
					// Player should fall
					game.player.jump("fall")
				}
			}, 4 * i)
		}
		game.player.animationFrameNumber++
	}, 120)
}

game.moveRight = function () {
	game.player.direction = "right"
	clearInterval(game.player.moveInterval)
	game.player.moveInterval = setInterval(function () {
		for (var i = 1; i < 120; i++) {
			setTimeout(function () {
				if (game.player.isInAir) {
					game.player.x += 0.2
				} else {
					game.player.x += 0.1
				}
				game.requestRedraw()
				if (!game.checkCollisions()) {
					game.player.jump("fall")
				}
			}.bind(game), 4 * i)
		}
		game.player.animationFrameNumber++
	}, 120)
}

game.keydown = function (event) {
	if (!game.pressedKeys[event.keyCode]) { // Prevent key repeating
		switch (event.keyCode) {
		case 65:
		case 37:
			game.moveLeft()
			break
		case 68:
		case 39:
			game.moveRight()
			break
		case 32:
			game.player.jump()
			break
	}
		game.pressedKeys[event.keyCode] = true
	}
}

game.keyup = function (event) {
	game.pressedKeys[event.keyCode] = false
	switch (event.keyCode) {
		case 65:
		case 68:
		case 37:
		case 39:
			clearInterval(game.player.moveInterval)
			break
		}
}
