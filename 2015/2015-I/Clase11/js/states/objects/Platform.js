Platform = function(game, numTiles, x, y, speed){
	Phaser.Group.call(this,game);
	this.tileSize = 40;
	this.game = game;
	this.enableBody =true;
	this.prepare(numTiles, x, y, speed);

};

Platform.prototype = Object.create(Phaser.Group.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.prepare = function(numTiles, x, y ,speed){

	this.alive = true;

	var i = 0;

	while(i < numTiles){
		var floorTile = new Phaser.Sprite(this.game,
			x+i*this.tileSize,y,'floor');
		this.add(floorTile);
		i++;
	}
	this.setAll('body.immovable',true);
	this.setAll('body.allowGravity',false);
	this.setAll('body.velocity.x',speed);
}