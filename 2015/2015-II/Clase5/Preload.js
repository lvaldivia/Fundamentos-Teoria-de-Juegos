Preload = function(game){}

Preload.prototype = {

	preload:function(){
		this.load.image('bird','assets/bird.png');
		this.load.image('pipe','assets/pipe.png');
	},
	create:function(){
		this.state.start('Game');
	}
}