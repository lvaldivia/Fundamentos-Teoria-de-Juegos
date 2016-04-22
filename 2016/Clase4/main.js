var game = new Phaser.Game(458,488,Phaser.AUTO,'',{
  preload:preload,create:create});
var wheel;
var pin;

var prizes = ["A KEY","50 STARs","500 STARS","BAD LUCK",
  "200 STARS","100 STARS","150 STARS","BAD LUCK"];
var slices = 8;
var canSpin = true;
var prize;

function preload(){
  game.load.image('pin','assets/pin.png');
  game.load.image('wheel','assets/wheel.png');
}

function create(){
  wheel = game.add.sprite(game.width/2,game.height/2,'wheel');
  wheel.anchor.setTo(0.5);
  spin = game.add.sprite(game.width/2,game.height/2,'pin');
  spin.anchor.setTo(0.5);

  game.input.onDown.add(spinWheel);
}

function spinWheel(){
    if(canSpin){
      canSpin = false;
      var rounds = game.rnd.between(2,4);
      var degrees = game.rnd.between(0,360);
      prize = slices - 1 - Math.floor(degrees / (360/slices));
      var spinwTween = game.add.tween(wheel).to({
        angle: 360*rounds + degrees
      },2500,null,true);
      spinwTween.onComplete.add(winPrize);
    }
}

function winPrize(){
  canSpin = true;
  console.log(prize);
}

function update(){

}
