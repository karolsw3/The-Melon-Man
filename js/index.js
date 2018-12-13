var game = {
	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d'),
	textures: new Image(),
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
	animations: {
		player: {
			left: [{x: 4, y: 0} {x: 5, y: 0}, {x: 4, y: 0}, {x: 6, y: 0}],
			right: [{x: 9, y: 0}, {x: 8, y: 0}, {x: 9, y: 0}, {x: 7, y: 0}]
		}
	},
	drawTile: function (tileColumn, tileRow, x, y) {
		this.context.drawImage(this.textures, tileColumn * this.options.tileWidth, tileRow * this.options.tileHeight, this.options.tileWidth, this.options.tileHeight, x * this.options.tileWidth, y * this.options.tileHeight, this.options.tileWidth, this.options.tileHeight)
	}
	redraw: function (timestamp) {
		drawPending = false
		// Draw canvas
		this.context.fillStyle = "#a5d9ff";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
	},
	requestRedraw: function () {
		if (!drawPending) {
			drawPending = true
			requestAnimationFrame(this.redraw)
		}
	}
}

