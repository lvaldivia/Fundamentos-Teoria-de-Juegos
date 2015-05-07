Menu = function(game){
	this.bg = null;
	this.title = null;
	this.btnStart - null;
	this.cover = null;
	this.aboutBtn = null;
	this.hero =null;
}

Menu.prototype = {
	create:function(){
		this.bg = this.add.sprite(0,0,'bgWelcome');
		this.title = this.add.sprite(0,0,'welcome_title');
		this.title.x = Global.WIDTH-(this.title.width+50);
		this.btnStart = this.add.button(0,0,'welcome_playButton',this.startGame,this);
		this.aboutBtn = this.add.sprite(0,0,'welcome_aboutButton');
		this.btnStart.y = Global.HEIGHT-(this.btnStart.height*2);
		this.btnStart.x = Global.WIDTH/2;
		this.aboutBtn.y = this.btnStart.y;
		this.aboutBtn.x = this.btnStart.x + 200;
		this.hero = this.add.sprite(0,100,'welcome_hero');
		this.hero.x = -this.hero.width;
		var tween = this.add.tween(this.hero).to({x:0},500).delay(500);
		tween.onComplete.add(this.moveUp,this);
		tween.start();
	},
	moveUp:function(){
		var tween = this.add.tween(this.hero).to({y:0},1000);
		tween.onComplete.add(this.moveDown,this);
		tween.start();
	},
	moveDown:function(){
		var tween = this.add.tween(this.hero).to({y:100},1000);
		tween.onComplete.add(this.moveUp,this);
		tween.start();
	},
	startGame:function(){
		this.state.start('Game');
	}
}