Game = function(game){
	this.bg = null;
	this.hero = null;
	this.timeCreateCandy = 0;
	this.candyGroup = null;
	this.layer1 = null;
	this.layer2 = null;
	this.rect = null;
	this.elapsed = 0;
	this.direction = 1;
	this.lifeBar = null;
	this.darken = false;
}

Game.prototype = {
	create:function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.layer1 = this.add.group();
		for(var i=0;i<2;i++){
			var bg = this.add.sprite(0,0,'bgLayer1');
			bg.x = i * bg.width;
			this.layer1.add(bg);
		}
		this.layer2 = this.add.group();
		for(var i=0;i<2;i++){
			var bg = this.add.sprite(0,0,'bgLayer2');
			bg.y = Global.HEIGHT-bg.height;
			bg.x = i * bg.width;
			this.layer2.add(bg);
		}
		this.rect = this.add.graphics(0,0);
		this.rect.beginFill(0x000066);
		this.rect.drawRect(0,0,Global.WIDTH,Global.HEIGHT);
		this.rect.endFill();
		this.rect.alpha = 0;
		this.hero = this.add.sprite(0,0,'hero');
		this.hero.animations.add('flying',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
		this.hero.play('flying',20,true);
		this.hero.anchor.setTo(0.5,0.5);
		this.hero.x = this.hero.width/2;
		this.hero.y = this.hero.height/2;
		this.lifeBar = this.add.graphics(0,0);
		this.lifeBar.beginFill(0xFF00FF);
		this.lifeBar.drawRect(0,0,200,20);
		this.lifeBar.endFill();
		this.lifeBar.x = this.hero.x - (this.hero.width/2);
		this.lifeBar.y = this.hero.y + (this.hero.height/2);
		this.candyGroup = this.add.group();
		this.hero.life = 5;
		this.hero.currentLife = this.hero.life;

		this.physics.enable(this.hero, Phaser.Physics.Phaser);
		this.hero.body.immovable  = true;
	},
	update:function(){
		this.layer1.x -= 5;
		if(this.layer1.x<= -Global.WIDTH){
			this.layer1.x = 0;
		}
		this.layer2.x -= 3;
		if(this.layer2.x<= -Global.WIDTH){
			this.layer2.x = 0;
		}
		this.hero.y = this.input.y;
		if(this.hero.y<this.hero.height/2){
			this.hero.y = this.hero.height/2;
		}
		if(this.hero.y>Global.HEIGHT-(this.hero.height/2)){
			this.hero.y=Global.HEIGHT-(this.hero.height/2)
		}
		this.timeCreateCandy += this.time.elapsed;

		this.elapsed+= this.time.elapsed;
		if(this.elapsed>2000){
			if(!this.darken){
				this.darken = true;
				var tween = this.add.tween(this.rect).to({alpha:0.5},1000);
				// que pasa si queremos pasar varios parametros al tween complete
				// debemos hacer este pequeño truco, este tipo de function se llama funcion
				//anomica no tiene un nombre pero si una definicion
				//dentro de esa funcion llamaos a la funcion que queremos ejecutar
				tween.onComplete.add(function(){
					this.tweenOver(this.rect, 15, 50, 'Hola');
				},this);
				tween.start();
			}
		}
		
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
	tweenOver:function(sprite, param1, param2, param3){
		console.log(sprite + ' ' + param1 + ' ' + param2 + ' ' +param3);
	},
	collisionHandler:function(sp1,sp2){
		sp1.currentLife--;
		var scale = sp1.currentLife/sp1.life;
		this.lifeBar.scale.x = scale;
		sp2.kill();
	},
	removeCandy:function(sprite){
		sprite.destroy();	
	}
}

