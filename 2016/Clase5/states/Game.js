Game = function(game){}

Game.prototype = {
  create:function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    this.game.world.setBounds(0,0,360,700);

    this.levelData = JSON.parse(this.game.cache.getText('level'));

    this.player = this.game.add.
        sprite(this.levelData.playerStart.x
            ,this.levelData.playerStart.y,'player',3);
    this.player.animations.add('walking',[0,1,2,1],6,true);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.platformGroup = this.game.add.group();
    this.platformGroup.enableBody = true;
    this.levelData.platformData.forEach(function(element){
        this.platformGroup.create(element.x,element.y,'platform');
    },this);
    this.platformGroup.setAll('body.immovable',true);
    this.platformGroup.setAll('body.allowGravity',false);
    this.ground = this.game.add.sprite(0,638,'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    this.barrilGroup = this.game.add.group();
    this.elapsed = 0;
    this.barrilFrequency = this.levelData.barrelFrequency * 1000;
  },

  update:function(){
    this.elapsed += this.game.time.elapsed;
    if(this.elapsed>=1000){
      this.elapsed = 0;
      this.createBarril();
    }
    this.game.physics.arcade.collide(this.player,this.ground);
    this.game.physics.arcade.collide(this.barrilGroup,
          this.ground);
    this.game.physics.arcade.collide(this.barrilGroup,
          this.platformGroup);
    this.game.physics.arcade.collide(this.player,
          this.platformGroup);
    if(this.cursors.left.isDown){
      //this.player.x -=2;
      this.player.body.velocity.x = -180;
      this.player.animations.play('walking');
      this.player.scale.setTo(1,1);
    }else if(this.cursors.right.isDown){
      //this.player.x +=2;
      this.player.body.velocity.x = 180;
      this.player.scale.setTo(-1,1);
      this.player.animations.play('walking');
    }else{
      this.player.body.velocity.x = 0;
      this.player.animations.stop();
      this.player.frame = 3;
    }

    if(this.cursors.up.isDown
      && this.player.body.touching.down){
      this.player.body.velocity.y = -550;
    }

    this.barrilGroup.forEach(function(element){
            if(element.x< 10 && element.y > 600){
              element.kill();
            }
    },this);
  },
  createBarril:function(){
    var barril = this.barrilGroup.getFirstDead();
    if(!barril){
      barril = this.game.add.sprite(
          this.levelData.goal.x,this.levelData.goal.y,'barrel');
        this.barrilGroup.add(barril);
    }else{
        barril.reset(this.levelData.goal.x,this.levelData.goal.y);
    }
    this.game.physics.arcade.enable(barril);
    barril.body.velocity.x = this.levelData.barrelSpeed;
    barril.body.collideWorldBounds = true;
    barril.body.bounce.set(1,0);
  }
}
