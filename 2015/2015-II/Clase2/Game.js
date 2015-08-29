var Game = function(game){}

Game.prototype = {
	create:function(){
		this.number = 
		this.game.add.sprite(160,240,'numbers');
		this.number.anchor.setTo(0.5,0.5);
		console.log(this.number.frame);

		var higherButton = 
		this.game.add.button(160,100,"higher",this.clickedHigher,this);
		higherButton.anchor.setTo(0.5,0.5);
		var lowerButton = 
		this.game.add.button(160,380,"lower",this.clickedLower,this);
		lowerButton.anchor.setTo(0.5,0.5);
	},

	clickedHigher:function(){
		if(this.number.frame<9){
			this.number.frame++;
		}else{
			this.number.frame = 0;
		}
	},
	clickedLower:function(){
		if(this.number.frame>0){

		}
	}
}