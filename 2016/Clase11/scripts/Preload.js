Preload = function(game){

}

Preload.prototype = {
	preload:function(){
		this.game.load.image('gameTiles','assets/images/tiles_spritesheet.png');
		this.game.load.tilemap('demo','assets/levels/demo-level.json',
				null, Phaser.Tilemap.TILED_JSON);
		this.game.load.spritesheet('player',
			'assets/images/player_spritesheet.png',28,30,5,1,1);
	},
	create:function(){
		this.game.state.start('Game');
	}
}