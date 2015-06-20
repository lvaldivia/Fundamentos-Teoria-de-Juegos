Game = function(game){

}
Game.prototype={
	init:function(){

	},
	preload:function(){

	},
	create:function(){
		this.loadLevel();
	},
	loadLevel:function(){
		this.map=this.add.tilemap('level1');
		this.map.addTilesetImage('tiles_spritesheet','gameTiles');
		this.backgroundLayer= this.map.createLayer('backgroundLayer');
		this.collisionLayer= this.map.createLayer('collisionLayer');
		this.game.world.sendToBack(this.backgroundLayer);
		this.collisionLayer.resizeWorld(); 
	},
	update:function()
	{

	},
	findObjectsByType:function(target, tilemap, layer){
		var result = [];
		tilemap.objects[layer].forEach(function(element){
			if(element.properties.type ==target){
				element.y -= tilemap.tileHeight;
				result.push(element);
			}
		},this);
	}
}