require('app/routes/traintool_route');

TrainTool.Router.map(function() {
	this.resource("exercises", {path:'exercises'});
	this.resource("exercise", {path:'exercise/:id'});
	this.resource("trains", {path: 'trains'}, function(){
		this.route('train', {path:':id'});
		this.route('new');
	});
});