Game = function(game){
	this.land = null;
	this.tank = null;
	this.canon = null;
	this.keys = null;
	this.speed =0;
	this.bullets = null;
	this.fireRate = 500;
	this.nextFire = 0;
	this.enemys = [];
}

Game.prototype ={
	create:function(){
		this.world.setBounds(-1000,-1000,2000,2000);
		this.land = this.add.tileSprite(0,0,800,600,'land');

		this.tank = this.add.sprite(0,0,'tank','tank1');
		this.tank.anchor.setTo(0.5,0.5);
		this.tank.x = 400;
		this.tank.y = 300;
		
		this.physics.enable(this.tank,Phaser.Physics.ARCADE);
		this.tank.body.collideWorldBounds = true;
		this.canon = this.add.sprite(0,0,'tank','turret');
		this.canon.anchor.setTo(0.3,0.5);
		this.canon.x = this.tank.x;
		this.canon.y = this.tank.y;
		this.keys = this.input.keyboard.createCursorKeys();

		this.bullets = this.add.group();
			
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(30, 'bullet', false);
		this.bullets.setAll('anchor.x',0.5);
		this.bullets.setAll('anchor.y',0.5);
		this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
		
		this.camera.follow(this.tank);
		this.land.fixedToCamera = true;
		for(var i=0;i<20;i++){
			this.enemys.push(new Enemy(i,this,this.bullets));
		}
	},
	update:function(){

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
		if(this.input.activePointer.isDown){
			this.fire();
		}
		for(var i=0;i< this.enemys.length;i++){
			
		}
		this.canon.x= this.tank.x;
		this.canon.y= this.tank.y;
		this.land.tilePosition.x = -this.camera.x;
		this.land.tilePosition.y = -this.camera.y;

	},

	fire:function(){
		if(this.time.now>this.nextFire){
			this.nextFire = this.time.now + this.fireRate;
			var bullet = this.bullets.getFirstDead();
			bullet.reset(this.canon.x,this.canon.y);
			this.canon.bringToTop();

			bullet.rotation = this.physics.arcade.moveToPointer(bullet,500,this.input.activePointer);
		}
	}

}
