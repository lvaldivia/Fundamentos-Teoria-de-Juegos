Platform = function(game, numTiles,x, y, floorPool){
	Phaser.Group.call(this,game);
	this.tileSize = 40;
	this.game = game;
	this.enableBody = true;
	this.speed = -200;
	this.alive = true;
	this.floorPool = floorPool;
	this.prepare(numTiles,x,y);
}

Platform.prototype = Object.create(Phaser.Group.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.prepare = function(numTiles,x,y){
	for(var i = 0;i<numTiles;i++){
		var floor = this.floorPool.getFirstDead();
		if(!floor){
			floor = new Phaser.Sprite(this.game,x + i *this.tileSize,
							y,'floor');
		}else{
			floor.reset(x + i *this.tileSize,y);
		}
		this.add(floor);
	}
	this.setAll('body.immovable',true);
	this.setAll('body.allowGravity',false);
	this.setAll('body.velocity.x',this.speed);
}


Platform.prototype.kill = function(){
	this.alive = false;
	this.callAll('kill');

	var sprites = [];
	this.forEach(function(tile){
		sprites.push(tile);
	}, this);

	sprites.forEach(function(tile){
		this.floorPool.add(tile);
	}, this);
}