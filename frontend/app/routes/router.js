require('app/routes/traintool_route');

TrainTool.Router.map(function() {
	this.resource("exercise", {path:"/"}, function(){
		return this.resource("exercise", {path:"/exercise/:id"});
	});
});
