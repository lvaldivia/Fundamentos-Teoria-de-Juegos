Game = function(game){

}

Game.prototype = {
	create:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 200;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.loadLevel();
	},
	loadLevel:function(){
		this.map = this.game.add.tilemap('demo');
		this.map.addTilesetImage('tiles_spritesheet','gameTiles');

		this.collisionLayer = this.map.createLayer('collisionLayer');
		this.backgroundLayer = this.map.createLayer('backgroundLayer');

		this.game.world.sendToBack(this.backgroundLayer);

		this.map.setCollisionBetween(1,156,true,'collisionLayer');
		this.collisionLayer.resizeWorld();

		var playerData = this.findObjectsByType('player',this.map,'objectsLayer');

		this.player = this.game.add.sprite(playerData[0].x,playerData[0].y,'player');
		this.game.physics.arcade.enable(this.player);
		this.game.camera.follow(this.player);

		var enemyData = this.findObjectsByType('enemy',this.map,'objectsLayer');
		this.enemyGroup = this.game.add.group();
		enemyData.forEach(function(data){
			var enemy = this.game.add.sprite(data.x,data.y,'player');
			this.enemyGroup.add(enemy);
		},this);

	},
	update:function(){
		this.game.physics.arcade.collide(this.player,this.collisionLayer);
		this.player.body.velocity.x=0;
		if(this.cursors.left.isDown){
			this.player.body.velocity.x=-200;
		}
		if(this.cursors.right.isDown){
			this.player.body.velocity.x=200;
		}
	},
	findObjectsByType: function(targetType, tilemap, layer){
		var result = [];
		tilemap.objects[layer].forEach(function(element){
			if(element.properties.type == targetType) {
				element.y -= tilemap.tileHeight; 
				result.push(element);
			}
		}, this);
		return result;
	}

}