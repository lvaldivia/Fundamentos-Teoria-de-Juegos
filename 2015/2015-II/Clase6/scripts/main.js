var game = new Phaser.Game(480,320,Phaser.AUTO);
game.state.add("Boost",Boost);
game.state.add("Preload",Preloader);
game.state.add("Game",Game);
game.state.start("Boost");