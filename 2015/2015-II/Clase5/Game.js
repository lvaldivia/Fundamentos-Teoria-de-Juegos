Game = function(game){}

Game.prototype = {
	create:function(){
		this.gravity = 800;
		this.flapPower = -550;
		this.bird = this.game.add.sprite(80,240,"bird");
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = this.gravity;
		this.game.input.onDown.add(this.flap,this);
		this.pipeTime = 0;
		this.pipeHoled = 300;
		this.pipes = this.game.add.group();
	},
	update:function(){
		this.pipeTime += this.game.time.elapsed;
		if(this.pipeTime>=2000){
			this.pipeTime = 0;
			this.addPipe();
		}
	},
	addPipe:function(){
		var pipeHole = this.game.rnd.between(50,430-this.pipeHoled);
		var upper = new Pipe(this.game,320,pipeHole-480,-125,
				this.bird);
		this.pipes.add(upper);
		var lower = new Pipe(this.game,320,
				pipeHole+this.pipeHoled,-125,this.bird);
		this.pipes.add(lower);

	},
	flap:function(){
		this.bird.body.velocity.y = this.flapPower;
	}

}