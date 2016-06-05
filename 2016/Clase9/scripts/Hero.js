Hero = function(game){
    Phaser.Sprite.call(this,game,
                    100,150,'player');
    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.game = game;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.animations.add('running',[2,3,4,3],15,true);
    this.anchor.setTo(0.5);
    this.isJumping = false;
    this.jumpPeaked = false;
    this.startY = 0;
    this.maxJumpDistance = 120;
    this.body.setSize(38,60,0,0);
    this.animations.play('running');
    
}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.update = function(){
	//this.body.velocity.x = 0;
    if(this.body.touching.down){
        this.body.velocity.x = 200;
    }else{
        this.body.velocity.x = 0;
    }
    if(this.cursors.up.isDown 
                || this.game.input.activePointer.isDown){
        this.jump();
    }
    else if(this.cursors.up.isUp 
        || this.game.input.activePointer.isUp){
        isJumping = false;
    }
    
}

Hero.prototype.jump = function(){
	
	if(this.body.touching.down) {
		this.startY = this.y;
		this.body.velocity.y = -300;		
		this.isJumping = true;
		this.jumpPeaked = false;
	}else if(this.isJumping && !this.jumpPeaked){
		var distance = this.startY - this.y;
		if(distance<= this.maxJumpDistance){
			this.body.velocity.y = -300;	
		}else{
			this.jumpPeaked = true;
		}
		
	}
}