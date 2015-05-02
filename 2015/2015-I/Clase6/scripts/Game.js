Game = function(game){
	this.bg = null;
	this.floor = null;
	this.monster = null;
	this.timeCreated = 0;
	this.candyGroup =null;
}

Game.prototype = {
	create:function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = 200;
		this.bg = this.add.sprite(0,0,'background');
		this.floor = this.add.sprite(0,0,'floor');
		this.floor.y = Global.HEIGHT-this.floor.height;
		this.monster = this.add.sprite(0,0,'monster-idle');
		this.monster.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12]);
		this.monster.play('idle',10,true);
		this.monster.y = this.floor.y-50;
		this.candyGroup = this.add.group();
	},
	update:function(){
		this.timeCreated += this.time.elapsed;
		if(this.timeCreated>1000){
			this.timeCreated = 0;
			var candy = this.add.sprite(0,0,'candy');
			candy.frame = this.rnd.integerInRange(1,5);
			candy.x = this.rnd.integerInRange(candy.width/2,Global.WIDTH-(candy.width/2));
			candy.anchor.setTo(0.5,0.5);
			this.candyGroup.add(candy);
			this.physics.enable(candy, Phaser.Physics.ARCADE);
			candy.checkWorldBounds = true;
			candy.inputEnabled = true;
			candy.events.onInputDown.add(this.destroy,this);
			candy.events.onOutOfBounds.add(this.lose,this);
		}
	},
	destroy:function(sprite){
		sprite.kill();
	},
	lose:function(sprite){
		console.log('fuera del escenario');
	}
}
