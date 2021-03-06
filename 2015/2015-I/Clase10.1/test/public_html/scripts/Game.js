Game = function(game){
	this.land = null;
	this.tank = null;
	this.canon = null;
	this.keys = null;
	this.speed =0;
	this.fireRate = 100;
	this.tanks = [];
	this.bullets = null;this.nextFire  = 0;
        this.enemyBullets = null;
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
		
		this.camera.follow(this.tank);
		this.land.fixedToCamera = true;

		this.bullets = this.add.group();
                this.bullets.enableBody = true;
                this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
                this.bullets.createMultiple(30, 'bullet', 0, false);
                this.bullets.setAll('anchor.x', 0.5);
                this.bullets.setAll('anchor.y', 0.5);
                this.bullets.setAll('outOfBoundsKill', true);
                this.bullets.setAll('checkWorldBounds', true);
                
                this.enemyBullets = this.add.group();
                this.enemyBullets.enabledBody = true;
                this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
                this.enemyBullets.createMultiple(100,'bullet',0,false);
                
                this.enemyBullets.setAll('anchor.x', 0.5);
                this.enemyBullets.setAll('anchor.y', 0.5);
                this.enemyBullets.setAll('outOfBoundsKill', true);
                this.enemyBullets.setAll('checkWorldBounds', true);
                
                
	    for (var i = 0; i < 20; i++)
	    {
	        this.tanks.push(new Tank(i, this, this.tank, this.enemyBullets));
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
		this.canon.x= this.tank.x;
		this.canon.y= this.tank.y;
		this.land.tilePosition.x = -this.camera.x;
		this.land.tilePosition.y = -this.camera.y;
		for(var i=0;i < this.tanks.length;i++){
			this.tanks[i].update();
			this.physics.arcade.collide(this.tank, this.tanks[i].tank);
		}

	},

	fire:function(){
		if (this.time.now > this.nextFire)
	    {
	        this.nextFire = this.time.now + this.fireRate;

	        var bullet = this.bullets.getFirstExists(false);

	        bullet.reset(this.canon.x, this.canon.y);
	        bullet.rotation = this.physics.arcade.moveToPointer(bullet, 1000, this.input.activePointer);
	    }
	}

}
