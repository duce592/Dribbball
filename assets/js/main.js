$(function() {

	var Model_Player = Backbone.Model.extend({
		url: function(){
			return 'http://api.dribbble.com/players/'+this.attributes.username;
		}
	});

	var Collection_Shots = Backbone.Collection.extend({
		initialize: function( model, page ){
			this.player = model;
			this.params = {
				page: page,
				per_page: 10
			};
		},
		url: function(){
			return "http://api.dribbble.com/players/"+this.player.attributes.username+"/shots?" + $.param( this.params )
		},
		parse: function( data ){
			return data.shots;
		}
	});

	var View_Shots_Container = Backbone.View.extend({
		el: $('#shots'),
		initialize: function( collection ){
			_.bindAll(this, 'render', 'addShot');
			this.collection = collection;
			this.collection.on('add', this.addShot);
			this.render();
		},
		addShot: function( shotModel ){
			var shotView = new View_Shot_Single( shotModel );
			this.$el.append( shotView.render().el );
		},
		render: function(){
			this.$el.html('');
			return this;
		}
	});

	var View_Shot_Single = Backbone.View.extend({
		events: {
			'click .clickable' : 'loadShot'
		},
		template: _.template( $('#shotTemplate').html() ),
		initialize: function( shot ){
			_.bindAll(this, 'render', 'loadShot');
			this.shot = shot;
		},
		loadShot: function(){
			console.log('Loading shot:', this.shot.attributes);
			var view = new View_Content(this.shot);
			view.render();
		},
		render: function(){
			this.$el.html( this.template( this.shot ) );
			return this;
		}
	})

	var View_Content = Backbone.View.extend({
		el: $("#Landscape"),
		template: _.template( $('#contentLanscapeTemplate').html() ),
		initialize: function( model ){
			_.bindAll(this, 'render');
			this.model = model;
			this.model.on('change', this.render);
			this.render;
		},
		render : function() {
			this.$el.html( this.template( this.model ) );
			return this;
		}
	})

	var View_Player = Backbone.View.extend({
		el: $("#player"),
		model: Model_Player,
		events: {
			'click #locationDiv' : 'loadShot'
		},
		template: _.template( $('#playerTemplate').html() ),
		initialize: function( model ){
			_.bindAll(this, 'render');
			this.model = model;
			this.model.on('change', this.render);
		},
		render : function() {
			this.$el.html( this.template( this.model ) );
			return this;
		}
	})





	var Router = Backbone.Router.extend({
		routes:{
			':id' : 'home',
			'' : 'default'
		}
	})

	var Player = null;
	var PlayerView = null;
	var ShotsViewContainer = null;
	var Shots = null;
	var router = new Router();

	router.on("route:home", function( username ) {

		Player = new Model_Player({ username:username });
		PlayerView = new View_Player( Player );

		Shots = new Collection_Shots( Player, 1 );
		ShotsViewContainer = new View_Shots_Container( Shots );

		Player.fetch({ dataType: "jsonp" });
		Shots.fetch({ dataType: "jsonp" });

	})

	router.on("route:default", function(){
		alert('Must enter a username in the URL');
	})

	Backbone.history.start();

});