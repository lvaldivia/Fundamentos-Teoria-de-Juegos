Preloader = function(game){
}

Preloader.prototype = {
	preload:function(){
		this.load.image('gameTiles','assets/images/tiles_spritesheet.png');
		this.load.tilemap('level1','assets/levels/demo-level.json',null,Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		this.state.start('Game');
	}
}