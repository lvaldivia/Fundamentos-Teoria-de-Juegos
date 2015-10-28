Bullet = function(x, y,game) {
	Phaser.Sprite.call(this, game, x, y);
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;