game.checkCollisions = function () {
	// List potentially collidable entities
	var watchTheseGuys = []
	var bounds = 6
	for (var i = 0; i < game.map.structures.length; i++) {
		if (
			game.map.structures[i].x > (game.player.x / game.options.tileWidth) - bounds
			&& game.map.structures[i].x < (game.player.x / game.options.tileWidth) + bounds
			&& game.map.structures[i].y > (game.player.y / game.options.tileHeight) - bounds
			&& game.map.structures[i].y < (game.player.y / game.options.tileHeight) + bounds
		) {
			watchTheseGuys.push(game.map.structures[i])
		}
	}

	// Now precisely check if there occurs any collision
	for (var i = 0; i < watchTheseGuys.length; i++) {
		for (var j = 0; j < game.structures[watchTheseGuys[i].name].length; j++) {
			if (
				watchTheseGuys[i].x + game.structures[this.map.structures[i].name][j].x == Math.round(game.player.x / game.options.tileWidth) - 1
				&& watchTheseGuys[i].y + game.structures[this.map.structures[i].name][j].y == ((game.player.y) / game.options.tileHeight)
			) {
				this.player.isInAir = false
				return true
			}
		}
	}

	return false
}
