Game = function(game){

}
Game.prototype={
	init:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 1000;
	},
	preload:function(){

	},
	create:function(){
		this.loadLevel();
	},
	loadLevel:function(){
		this.map=this.add.tilemap('level1');
		this.map.addTilesetImage('tiles_spritesheet','gameTiles');
		this.backgroundLayer= this.map.createLayer('backgroundLayer');
		this.collisionLayer= this.map.createLayer('collisionLayer');
		this.game.world.sendToBack(this.backgroundLayer);
		this.map.setCollisionBetween(1, 160, true, 'collisionLayer');
		this.collisionLayer.resizeWorld(); 
		var playerInfo =this.findObjectsByType('player',this.map,'objectsLayer');
		this.player = 
			this.add.sprite(playerInfo[0].x,playerInfo[0].y,'player',3);
		this.player.anchor.setTo(0.5,0.5);
		this.player.animations.add('walking',[0,1,2,1],6,true);
		this.game.physics.arcade.enable(this.player);
		this.player.body.colliderWorldBounds = true;
    	this.keys = this.game.input.keyboard.createCursorKeys();
    	this.game.camera.follow(this.player);
    	this.enemies = this.add.group();
    	this.createEnemies();
	},
	createEnemies:function(){
		var enemyInfo = this.findObjectsByType('enemy',this.map,'objectsLayer');
		var enemy;
		enemyInfo.forEach(function(element){
			enemy = new 
	Enemy(this.game,element.x,element.y,
		'slime',+element.properties.velocity,this.map);
	this.enemies.add(enemy);
		},this);
	},

	update:function()
	{
		this.game.physics.arcade.collide(this.player, this.collisionLayer);
		this.game.physics.arcade.collide(this.enemies, this.collisionLayer);
		this.player.body.velocity.x = 0;
		if(this.keys.left.isDown){
			this.player.body.velocity.x = -180;
			this.player.scale.setTo(1,1);
			this.player.play('walking');
		}else if(this.keys.right.isDown){
			this.player.body.velocity.x = 180;
			this.player.scale.setTo(-1,1);
			this.player.play('walking');
		}else{
			this.player.animations.stop();
			this.player.frame = 3;
		}

		if(this.keys.up.isDown){
			this.player.body.velocity.y = -500;
		}

	},
	findObjectsByType:function(target, tilemap, layer){
		var result = [];
		tilemap.objects[layer].forEach(function(element){
			if(element.properties.type ==target){
				element.y -= tilemap.tileHeight;
				result.push(element);
			}
		},this);
		return result;
	}
}