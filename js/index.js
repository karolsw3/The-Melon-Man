// The spaghetti code masterpiece
var game = {
	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d', {alpha: false}),
	counter: document.getElementById('counter'),
	textures: new Image(),
	drawPending: false,
	backgrounds: {
			'sky': {
				image: new Image(),
				loaded: false
			},
			'trees': {
				image: new Image(),
				loaded: false
			}
	},
	sounds: {
		jump: new Audio('sounds/jump.wav')
	},
	options: {
		texturesPath: "textures.png",
		tileWidth: 24,
		tileHeight: 24,
		canvasWidth: window.innerWidth / 3,
		canvasHeight: window.innerHeight / 3
	},
	pressedKeys: {},
	init: function (onInit) {
		this.canvas.width = this.options.canvasWidth
		this.canvas.height = this.options.canvasHeight
		this.context.imageSmoothingEnabled = false

    this.backgrounds['sky'].image.src = "background.png"
		this.backgrounds['trees'].image.src = "trees.png"

		for (var key in this.backgrounds) {
			this.backgrounds[key].image.onload = function (currentKey) {
				this.backgrounds[currentKey].loaded = true
			}.bind(this, key)
		}

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
		"gelPlatform": [{tileColumn: 3, tileRow: 1, x: 0, y: 0}, {tileColumn: 4, tileRow: 1, x: 1, y: 0}],
		"seaWeedPlatform": [{tileColumn: 0, tileRow: 2, x: 0, y: 0}, {tileColumn: 0, tileRow: 3, x: 0, y: 1}],
		"eyePlatform_1": [{tileColumn: 1, tileRow: 2, x: 0, y: 0}, {tileColumn: 2, tileRow: 2, x: 1, y: 0}],
		"eyePlatform_2": [{tileColumn: 1, tileRow: 3, x: 0, y: 0}, {tileColumn: 2, tileRow: 3, x: 1, y: 0}],
		"eyePlatform_3": [{tileColumn: 1, tileRow: 2, x: 0, y: 0}, {tileColumn: 2, tileRow: 3, x: 1, y: 0}],
		"eyePlatform_4": [{tileColumn: 1, tileRow: 3, x: 0, y: 0}, {tileColumn: 2, tileRow: 2, x: 1, y: 0}]
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

		for (var i = 60; i < 90; i++) {
			this.map.structures.push({
				name: "seaWeedPlatform",
				x: Math.floor(Math.random() * 4),
				y: -i * 3
			})
		}

		for (var i = 90; i < 100; i++) {
			name = "eyePlatform_" + Math.floor(Math.random() * 4 + 1)
			this.map.structures.push({
				name: name,
				x: Math.floor(Math.random() * 8),
				y: -i * 3
			})
		}
	},
	isOver: false
}
