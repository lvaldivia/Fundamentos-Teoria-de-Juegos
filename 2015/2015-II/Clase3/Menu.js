Menu = function(game){
}

Menu.prototype = {
	create:function(){
		this.bg = this.game.add.sprite(0,0,'bgWelcome');
		this.welcome_title = this.game.add.sprite(0,0,'welcome_title');
		this.welcome_title.x = 160;
		this.welcome_title.y = 150;
		this.btnStart = this.game.add.button
		(160,350,'welcome_playButton',this.startGame,this);
	},

	startGame:function(){
		this.game.state.start('Game');
	}

}