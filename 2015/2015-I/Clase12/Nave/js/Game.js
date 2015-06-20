Game = function(game){}

Game.prototype = {
	init:function(data){
		this.userData = data;
		this.nextFire = 0;
	},
	preload:function(){
		var url = 'assets/'+this.userData.id+'.jpg';
		this.load.image('pic', url);
	},
	create:function(){
		
		this.background = this.add.tileSprite(0,0,
			this.world.width, this.world.height,'sea');
		this.pic = this.add.sprite(0,0,'pic');
		this.background.autoScroll(0,100);

		this.player = this.add.sprite(0,0,'player');
		this.player.anchor.setTo(0.5,0.5);
		this.player.animations.add('flying',[0,1,2],true);
		this.player.x = this.world.width/2;
		this.player.y = this.world.height/2;
		this.physics.enable(this.player,
				Phaser.Physics.ARCADE);
		this.playerBullets = this.add.group();
		this.playerBullets.enableBody = true;
		this.playerBullets.createMultiple(100,'bullet');
		this.playerBullets.setAll('outOfBoundsKill',true);
		this.playerBullets.setAll('checkWorldBounds',true);

		this.player.enableBody = true;
	},
	update:function(){
		this.player.x = this.game.input.x;
		this.player.y = this.game.input.y;
		if(this.input.activePointer.isDown){
			this.fire();
		}
	},
	fire:function(){
		if(this.time.now> this.nextFire){
			this.nextFire = this.time.now+200;
			var bullet = this.playerBullets.getFirstExists(false);
			if(bullet){
				bullet.reset(this.game.input.x-this.player.width/2,this.player.y);
				bullet.body.velocity.y = -500;
				bullet.scale.x = 2;
				bullet.scale.y = 2;
			}
			var bullet2 = this.playerBullets.getFirstExists(false);
			if(bullet2){
				bullet2.reset(this.game.input.x+this.player.width/2,this.player.y);
				bullet2.body.velocity.y = -500;
				bullet2.scale.x = 2;
				bullet2.scale.y = 2;
			}
		}
	}
}
