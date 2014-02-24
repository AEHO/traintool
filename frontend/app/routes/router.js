require('app/routes/traintool_route');

TrainTool.Router.map(function() {
	this.resource("exercises", {path:'exercises'});
	this.resource("exercisesPage", {path:'exercises/page/:pageToken'});
	this.resource("exercise", {path:'exercise/:id'});
});