


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
		framesPerSecond: 24
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
		this.context.drawImage(this.textures, tileColumn * this.options.tileWidth, tileRow * this.options.tileHeight, this.options.tileWidth, this.options.tileHeight, x * this.options.tileWidth, y * this.options.tileHeight, this.options.tileWidth, this.options.tileHeight)
	},
	drawStructure: function (structureName, x, y) {
		var structure = this.structures[structureName]
		for (var i = 0; i < structure.length; i++) {
			this.drawTile(structure[i].tileColumn, structure[i].tileRow, structure[i].x + x, structure[i].y + y)
		}
	},
	generateMap: function () {
		var height = 50
		for (var i = 0; i < height; i++) {
			this.map.structures.push({
				structureName: "grassPlatform",
				x: Math.floor(Math.random() * 10 + 2),
				y: i * 3
			})
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
	},
	requestRedraw: function () {
		if (!this.drawPending) {
			this.drawPending = true
			requestAnimationFrame(this.redraw.bind(this))
		}
	}
}

game.init(function () {
	game.generateMap()
	game.requestRedraw()
})
