// The spaghetti code masterpiece
var game = {
	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d', {alpha: false}),
	textures: new Image(),
	drawPending: false,
	backgroundLoaded: false,
	background: new Image(),
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
		this.context.imageSmoothingEnabled = false

    this.background.src = "background.png"

    this.background.onload = function () {
			this.backgroundLoaded = true
    }.bind(this)

		this.textures.src = this.options.texturesPath
		this.textures.onload = onInit
	},
	map: {
		structures: []
	},
	// Describe structures using coordinates of textures and coordinates on map
	structures: {
		"grassPlatform": [{tileColumn: 0, tileRow: 0, x: 0, y: 0}, {tileColumn: 1, tileRow: 0, x: 1, y: 0}, {tileColumn: 2, tileRow: 0, x: 2, y: 0}],
		"grassPlatform--tiny":  [{tileColumn: 0, tileRow: 0, x: 0, y: 0}, {tileColumn: 2, tileRow: 0, x: 1, y: 0}],
		"snowPlatform": [{tileColumn: 0, tileRow: 1, x: 0, y: 0}, {tileColumn: 1, tileRow: 1, x: 1, y: 0}, {tileColumn: 2, tileRow: 1, x: 2, y: 0}],
		"gelPlatform": [{tileColumn: 3, tileRow: 1, x: 0, y: 0}, {tileColumn: 4, tileRow: 1, x: 1, y: 0}]
	},
	generateMap: function () {

		// Generate a platform for the player
		this.map.structures.push({
			name: "grassPlatform",
			x: 0,
			y: 0
		})
		// Generate the rest of the platforms
		for (var i = 1; i < 20; i++) {
			this.map.structures.push({
				name: "grassPlatform",
				x: Math.floor(Math.random() * 8),
				y: -i * 3
			})
		}

		for (var i = 20; i < 40; i++) {
			this.map.structures.push({
				name: "snowPlatform",
				x: Math.floor(Math.random() * 8),
				y: -i * 3
			})
		}

		for (var i = 40; i < 60; i++) {
			this.map.structures.push({
				name: "gelPlatform",
				x: Math.floor(Math.random() * 6),
				y: -i * 3
			})
		}
	},
	isOver: false
}
