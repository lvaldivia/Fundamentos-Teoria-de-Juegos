var Game = function(game){}

Game.prototype = {
	create:function(){
		this.number = 
		this.game.add.sprite(160,240,'numbers');
		this.number.anchor.setTo(0.5,0.5);
		this.current_number = Math.floor(Math.random()*10);
		this.number.frame = this.current_number;
		this.workingButtons = true;
		this.score = 0;
		var higherButton = 
		this.game.add.button(160,100,"higher",this.clickedHigher,this);
		higherButton.anchor.setTo(0.5,0.5);
		var lowerButton = 
		this.game.add.button(160,380,"lower",this.clickedLower,this);
		lowerButton.anchor.setTo(0.5,0.5);
	},

	clickedHigher:function(){
		this.higher = true;
		this.exitNumber();
	},
	exitNumber:function(){
		if(this.workingButtons){
			this.workingButtons = false;
			var exitTween = 
			this.game.add.tween(this.number);
			exitTween.to({x:420},500);
			exitTween.start();
			exitTween.onComplete.
				add(this.changeNumber,this);
		}
	},
	changeNumber:function(){
		this.number.x = -180;
		this.number.frame = Math.floor(Math.random()*10);
		var enterTween = 
			this.game.add.tween(this.number);
			enterTween.to({x:160},500);
			enterTween.start();
			enterTween.onComplete.
				add(this.activateButtons,this);
	},
	activateButtons:function(){
		this.workingButtons = true;
		
		if((this.higher && this.number.frame < this.current_number) 
			|| (!this.higher && this.number.frame > this.current_number)){
			this.game.state.start('GameOver',true,false,this.score);
		}else{
			this.score++;
			this.current_number = this.number.frame;
		}
	},

	clickedLower:function(){
		this.higher = false;
		this.exitNumber();
	}
}