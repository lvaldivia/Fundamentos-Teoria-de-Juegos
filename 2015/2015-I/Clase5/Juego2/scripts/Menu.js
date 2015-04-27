Menu = function(game){
	this.bg = null;
	this.title = null;
	this.btnStart - null;

}

Menu.prototype = {
	create:function(){
		this.bg = this.add.sprite(0,0,'background');
		this.title = this.add.sprite(0,0,'title');
		this.btnStart = this.add.button(0,0,'button-start',this.startGame,this,1,0,2)
	},
	startGame:function(){

	}
}