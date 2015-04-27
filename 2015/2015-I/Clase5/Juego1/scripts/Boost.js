Boost = function(game){
	this.loadingBar=null;
	Global = {WIDTH:320,HEIGHT:480};

}
Boost.prototype ={
	preload:function(){
		this.load.image('loading','assets/loading.png');
	},
	create:function(){
		this.state.start('Preloader');
	}
}