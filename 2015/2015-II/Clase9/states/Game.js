Game = function(game){}

Game.prototype = {
	preload:function(){

	},
	create:function(){
		this.background - this.add.sprite(0,0,'background');
		this.plants = this.add.group();
		this.createLandPatches();
	},
	update:function(){

	},
	createLandPatches:function(){
		this.patches = this.add.group();

		var rectangle = this.add.bitmapData(40,50);
		rectangle.ctx.fillStyle ='#000';
		rectangle.ctx.fillRect(0,0,40,50);

		var j,patch,alpha;
		var dark = false;

		for(var i = 0;i<10;i++){
			for(var j=0;j<5;j++){
				patch = new Phaser.Sprite(this.game,
						64+i*40,24+j*50,rectangle);
				this.patches.add(patch);
				alpha = dark ? 0.2: 0.1;
				dark= !dark;
				patch.alpha = alpha;
				patch.inputEnabled = true;
				patch.isBusy = false;
				patch.events.onInputDown.add(
						this.plantPlant,this);
			}
		}

	},

	plantPlant:function(patch){
		if(!patch.isBusy){
			patch.isBusy = true;
			var plant = this.createPlant(
				patch.x + patch.width/2,
					patch.y+patch.height/2,
					this.game,patch);
		}
	},

	createPlant:function(x,y,game,patch){
			var newElement = this.plants.getFirstDead();
			if(!newElement){
				newElement = new Plant(x,y,game,patch);
				this.plants.add(newElement);
			}else{
				newElement.reset(x,y,game,patch);
			}
			return newElement;
	}
}