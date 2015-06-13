Menu = function(game){}

Menu.prototype = {
	create:function(){
		this.bg = this.add.sprite(0,0,'titlepage');
		this.bg.inputEnabled = true;
		this.bg.events.onInputDown.add(this.startGame, this);
	},
	startGame:function(){
		this.connect(this.goGame,this);
	},
	goGame:function(data, t){
		var posting = $.post('save.php',data);
		posting.done(function(r){
			t.state.start('Game',true,false,data);
		});
		
	},
	connect:function(callback,t){
		var c = t;
		FB.login(function(response){
			if(response.status=='connected'){
				FB.api('/me',function(response){
					info = response;
					FB.api("/me/picture?width=200&height=200",
						function(returnData){
							info.url = returnData.data.url;
							callback(info, c);
						});
				});
			}
		}, {scope:'public_profile , email, user_birthday'});
	},
	

}