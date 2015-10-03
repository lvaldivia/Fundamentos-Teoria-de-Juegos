Game = function(game){
	
}

Game.prototype = {
	create:function(){
		this.timeCreated = 0;
		//this.bg = this.game.add.sprite(0,0,'bgLayer1');
		this.bg = 
		this.add.tileSprite(0,0,
			this.world.width,this.world.height,
			'bgLayer1');
		this.bg.autoScroll(-200,0);
		this.hero = this.add.sprite(0,0,'hero');
		this.hero.animations.add('flying');
		this.hero.play('flying',24,true);
		this.candyGroup = this.game.add.group();
		this.physics.enable(this.hero, Phaser.Physics.ARCADE);
		this.hero.body.immovable = true;
	},
	update:function(){
		this.timeCreated += this.game.time.elapsed;
		//console.log(this.timeCreated);
		if(this.timeCreated>1000){
			this.timeCreated = 0;
			var candy = this.game.add.sprite(0,0,
					'candy');candy.frame = this.rnd.integerInRange(1,5);
			candy.frame = this.rnd.integerInRange(1,5);
			if(candy.frame == 5){
				candy.esmalito =true;
			}else{
				candy.esmalito = false;
			}
			candy.x = this.game.width;
			candy.y = this.game.rnd.integerInRange(
				candy.height/2,
				this.game.height-candy.height/2);
			candy.heigth = 5;
			candy.anchor.setTo(0.5,0.5);
			this.candyGroup.add(candy);
			this.physics.enable(candy, 
				Phaser.Physics.ARCADE);
			candy.body.velocity.x = -100;
			candy.rotateMe = (Math.random()*4)-2;
		}
		this.candyGroup.forEach(function(candy){
			console.log(candy.heigth);
			candy.angle += candy.rotateMe;
		});
		this.physics.arcade.collide(this.hero,
			this.candyGroup,
			this.checkCollision,null,this);

		if(this.game.input.y > 0 
			&& this.game.input.y< 
			this.game.height-this.hero.height){
			//this.hero.x = this.game.input.x;
			this.hero.y = this.game.input.y;
		}
		
	},
	checkCollision:function(sp1,sp2){
		if(sp2.esmalito){

		}
		sp2.destroy();
	}

}

