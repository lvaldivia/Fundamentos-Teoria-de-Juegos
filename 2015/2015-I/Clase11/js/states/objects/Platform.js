Platform = function(game, floorPool ,numTiles, x, y, speed){
	Phaser.Group.call(this,game);
	this.floorPool = floorPool;
	this.tileSize = 40;
	this.game = game;
	this.enableBody =true;
	this.prepare(numTiles ,x, y, speed);

};

Platform.prototype = Object.create(Phaser.Group.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.prepare = function(numTiles,x, y ,speed){

	this.alive = true;

	var i = 0;

	while(i < numTiles){
		var floorTile = this.floorPool.getFirstExists(false);
		if(!floorTile){
			floorTile = new Phaser.Sprite(this.game,
					x+i*this.tileSize,y,'floor');
		}else{
			floorTile.reset(x+i*this.tileSize,y);
		}
		this.add(floorTile);
		i++;
	}
	this.setAll('body.immovable',true);
	this.setAll('body.allowGravity',false);
	this.setAll('body.velocity.x',speed);
};

Platform.prototype.kill = function(){
	this.alive = false;
	this.callAll('kill');

	var sprites = [];
	this.forEach(function(tile){
		sprites.push(tile);
	},this);

	sprites.forEach(function(tile){
		this.floorPool.add(tile);
	},this);
}