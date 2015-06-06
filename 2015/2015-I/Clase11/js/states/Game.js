Game = function(){}

Game.prototype = {
  create:function(){
  	
  	this.background = this.add.tileSprite(0,0,
  			this.world.width,this.world.height,'background');
  	this.background.tileScale.y =2;
  	this.worldSpeed = 200;
  	this.isJumping = false;
  	this.jumpPeaked = false;
  	this.maxJumpDistance = 120;
  	this.background.autoScroll(-this.worldSpeed,0);
  	this.player = this.add.sprite(50,140,'player');
  	this.player.anchor.setTo(0.5,0.5);
  	this.player.animations.add('running',[0,1,2,3,2,1], 
  									15 , true);
  	this.player.play('running');
  	this.physics.startSystem(Phaser.Physics.ARCADE);

  	this.physics.arcade.gravity.y = 500;

  	this.physics.arcade.enable(this.player);
  	this.player.body.setSize(38,60,0,0);
  	//this.player.body.allowGravity = false;

  	this.water = this.add.tileSprite(0,this.world.height-30,
  						this.world.width,this.world.height,
  						'water');
  	this.water.autoScroll(-this.worldSpeed/2,0);

  	this.cursors = this.input.keyboard.createCursorKeys();

  	this.currentPlatform = new Platform(
  			this.game,12,0,200,-this.worldSpeed);

  	/*this.platform = this.add.sprite(40,250,'floor');
  	this.physics.arcade.enable(this.platform);
  	this.platform.body.allowGravity = false;
  	this.platform.body.immovable = true;*/

  },
  update:function(){
    this.physics.arcade.collide(this.player,
    					this.currentPlatform);

    if(this.player.body.touching.down){
    	this.player.body.velocity.x = this.worldSpeed;
    }else{
    	this.player.body.x = 0;
    }
    if(this.cursors.up.isDown || 
    	this.game.input.activePointer.isDown){
    	this.playerJump();
    }else if(this.cursors.up.isUp ||
    	this.game.input.activePointer.isUp
    	){
    	this.isJumping = false;
    }
  },
  playerJump:function(){
  	if(this.player.body.touching.down){
  		this.isJumping = true;
  		this.jumpPeaked = false;
  		this.player.body.velocity.y = -300;
  	}
  },
  render:function(){
  	//this.game.debug.body(this.player);
  }
  
  

};
