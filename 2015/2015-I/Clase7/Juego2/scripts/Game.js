Game = function(game){
	this.land = null;
	this.tank = null;
	this.canon = null;
	this.keys = null;
	this.speed =0;
}

Game.prototype ={
	create:function(){
		this.world.setBounds(-1000,-1000,2000,2000);
		this.land = this.add.tileSprite(0,0,800,600,'land');

		this.tank = this.add.sprite(0,0,'tank','tank1');
		this.tank.anchor.setTo(0.5,0.5);
		this.tank.x = 400;
		this.tank.y = 300;
		this.tank.body.collideWorldBounds = true;
		this.physics.enable(this.tank,Phaser.Physics.ARCADE);
		this.canon = this.add.sprite(0,0,'tank','turret');
		this.canon.anchor.setTo(0.3,0.5);
		this.canon.x = this.tank.x;
		this.canon.y = this.tank.y;
		this.keys = this.input.keyboard.createCursorKeys();
		
		this.camera.follow(this.tank);
		this.land.fixedToCamera = true;
	},
	update:function(){
		//this.canon.rotation = Math.atan2(this.input.y-this.canon.y,
										//this.input.x-this.canon.x);

		this.canon.rotation = this.physics.arcade.angleToPointer(this.canon);
		if(this.keys.left.isDown){
			this.tank.angle -= 4;
		}
		if(this.keys.right.isDown){
			this.tank.angle += 4;
		}
		if(this.keys.up.isDown){
			this.speed = 200;
		}else{
			this.speed -= 4;
		}
		if(this.speed>0){
			this.physics.arcade.velocityFromRotation(this.tank.rotation,
											this.speed,this.tank.body.velocity);
		}
		this.canon.x= this.tank.x;
		this.canon.y= this.tank.y;
		this.land.tilePosition.x = -this.camera.x;
		this.land.tilePosition.y = -this.camera.y;

	},


}
