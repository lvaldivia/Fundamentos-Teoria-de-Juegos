Preloader = function(game){
	this.preloadBar = null;
}

Preloader.prototype = {
	preload:function(){
		this.preloadBar = this.add.sprite(0,0,'loading');
		this.preloadBar.x = (Global.WIDTH-this.preloadBar.width)/2;
		this.preloadBar.y = (Global.HEIGHT-this.preloadBar.height)/2;
		this.load.setPreloadSprite(this.preloadBar);
		this.load.image('gameover','assets/gameover.png');
		this.load.image('gametitle','assets/gametitle.png');
		this.load.image('higher','assets/higher.png');
		this.load.image('lower','assets/lower.png');
		this.load.image('play','assets/play.png');
		this.load.spritesheet('numbers','assets/numbers.png',100,100);
	},
	create:function(){
		//console.log('termino de cargar los demas assets');
		this.state.start('Menu');
	}
}