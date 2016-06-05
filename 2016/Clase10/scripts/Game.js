Game = function(game){
    
}

Game.prototype = {
    create:function(){
        
        this.sky = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');
        
        this.sky.tileScale.y = 2;
        
        this.sea = this.game.add.tileSprite(
            0,this.game.height-30,this.game.width,
            30,'water');
        
        this.sea.autoScroll(-20,0);
        this.sky.autoScroll(-20,0);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);  
        
        this.game.physics.arcade.gravity.y = 1000;

        this.platformGroup = this.game.add.group();
        this.floorPool = this.add.group();
        this.platform = new Platform(game,10,0,250,this.floorPool);
        this.platformGroup.add(this.platform);
        this.hero = new Hero(game);
        this.loadLevel();
        this.index = 0;
    },
    update:function(){
        if(this.hero.alive){
            this.platformGroup.forEach(function(platform){
            this.game.physics.arcade.collide(this.hero,platform);
                if(platform.length && 
                    platform.children[platform.length-1].right<0){
                    platform.kill();
                }
            },this);
            if(this.platform.length 
                && this.platform.children[this.platform.length-1].right  
                < this.game.world.width){
                this.createPlafform();
            }

            if(this.hero.y> this.game.height){
                this.gameOver();
            }    
        }
    },

    gameOver:function(){
        this.hero.kill();
        navigator.vibrate(2000);
        this.overlay =this.add.bitmapData(this.game.width,this.game.height);
        this.overlay.ctx.fillStyle = "#000";
        this.overlay.ctx.fillRect(0,0,this.game.width,this.game.height);

        this.gameOverPanel = this.game.add.sprite(0,0,this.overlay);

        this.gameOverPanel.alpha = 0.6;

        this.sea.stopScroll();
        this.sky.stopScroll();
        this.gameOverPanel.y = -this.gameOverPanel.height;
        var tweenGameOver = 
        this.game.add.tween(this.gameOverPanel).to({y:0},500);

        tweenGameOver.onComplete.add(function(){
            var style = {font:'30px',fill:"#fff"};
            this.game.add.text(this.game.width/2,this.game.height/2,
                'GAME OVER',style).anchor.setTo(0.5);
            style = {font:'10px',fill:"#fff"};
            this.game.add.text(this.game.width/2,this.game.height/2+120,
                'Tap to restart',style).anchor.setTo(0.5);
            this.game.input.onDown.add(this.restart,this);
        },this);

        tweenGameOver.start();
        
    },

    restart:function(){
        this.game.world.remove(this.sky);
        this.game.world.remove(this.sea);
        this.game.state.start('Game');
    },

    loadLevel:function(){
        this.createPlafform();
        /*this.currIndex = 0;
        this.levelData = {
            platform:[
                {
                    separation:50,
                    y:200,
                    numTiles:4
                },
                {
                    separation:50,
                    y:250,
                    numTiles:6
                },
                {
                    separation:100,
                    y:200,
                    numTiles:3
                }
            ]
        }
        this.createPlafform();*/
    },
    generateRandomPlatform:function(){
        var data = {};

        var minSeparation = 60;
        var maxSeparation = 200;

        data.separation = minSeparation + 
            Math.random()*(maxSeparation - minSeparation);

        var minDiffY = -120;
        var maxDiffY = 120;

        data.y = this.platform.children[0].y + minDiffY + 
            Math.random()*(maxDiffY - minDiffY);

        data.y = Math.max(150 , data.y);
        data.y = Math.min(this.game.world.height - 50, data.y);

        var minTiles = 1;
        var maxTiles = 5;
        data.numTiles = minTiles + Math.random() * (maxTiles - minTiles);

        return data;
    },

    createPlafform:function(){
        var next = this.generateRandomPlatform();
        if(next){

            this.platform = this.platformGroup.getFirstDead();
            if(!this.platform){
                this.platform = new Platform(this.game,next.numTiles,
                this.game.world.width + next.separation,next.y,this.floorPool);    
            }else{
                this.platform.prepare(next.numTiles,this.game.world.width + next.separation,next.y);
            }
            
            this.platformGroup.add(this.platform);
           
            /*this.currIndex++;
            if(this.currIndex == this.levelData.platform.length){
                this.currIndex = 0;
            }*/
        }
    }
}