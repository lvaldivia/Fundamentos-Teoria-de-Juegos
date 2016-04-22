var Game = function(game){}

Game.prototype = {
  create:function(){
    this.elapsed = 0;
    this.canMove = true;
    this.bg = this.game.add.sprite(0,0,'road');
    this.cars = [];
    this.colors = [0xff0000,0x0000ff];
    this.carGroup = this.game.add.group();
    this.enemiesGroup = this.game.add.group();
    for(var i = 0;i<2;i++){
      this.cars[i] = this.game.add.sprite(140,this.game.height-80,
                    'car');
      this.cars[i].anchor.setTo(0.5);
      this.cars[i].tint = this.colors[i];
      this.cars[i].positions = [this.game.width*(i*4+1)/8,
                          this.game.width*(i*4+3)/8];
      this.cars[i].side = i;
      this.cars[i].canMove = true;
      this.cars[i].x = this.cars[i].positions[i];
      this.carGroup.add(this.cars[i]);
      this.game.physics.enable(this.cars[i],Phaser.Physics.ARCADE);
    }
    this.game.input.onDown.add(this.move,this);
  },

  move:function(e){
      var position =
              Math.floor(e.position.x / (this.game.width/2));
      if(this.cars[position].canMove){
          this.cars[position].canMove = false;
          var steerTween = this.game.add.tween(this.cars[position]).
           to({angle:20-40 * this.cars[position].side},250,null,true);

          steerTween.onComplete.add(function(){
            this.game.add.tween(this.cars[position]).
            to({angle:0},250,null,true);
          },this);

          this.cars[position].side = 1 - this.cars[position].side;
          var side = this.cars[position].side;
          var posFinal = this.cars[position].positions[side];
          //move
          var moveTween = this.game.add.tween(this.cars[position]).
                  to({x:posFinal},250,null,true);
          moveTween.onComplete.add(function(){
            this.cars[position].canMove = true;
          },this);

          //quebradita

      }
  },

  update:function(){
      if(this.elapsed < this.game.time.now){
        this.elapsed = this.game.time.now +1200;
        this.generateObstacles();
      }
      this.game.physics.arcade.overlap(this.carGroup,
        this.enemiesGroup,
          function(car,enemy){
            if(enemy.key == 'obstacle'){
              enemy.kill();
            }
          },null,this
        );
  },

  generateObstacles:function(){
      for(var i = 0;i<2;i++){
        var enemy;
          if(this.game.rnd.between(0,1) == 1){
              enemy = this.game.add.sprite(0,0,
                'target');
          }else{
              enemy = this.game.add.sprite(0,0,
                'obstacle');
          }
          var position = this.game.rnd.between(0,1) + 2 *i;
          enemy.y = -20;
          enemy.x = this.game.width * (position*2+1)/8;
          enemy.tint = this.colors[i];
          enemy.anchor.setTo(0.5);
          this.game.physics.enable(enemy,Phaser.Physics.ARCADE);
          enemy.body.velocity.y = 100;
          this.enemiesGroup.add(enemy);
      }
  }
}
