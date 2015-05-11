Preloader = function(game){
}

Preloader.prototype = {
	preload:function(){
		this.load.image('land','tanks/earth.png');
		this.load.image('logo','tanks/logo.png');
		this.load.atlas('tank','tanks/tanks.png','tanks/tanks.json');
	},
	create:function(){
		this.state.start('Menu');
	}
}