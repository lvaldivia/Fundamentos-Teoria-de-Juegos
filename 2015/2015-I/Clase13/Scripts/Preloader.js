Preloader = function(game){
}

Preloader.prototype = {
	preload:function(){
		this.load.image('slime', 'assets/images/slime.png');
		this.load.image('gameTiles','assets/images/tiles_spritesheet.png');
		this.load.tilemap('level1','assets/levels/demo-level.json',null,Phaser.Tilemap.TILED_JSON);
		this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30);
	},
	create:function(){
		this.state.start('Game');
	}
}