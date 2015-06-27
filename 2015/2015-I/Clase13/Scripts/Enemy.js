Enemy = function(game,x,y,key,velocity,tilemap){
	Phaser.Sprite.call(this,game,x,y,key);

	this.game = game;
	this.tilemap = tilemap;
	this.anchor.setTo(0.5,0.5);

	this.game.physics.arcade.enableBody(this);
	this.body.colliderWorldBounds = true;
	this.body.bounce.set(1,0);
	this.body.velocity.x = velocity;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;


Enemy.prototype.update = function(){
	var direction;

	if(this.body.velocity.x>0){
		this.scale.setTo(-1,1);
		direction = 1;
	}else{
		this.scale.setTo(1,1);
		direction = -1;
	}

	var nextX = this.x + direction*(Math.abs(this.width)/2+1);
	var nextY = this.bottom + 1;

	var nextTile = this.tilemap.getTileWorldXY(nextX,nextY
		,this.tilemap.tileWidth, 
		this.tilemap.tileHeight,'collisionLayer');
	console.log(nextTile);
	if(!nextTile && this.body.blocked.down){
		this.body.velocity.x *=-1;
	}
}