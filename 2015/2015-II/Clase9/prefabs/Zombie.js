Zombie = function(x, y,game) {
	Phaser.Sprite.call(this, game, x, y);
}

Zombie.prototype = Object.create(Phaser.Sprite.prototype);
Zombie.prototype.constructor = Zombie;