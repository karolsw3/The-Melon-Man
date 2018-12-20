// Functions responsible for keyboard events handling

game.keydown = function (event) {
	if (!game.pressedKeys[event.keyCode]) { // Prevent key repeating
		switch (event.keyCode) {
		case 65:
		case 37:
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
					}, 4 * i)
					if (i % 12 == 0 && !game.checkCollisions()) {
						// Player should fall
						game.player.jump("fall")
					}
				}
				game.player.animationFrameNumber++
			}, 120)
			break
		case 68:
		case 39:
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
					}.bind(game), 4 * i)
					if (i % 12 == 0 && !game.checkCollisions()) {
						// Player should fall
						game.player.jump("fall")
					}
				}
				game.player.animationFrameNumber++
			}, 120)
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
