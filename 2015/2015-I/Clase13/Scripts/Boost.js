Boost = function(game){
}

Boost.prototype = {
	init:function(){
		this.game.stage.backgroundColor = '#000000';  
    
	    
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;

	    this.game.physics.startSystem(Phaser.Physics.ARCADE);    
	},
	create:function(){
		
		this.state.start('Preloader');
	}
}