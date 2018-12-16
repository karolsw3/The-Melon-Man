// Functions responsible for drawing on canvas

game.drawTile = function (tileColumn, tileRow, x, y) {
	game.context.drawImage(
		game.textures,
		tileColumn * game.options.tileWidth,
		tileRow * game.options.tileHeight,
		game.options.tileWidth,
		game.options.tileHeight,
		x * game.options.tileWidth - Math.round(game.player.x) + Math.round(game.canvas.width / 2 + game.options.tileWidth / 2),
		y * game.options.tileHeight - Math.round(game.player.y) + Math.round(game.canvas.width / 2 + game.options.tileHeight / 2),
		game.options.tileWidth,
		game.options.tileHeight
	)
}

game.drawStructure = function (name, x, y) {
	var structure = game.structures[name]
	for (var i = 0; i < structure.length; i++) {
		game.drawTile(structure[i].tileColumn, structure[i].tileRow, structure[i].x + x, structure[i].y + y)
	}
}

game.drawPlayer = function () {
	actualPlayerTile = game.player.animations[game.player.direction][game.player.animationFrameNumber % 4]
	game.context.drawImage(
		game.textures,
		actualPlayerTile.tileColumn * game.options.tileWidth,
		actualPlayerTile.tileRow * game.options.tileHeight,
		game.options.tileWidth,
		game.options.tileHeight,
		Math.round(game.canvas.width / 2 - game.options.tileWidth / 2),
		game.canvas.height / 2 - game.options.tileHeight / 2,
		game.options.tileWidth,
		game.options.tileHeight
	)
}

game.redraw = function () {
	game.drawPending = false

	// Draw the background
	game.context.fillStyle = "#a5d9ff"
	game.context.fillRect(0, 0, game.canvas.width, game.canvas.height)

	// Draw the map
	for (var i = 0; i < game.map.structures.length; i++) {
		game.drawStructure(game.map.structures[i].name, game.map.structures[i].x, game.map.structures[i].y)
	}

	// Draw the player
	game.drawPlayer()
}

game.requestRedraw = function () {
	if (!game.drawPending) {
		game.drawPending = true
		requestAnimationFrame(game.redraw)
	}
}
