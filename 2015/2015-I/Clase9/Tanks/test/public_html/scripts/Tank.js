Tank = function(index,game, player,bullets){

    this.game = game;
    this.health = 3;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;	

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
    this.tank = game.add.sprite(x, y, 'enemy', 'tank1');
    this.turret = game.add.sprite(x, y, 'enemy', 'turret');

    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5);
    this.turret.anchor.set(0.3, 0.5);

    this.tank.name = index.toString();
    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);

    this.tank.angle = game.rnd.angle();
    
    game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

},
Tank.prototype.update = function(){
    
    /*this.shadow.x = this.tank.x;
    this.shadow.y = this.tank.y;
    this.shadow.rotation = this.tank.rotation;
    this.turret.x = this.tank.x;
    this.turret.y = this.tank.y;
    
    this.turret.rotation = this.game.physics.arcade.angleBetween(this.turret, this.player);*/
}