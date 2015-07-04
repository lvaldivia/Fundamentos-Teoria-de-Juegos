Game = function(game){

}
Game.prototype={
	init:function(){
		this.game.physics.arcade.gravity.y = 1000;
		this.RUNNING_SPEED = 180;
    	this.JUMPING_SPEED = 500;
    	this.BOUNCING_SPEED = 150;
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
		this.player.customParams = {};
		this.player.anchor.setTo(0.5,0.5);
		this.player.animations.add('walking',[0,1,2,1],6,true);
		this.game.physics.arcade.enable(this.player);
		this.player.body.colliderWorldBounds = true;
    	this.keys = this.game.input.keyboard.createCursorKeys();
    	this.game.camera.follow(this.player);
    	this.enemies = this.add.group();
    	this.createEnemies();
    	this.createOnscreenControls();
	},
	createOnscreenControls: function(){
	    this.leftArrow = this.add.button(20, this.game.height - 60, 'arrowButton');
	    this.rightArrow = this.add.button(110, this.game.height - 60, 'arrowButton');
	    this.actionButton = this.add.button(this.game.width - 100, this.game.height - 60, 'actionButton');

	    this.leftArrow.alpha = 0.5;
	    this.rightArrow.alpha = 0.5;
	    this.actionButton.alpha = 0.5;

	    this.leftArrow.fixedToCamera = true;
	    this.rightArrow.fixedToCamera = true;
	    this.actionButton.fixedToCamera = true;

	    this.actionButton.events.onInputDown.add(function(){
	      this.player.customParams.mustJump = true;
	    }, this);

	    this.actionButton.events.onInputUp.add(function(){
	      this.player.customParams.mustJump = false;
	    }, this);

	    //left
	    this.leftArrow.events.onInputDown.add(function(){
	      this.player.customParams.isMovingLeft = true;
	    }, this);

	    this.leftArrow.events.onInputUp.add(function(){
	      this.player.customParams.isMovingLeft = false;
	    }, this);

	    this.leftArrow.events.onInputOver.add(function(){
	      this.player.customParams.isMovingLeft = true;
	    }, this);

	    this.leftArrow.events.onInputOut.add(function(){
	      this.player.customParams.isMovingLeft = false;
	    }, this);

	    //right
	    this.rightArrow.events.onInputDown.add(function(){
	      this.player.customParams.isMovingRight = true;
	    }, this);

	    this.rightArrow.events.onInputUp.add(function(){
	      this.player.customParams.isMovingRight = false;
	    }, this);

	    this.rightArrow.events.onInputOver.add(function(){
	      this.player.customParams.isMovingRight = true;
	    }, this);

	    this.rightArrow.events.onInputOut.add(function(){
	      this.player.customParams.isMovingRight = false;
	    }, this);
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
	    if(this.keys.left.isDown || this.player.customParams.isMovingLeft) {
	      this.player.body.velocity.x = -this.RUNNING_SPEED;
	      this.player.scale.setTo(1, 1);
	      this.player.play('walking');
	    }
	    else if(this.keys.right.isDown || this.player.customParams.isMovingRight) {
	      this.player.body.velocity.x = this.RUNNING_SPEED;
	      this.player.scale.setTo(-1, 1);
	      this.player.play('walking');
	    }
	    else {
	      this.player.animations.stop();
	      this.player.frame = 3;
	    }

	    if((this.keys.up.isDown || this.player.customParams.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
	      this.player.body.velocity.y = -this.JUMPING_SPEED;
	      this.player.customParams.mustJump = false;
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