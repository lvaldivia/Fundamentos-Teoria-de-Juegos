Plant = function(x, y,game,patch) {
	Phaser.Sprite.call(this, game, x, y,'plant');
	this.patch = patch;
	this.game = game;
	this.anchor.setTo(0.5);
	this.game.physics.arcade.enable(this);
	this.body.immovable = true;

}

Plant.prototype = Object.create(Phaser.Sprite.prototype);
Plant.prototype.constructor = Plant;

Plant.prototype.reset = function(x,y,patch){
	Phaser.Sprite.prototype.reset.call(this,x,y);
	this.patch = patch;
}