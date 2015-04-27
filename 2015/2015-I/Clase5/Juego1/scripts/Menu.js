Menu = function(game){
	this.gTitle = null;
	this.startBtn = null;
}

Menu.prototype = {
	create:function(){
		this.gTitle = this.add.sprite(0,0,'gametitle');
		this.startBtn = this.add.button(0,0,'play',this.startGame,this);
		this.startBtn.x = (Global.WIDTH-this.startBtn.width)/2;
		this.startBtn.y = Global.HEIGHT -(2*this.startBtn.height);
	},
	startGame:function(){
		this.state.start('Game');
	},
	
}