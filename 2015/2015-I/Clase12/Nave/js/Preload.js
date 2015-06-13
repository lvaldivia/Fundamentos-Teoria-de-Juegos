Preload=function(game){}

Preload.prototype = {
	preload:function(){
		this.load.image('titlepage', 
		'assets/titlepage.png');	
	},
	create:function(){
		this.state.start('Menu');
	}
	
}