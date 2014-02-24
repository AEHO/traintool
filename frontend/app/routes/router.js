require('app/routes/traintool_route');

TrainTool.Router.map(function() {
	this.resource("exercises");
	this.resource("exercise", {path:'exercise/:id'});
});