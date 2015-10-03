Game = function(game){

}

Game.prototype = {

	preload: function(){
		this.load.image('bird','assets/bird.png');
		this.load.image('pipe','assets/pipe.png');
		this.load.audio('flap','assets/flap.mp3');
		this.load.audio('ouch','assets/ouch.mp3');
		this.load.audio('loop','assets/intro.mp3');
	},
	create:function(){
		Global.score = 0;
		this.gravity = 800;
		this.flapPower = 300;
		this.speed = 125;
		this.pipeHoled = 120;
		this.bird = this.add.sprite(80,240,'bird');
		this.bird.anchor.setTo(0.5,0.5);
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.enable(this.bird);
		this.input.onDown.add(this.flap,this);
		this.bird.body.gravity.y = this.gravity;
		this.game.time.events.loop(2000,this.addPipe,this);
		this.pipes = this.add.group();
		this.flapsound = this.game.add.sound('flap');
		this.loop = this.game.add.sound('loop',1,true);
		//this.loop.play();
		this.fontStyle = {font:'40px Arial',fill:"#FFFFFF",
					stroke:"#333",strokeThickness:5};
		this.textScore = this.add.text(150,100,"Hola",this.fontStyle);
		this.textScore.text = "Hola";
	},
	flap:function(){
		this.flapsound.play();
		this.bird.body.velocity.y = -this.flapPower;
	},
	addPipe:function(){
		var pipeHole = this.game.rnd.between(50,430-this.pipeHoled);
		var upperPipe = new Pipe(this.game,320,pipeHole-480,-this.speed,this.bird);
		this.pipes.add(upperPipe);

		var lowerPipe = new Pipe(this.game,320,pipeHole+this.pipeHoled,-this.speed,this.bird);
		this.pipes.add(lowerPipe);
	},
	update:function(){
		if(this.bird.y>this.game.height){
			this.die();
		}
		this.game.physics.arcade.collide(this.bird,this.pipes,this.die,null,this);
	},
	die:function(sprite,sprite2){
		if(sprite2){
			
		}
	}


}