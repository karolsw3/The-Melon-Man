game.structures = {
	"grassPlatform": [
		{tileColumn: 0, tileRow: 0, x: 0, y: 0}, {tileColumn: 5, tileRow: 1, x: 0, y: -1, collidable: false},
		{tileColumn: 1, tileRow: 0, x: 1, y: 0}, {tileColumn: 5, tileRow: 1, x: 1, y: -1, collidable: false},
		{tileColumn: 2, tileRow: 0, x: 2, y: 0}, {tileColumn: 5, tileRow: 1, x: 2, y: -1, collidable: false}
	],
	"snowPlatform": [{tileColumn: 0, tileRow: 1, x: 0, y: 0}, {tileColumn: 1, tileRow: 1, x: 1, y: 0}, {tileColumn: 2, tileRow: 1, x: 2, y: 0}],
	"gelPlatform": [{tileColumn: 3, tileRow: 1, x: 0, y: 0}, {tileColumn: 4, tileRow: 1, x: 1, y: 0}],
	"seaWeedPlatform": [{tileColumn: 0, tileRow: 2, x: 0, y: 0}, {tileColumn: 0, tileRow: 3, x: 0, y: 1}],
	"eyePlatform_1": [{tileColumn: 1, tileRow: 2, x: 0, y: 0}, {tileColumn: 2, tileRow: 2, x: 1, y: 0}],
	"eyePlatform_2": [{tileColumn: 1, tileRow: 3, x: 0, y: 0}, {tileColumn: 2, tileRow: 3, x: 1, y: 0}],
	"eyePlatform_3": [{tileColumn: 1, tileRow: 2, x: 0, y: 0}, {tileColumn: 2, tileRow: 3, x: 1, y: 0}],
	"eyePlatform_4": [{tileColumn: 1, tileRow: 3, x: 0, y: 0}, {tileColumn: 2, tileRow: 2, x: 1, y: 0}],
	"manHoldingPlatform": [
		{tileColumn: 3, tileRow: 2, x: 0, y: 0}, {tileColumn: 4, tileRow: 2, x: 1, y: 0},
		{tileColumn: 3, tileRow: 3, x: 0, y: 1, collidable: false}, {tileColumn: 4, tileRow: 3, x: 1, y: 1, collidable: false}
	],
	"snowman": [{tileColumn: 5, tileRow: 3, x: 0, y: 0, collidable: false}, {tileColumn: 5, tileRow: 2, x: 0, y: -1, collidable: false}],
  "lava_platform": [
			{tileColumn: 6, tileRow: 1, x: -1, y: -0.9, collidable: false},{tileColumn: 7, tileRow: 1, x: 0, y: -0.9, collidable: false}, {tileColumn: 8, tileRow: 1, x: 1, y: -0.9, collidable: false},
			{tileColumn: 0, tileRow: 4, x: -1, y: 0},{tileColumn: 1, tileRow: 4, x: 0, y: 0}, {tileColumn: 2, tileRow: 4, x: 1, y: 0},
			{tileColumn: 0, tileRow: 5, x: -1, y: 1, collidable: false},{tileColumn: 1, tileRow: 5, x: 0, y: 1, collidable: false}, {tileColumn: 2, tileRow: 5, x: 1, y: 1, collidable: false}
	]
}

game.generateMap = function () {
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
		randomX = Math.floor(Math.random() * 8)
		this.map.structures.push({
			name: "snowPlatform",
			x: randomX,
			y: -i * 3
		})
		if (Math.floor(Math.random() * 7) == 0) {
			this.map.structures.push({
				name: "snowman",
				x: randomX + Math.floor(Math.random() * 3),
				y: -i * 3 - 1
			})
		}
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

	for (var i = 100; i < 120; i++) {
		this.map.structures.push({
			name: "manHoldingPlatform",
			x: Math.floor(Math.random() * 8),
			y: -i * 3
		})
	}

	for (var i = 120; i < 140; i++) {
		this.map.structures.push({
			name: "lava_platform",
			x: Math.floor(Math.random() * 8),
			y: -i * 3
		})
	}
}
