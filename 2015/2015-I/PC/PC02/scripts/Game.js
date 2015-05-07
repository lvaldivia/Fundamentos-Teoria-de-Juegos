Game = function(game){
	this.bg = null;
	this.hero = null;
	
	this.timeCreateCandy = 0;
	this.candyGroup = null;
}

Game.prototype = {
	create:function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.bg = this.add.sprite(0,0,'bgLayer1');
		this.hero = this.add.sprite(0,0,'hero');
		this.hero.animations.add('flying',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
		this.hero.play('flying',24,true);
		this.hero.anchor.setTo(0.5,0.5);
		this.hero.x = this.hero.width/2;
		this.hero.y = this.hero.height/2;
		this.candyGroup = this.add.group();
		this.camera.follow(this.hero);

		this.physics.enable(this.hero, Phaser.Physics.Phaser);
		this.hero.body.immovable  = true;
	},
	update:function(){
		this.hero.y = this.input.y;
		if(this.hero.y<this.hero.height/2){
			this.hero.y = this.hero.height/2;
		}
		if(this.hero.y>Global.HEIGHT-(this.hero.height/2)){
			this.hero.y=Global.HEIGHT-(this.hero.height/2)
		}
		this.timeCreateCandy += this.time.elapsed;
		
		if(this.timeCreateCandy>1000){
			this.timeCreateCandy = 0;
			var candy = this.add.sprite(0,0,'candy');
			candy.frame = this.rnd.integerInRange(1,5)
			candy.x = Global.WIDTH;
			candy.y =  this.rnd.integerInRange(candy.height/2, Global.WIDTH-candy.height/2);
			this.physics.enable(candy, Phaser.Physics.ARCADE);
			candy.checkWorldBounds  = true;
			candy.body.velocity.x = -100;
			candy.outOfBoundsKill = true;
			this.candyGroup.add(candy);
			candy.anchor.setTo(0.5,0.5);
			candy.rotateMe = (Math.random()*4)-2;
			candy.events.onOutOfBounds.add(this.removeCandy, this);
		}
		this.physics.arcade.overlap(this.hero,this.candyGroup,this.collisionHandler,null,this);
		this.candyGroup.forEach(function(candy){
			candy.angle += candy.rotateMe;
		});
	},
	collisionHandler:function(sp1,sp2){
		sp2.kill();
	},
	removeCandy:function(sprite){
		sprite.destroy();	
	}
}

