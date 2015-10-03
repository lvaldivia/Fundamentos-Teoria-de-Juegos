var Boot = function(game){}

Boot.prototype = {

	preload:function(){
		this.scale.scaleMode = 
			Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.game.load.image('loading',
			'assets/loading.png');
	},
	create:function(){
		this.game.state.start('Preload');
	}
}