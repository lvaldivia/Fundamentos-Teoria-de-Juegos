Game = function(game){}

Game.prototype = {
	init:function(data){
		this.userData = data;
		console.log(data);
	},
	preload:function(){
		var url = 'assets/'+this.userData.id+'.jpg';
		this.load.image('pic', url);
	},
	create:function(){
		this.pic = this.add.sprite(0,0,'pic');
	}
}