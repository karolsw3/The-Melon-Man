// The spaghetti code masterpiece
var game = {
	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d'),
	textures: new Image(),
	drawPending: false,
	options: {
		texturesPath: "textures.png",
		tileWidth: 24,
		tileHeight: 24,
		canvasWidth: 300,
		canvasHeight: 300,
		gravity: 10
	},
	pressedKeys: {},
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
		height: 24,
		direction: "left",
		isInAir: false,
		moveInterval: null,
		animationFrameNumber: 0,
		collidesWithGround: true
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
			x * this.options.tileWidth - Math.round(this.player.x) + Math.round(this.canvas.width / 2 + this.options.tileWidth / 2),
			y * this.options.tileHeight - Math.round(this.player.y) + Math.round(this.canvas.width / 2 + this.options.tileHeight / 2),
			this.options.tileWidth,
			this.options.tileHeight
		)
	},
	drawStructure: function (name, x, y) {
		var structure = this.structures[name]
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
		var height = 100

		// Generate a platform for the player
		this.map.structures.push({
			name: "grassPlatform",
			x: 0,
			y: 0
		})
		// Generate the rest of the platforms
		for (var i = 0; i < height; i++) {
			this.map.structures.push({
				name: "grassPlatform",
				x: Math.floor(Math.random() * 8 + 1),
				y: -i * 3
			})
		}
	},
	keydown: function (event) {
		if (!this.pressedKeys[event.keyCode]) { // Prevent key repeating
			switch (event.keyCode) {
			case 65:
				this.player.direction = "left"
				// This is what happens when you try to implement the whole physics by yourself V
				clearInterval(this.player.moveInterval)
				this.player.moveInterval = setInterval(function () {
					for (var i = 1; i < 120; i++) {
						setTimeout(function () {
							// Player can't move faster is there's friction from the ground
							if (this.player.isInAir) {
								this.player.x -= 0.2
							} else {
								this.player.x -= 0.1
							}
							this.requestRedraw()
						}.bind(this), 4 * i)
					}
					this.player.animationFrameNumber++
				}.bind(this), 120)
				break
			case 68:
				this.player.direction = "right"
				clearInterval(this.player.moveInterval)
				this.player.moveInterval = setInterval(function () {
					for (var i = 1; i < 120; i++) {
						setTimeout(function () {
							if (this.player.isInAir) {
								this.player.x += 0.2
							} else {
								this.player.x += 0.1
							}
							this.requestRedraw()
						}.bind(this), 4 * i)
					}
					this.player.animationFrameNumber++
				}.bind(this), 120)
				break
			case 32:
				if (!this.player.isInAir) {
					this.player.isInAir = true
					var startingY = this.player.y
					for (var i = 0; i < 61; i++) {
						setTimeout(function (time) {
							if (this.player.isInAir) {
								this.player.y = startingY + -121 + Math.pow((-time / 3 + 11), 2)
								if (time > 29) {
									this.checkCollisions()
								}
								this.requestRedraw()
							}
						}.bind(this, i), i * 12)
					}
				}
				break
		}
			this.pressedKeys[event.keyCode] = true
		}
	},
	keyup: function (event) {
		this.pressedKeys[event.keyCode] = false
		switch (event.keyCode) {
			case 65:
			case 68:
				clearInterval(this.player.moveInterval)
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
			this.drawStructure(this.map.structures[i].name, this.map.structures[i].x, this.map.structures[i].y)
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

document.addEventListener("keydown", game.keydown.bind(game), false)
document.addEventListener("keyup", game.keyup.bind(game), false)

game.init(function () {
	game.generateMap()
	game.requestRedraw()
})
