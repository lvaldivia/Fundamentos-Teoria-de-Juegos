var Preload = function(game){}
Preload.prototype = {
  preload:function(){
    this.game.load.image('road','assets/road.png');
    this.game.load.image('target','assets/target.png');
    this.game.load.image('car','assets/car.png');
    this.game.load.image('obstacle','assets/obstacle.png');

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  create:function(){
      this.game.state.start("Game");
  }
}
