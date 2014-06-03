// Constructor:
var Dribbble = function(username, perPage){
	this.username = username;
	this.per_page = perPage;
}

	
	Dribbble.prototype.getShotList = function(page, list, callback){
		var params = {
			page: page,
			per_page: this.per_page
		};

		$.get("http://api.dribbble.com/shots/"+list+"?" + $.param( params ), callback,"jsonp");
	}


	Dribbble.prototype.getShot = function(id, callback){
		$.get("http://api.dribbble.com/shots/"+id, callback,"jsonp");
	}


	Dribbble.prototype.getShotRebounds = function(page, id, callback){
		var params = {
			page: page,
			per_page: this.per_page
		};

		$.get("http://api.dribbble.com/shots/"+id+"/rebounds?" + $.param( params ), callback,"jsonp");
	}


	Dribbble.prototype.getPlayer = function(callback){
		$.get("http://api.dribbble.com/players/"+this.username, callback,"jsonp");
	}


	Dribbble.prototype.getPlayerShots = function(page, callback){
		var params = {
			page: page,
			per_page: this.per_page
		};

		$.get("http://api.dribbble.com/players/"+this.username+"/shots?" + $.param( params ), callback,"jsonp");
	}


	Dribbble.prototype.getPlayerShotsFollowing = function(page, callback){
		var params = {
			page: page,
			per_page: this.per_page
		};

		$.get("http://api.dribbble.com/players/"+this.username+"/shots/following?" + $.param( params ), callback,"jsonp");
	}


	Dribbble.prototype.getPlayerShotsLikes = function(page, callback){
		var params = {
			page: page,
			per_page: this.per_page
		};

		$.get("http://api.dribbble.com/players/"+this.username+"/shots/likes?" + $.param( params ), callback,"jsonp");
	}


	Dribbble.prototype.getPlayerFollowers = function(page, callback){
		var params = {
			page: page,
			per_page: this.per_page
		};

		$.get("http://api.dribbble.com/players/"+this.username+"/followers?" + $.param( params ), callback,"jsonp");
	}


	Dribbble.prototype.getPlayerFollowing = function(page, callback){
		var params = {
			page: page,
			per_page: this.per_page
		};

		$.get("http://api.dribbble.com/players/"+this.username+"/following?" + $.param( params ), callback,"jsonp");
	}


	Dribbble.prototype.getPlayerDraftees = function(page, callback){
		var params = {
			page: page,
			per_page: this.per_page
		};

		$.get("http://api.dribbble.com/players/"+this.username+"/draftees?" + $.param( params ), callback,"jsonp");
	}


	