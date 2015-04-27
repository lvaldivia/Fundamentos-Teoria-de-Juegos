Game = function(game){
	this.number = 0;
	this.numberSprite = null;
	this.higherBtn = null;
	this.lowerBtn = null;
	this.disabledButtons = false;
	this.win = false;
	this.next_number = 0;
}

Game.prototype = {
	create:function(){
		this.number = Math.floor(Math.random()*10);
		this.numberSprite = this.add.sprite(0,0,'numbers');
		this.numberSprite.anchor.setTo(0.5,0.5);
		this.numberSprite.frame = this.number;
		this.numberSprite.x = Global.WIDTH/2;
		this.numberSprite.y = Global.HEIGHT/2;
		this.higherBtn = this.add.button(0,0,'higher',this.checkHigher,this);
		this.lowerBtn = this.add.button(0,0,'lower',this.checkLower,this);
		this.lowerBtn.x = (Global.WIDTH-this.lowerBtn.width)/2;
		this.higherBtn.x = this.lowerBtn.x;
		this.higherBtn.y = Global.HEIGHT-this.higherBtn.height;
	},
	checkLower:function(){
		this.checkNumber(false,this);
	},
	checkHigher:function(){
		this.checkNumber(true,this);
	},
	checkNumber:function(higher){
		if(!this.disabledButtons){
			this.disabledButtons = true;
			this.next_number = Math.floor(Math.random()*10);
			var frame = this.numberSprite.frame;
			this.win = false;
			if(higher && frame < this.next_number){
				this.win  =true;
				console.log('Next number: '+this.next_number + ' mayor a '+frame);
			}	
			if(!higher && frame > this.next_number){
				this.win  =true;
				console.log('Next number: '+this.next_number + ' menor a '+frame);
			}
			var disapearTween = this.add.tween(this.numberSprite);
			disapearTween.to({x:460},100);
			disapearTween.onComplete.add(this.showNextNumber,this);
			disapearTween.start();
		}
	},
	showNextNumber:function(){
		this.numberSprite.x = -50;
		this.numberSprite.frame = this.next_number;
		var showTween = this.add.tween(this.numberSprite);
		showTween.to({x:Global.WIDTH/2},100);
		showTween.onComplete.add(this.checkWin,this);
		showTween.start();
	},
	checkWin:function(){
		if(this.win){
			console.log('Gano');
		}else{
			console.log('Perdio');
		}
		this.disabledButtons = false;
	}
}