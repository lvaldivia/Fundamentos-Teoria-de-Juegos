var game = new Phaser.Game(800,600,Phaser.AUTO,'',
  {preload:preload,create:create,update:update});
var number;
var lower;
var higher;
var guest = 0;
var high = false;
var workingButtons = true;
var gameOver = false;
var gameOverScreen;

  function preload(){
    game.load.image('gameover',
          'assets/gameover.png');
    game.load.image('higher',
          'assets/higher.png');
    game.load.image('lower',
          'assets/lower.png');
    game.load.spritesheet('numbers',
          'assets/numbers.png',100,100);
  }

  function create(){
      number = game.add.sprite(0,0,'numbers');
      number.anchor.setTo(0.5);
      number.x = game.world.centerX;
      number.y = game.world.centerY;
      number.frame = Math.floor(Math.random()*10);

      higher = game.add.button(0,0,'higher',callHigh);
      higher.anchor.setTo(0.5);
      higher.x = game.world.centerX;
      higher.y = higher.height;

      lower = game.add.button(0,0,'lower',callLower);
      lower.anchor.setTo(0.5);
      lower.x = game.world.centerX;
      lower.y = game.height - lower.height ;
  }

  function callHigh(){
    high = true;
    tryGuest();
  }

  function callLower(){
    high = false;
    tryGuest();
  }

  function tryGuest(){
    if(workingButtons){
      workingButtons = false;
      guest = Math.floor(Math.random()*10);
      if(high && guest > number.frame){
        gameOver = false;
      }else if(!high && guest < number.frame){
        gameOver = false;
      }else{
        gameOver = true;
      }
      var tween = game.add.tween(number).to({x:-180},500);
      tween.start();
      tween.onComplete.add(restart);
    }
  }

  function callGameOver(){
    number.kill();
    higher.kill();
    lower.kill();
    gameOverScreen = game.add.sprite(0,0,'gameover');
  }

  function restart(){
    if(!gameOver){
      number.x = 1000;
      number.frame =Math.floor(Math.random()*10);
      var tween = game.add.tween(number).
            to({x:game.world.centerX},500);
      tween.start();
      /*tween.onComplete.add(function(){
        workingButtons = true;
      });*/
      tween.onComplete.add(activateButtons);
    }else{
      callGameOver();
    }

  }

  function activateButtons(){
    workingButtons = true;
  }

  function update(){

  }
