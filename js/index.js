


var game = {
	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d'),
	textures: new Image(),
	drawPending: false,
	options: {
		texturesPath: "https://cdn.pbrd.co/images/HRx0tpd.png",
		tileWidth: 24,
		tileHeight: 24,
		canvasWidth: 300,
		canvasHeight: 300,
		gravity: 10
	},
	init: function (onInit) {
		this.canvas.width = this.options.canvasWidth
		this.canvas.height = this.options.canvasHeight
		this.textures.src = this.options.texturesPath
		this.textures.onload = onInit
	},
	map: {
		structures: []
	},
	player: {
		x: 54,
		y: 0,
		direction: "left",
		isInAir: false,
		animationFrameNumber: 0
	},
	animations: {
		// Describe coordinates of consecutive animation frames of objects in textures
		player: {
			left: [{tileColumn: 4, tileRow: 0}, {tileColumn: 5, tileRow: 0}, {tileColumn: 4, tileRow: 0}, {tileColumn: 6, tileRow: 0}],
			right: [{tileColumn: 9, tileRow: 0}, {tileColumn: 8, tileRow: 0}, {tileColumn: 9, tileRow: 0}, {tileColumn: 7, tileRow: 0}]
		}
	},
	// Describe structures using coordinates of textures and coordinates on map
	structures: {
		grassPlatform: [{tileColumn: 0, tileRow: 0, x: 0, y: 0}, {tileColumn: 1, tileRow: 0, x: 1, y: 0}, {tileColumn: 2, tileRow: 0, x: 2, y: 0}]
	},
	drawTile: function (tileColumn, tileRow, x, y) {
		this.context.drawImage(
			this.textures,
			tileColumn * this.options.tileWidth,
			tileRow * this.options.tileHeight,
			this.options.tileWidth,
			this.options.tileHeight,
			x * this.options.tileWidth - this.player.x + Math.round(this.canvas.width / 2 + this.options.tileWidth / 2),
			y * this.options.tileHeight - this.player.y + Math.round(this.canvas.width / 2 + this.options.tileHeight / 2),
			this.options.tileWidth,
			this.options.tileHeight
		)
	},
	drawStructure: function (structureName, x, y) {
		var structure = this.structures[structureName]
		for (var i = 0; i < structure.length; i++) {
			this.drawTile(structure[i].tileColumn, structure[i].tileRow, structure[i].x + x, structure[i].y + y)
		}
	},
	drawPlayer: function () {
		actualPlayerTile = this.animations.player[this.player.direction][this.player.animationFrameNumber % 4]
		this.context.drawImage(
			this.textures,
			actualPlayerTile.tileColumn * this.options.tileWidth,
			actualPlayerTile.tileRow * this.options.tileHeight,
			this.options.tileWidth,
			this.options.tileHeight,
			Math.round(this.canvas.width / 2 - this.options.tileWidth / 2),
			this.canvas.height / 2 - this.options.tileHeight / 2,
			this.options.tileWidth,
			this.options.tileHeight
		)
	},
	generateMap: function () {
		var height = 10

		// Generate a platform for the player
		this.map.structures.push({
			structureName: "grassPlatform",
			x: 0,
			y: 0
		})
		// Generate the rest of the platforms
		for (var i = 0; i < height; i++) {
			this.map.structures.push({
				structureName: "grassPlatform",
				x: Math.floor(Math.random() * 8 + 1),
				y: -i * 3
			})
		}
	},
	keyPress: function (event) {
		switch (event.keyCode) {
			case 97:
				this.player.direction = "left"
				for (var i = 0; i < 4; i++) {
					setTimeout(function () {
						// Player can't move faster is there's friction from the ground
						if (this.player.isInAir) {
							this.player.x -= 5
						} else {
							this.player.x -= 3
						}
						this.requestRedraw()
					}.bind(this), 500 / i)
				}
				this.player.animationFrameNumber++
				break
			case 100:
				this.player.direction = "right"
				for (var i = 0; i < 4; i++) {
					setTimeout(function () {
						if (this.player.isInAir) {
							this.player.x += 5
						} else {
							this.player.x += 3
						}
						this.requestRedraw()
					}.bind(this), 500 / i)
				}
				this.player.animationFrameNumber++
				break
			case 32:
				this.player.isInAir = true
				var startingY = this.player.y
				for (var i = 0; i < 21; i++) {
					setTimeout(function (time) {
						this.player.y = -100 + Math.pow((-time + 10), 2)
						this.requestRedraw()
					}.bind(this, i), i * 35)
				}
				setTimeout(function () {
					this.player.isInAir = false
				}.bind(this), 21 * 35)
				break
		}
	},
	redraw: function () {
		this.drawPending = false

		// Draw the background
		this.context.fillStyle = "#a5d9ff"
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

		// Draw the map
		for (var i = 0; i < this.map.structures.length; i++) {
			this.drawStructure(this.map.structures[i].structureName, this.map.structures[i].x, this.map.structures[i].y)
		}

		// Draw the player
		this.drawPlayer()
	},
	requestRedraw: function () {
		if (!this.drawPending) {
			this.drawPending = true
			requestAnimationFrame(this.redraw.bind(this))
		}
	}
}

// Keyboard

document.addEventListener("keypress", game.keyPress.bind(game), false);

game.init(function () {
	game.generateMap()
	game.requestRedraw()
})
