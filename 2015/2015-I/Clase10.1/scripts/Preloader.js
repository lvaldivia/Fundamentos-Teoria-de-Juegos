Preloader = function(game){
}

Preloader.prototype = {
	preload:function(){
		this.load.image('land','tanks/earth.png');
		this.load.image('logo','tanks/logo.png');
		this.load.atlas('tank','tanks/tanks.png','tanks/tanks.json');
		this.load.image('bullet','tanks/bullet.png');
		this.load.atlas('enemy', 'tanks/enemy-tanks.png', 'tanks/tanks.json');
	},
	create:function(){
		this.state.start('Menu');
	}
}