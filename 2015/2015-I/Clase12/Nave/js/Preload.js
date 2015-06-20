Preload=function(game){}

Preload.prototype = {
	preload:function(){
		this.load.image('titlepage', 
		'assets/titlepage.png');
		this.load.image('sea', 
		'assets/sea.png');	
		this.load.spritesheet('player',
			'assets/player.png',64,64);
		this.load.image('bullet','assets/bullet.png');
	},
	create:function(){
		this.state.start('Menu');
	}
	
}