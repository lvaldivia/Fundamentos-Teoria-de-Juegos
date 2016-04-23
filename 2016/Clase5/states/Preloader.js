Preloader = function(game){}

Preloader.prototype = {
  preload:function(){
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    this.game.load.spritesheet("player",
                      "assets/images/player_spritesheet.png",
                      28,30,5,1,1);
    
    this.game.load.text('level','assets/data/level.json');
    this.game.load.image('ground','assets/images/ground.png');
    this.game.load.image('platform','assets/images/platform.png');
    this.game.load.image('barrel','assets/images/barrel.png');
    this.game.load.image('gorilla','assets/images/gorilla3.png');
  },
  create:function(){
    this.game.state.start('Game');
  },

}
