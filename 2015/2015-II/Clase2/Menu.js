var Menu = function(game){}

Menu.prototype = {
	create:function(){
		this.title = this.game.add.sprite(160
			,160,'gametitle');
		this.title.anchor.setTo(0.5,0.5);
		this.playButton = this.game.add.button(
			160,320,'play',this.startGame);
	},
	startGame:function(){
		this.game.state.start('Game');
	}
}