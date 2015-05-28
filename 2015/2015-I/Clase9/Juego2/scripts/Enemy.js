Enemy = function(index, game, bullets){
	this.index = index;
	this.game = game;
	this.bullets = bullets;
	var x = this.game.world.randomX;
	var y = this.game.world.randomY;
	this.tank = this.game.add.sprite(0,0,'tank','tank1');
	this.tank.anchor.setTo(0.5,0.5);
	this.tank.x = x;
	this.tank.y = y;
	
	this.game.physics.enable(this.tank,Phaser.Physics.ARCADE);
	this.tank.body.collideWorldBounds = true;
	this.canon = this.game.add.sprite(0,0,'tank','turret');
	//this.canon.anchor.setTo(0.3,0.5);
	this.canon.x = this.tank.x;
	this.canon.y = this.tank.y;
	this.tank.angle = this.game.rnd.angle();
}