TrainTool.ExerciseRoute = Ember.Route.extend({
	model:function(){
		return this.store.find('exercise');
	},
	actions: {
		error: function(error, transition) {
			// handle the error
			console.log(error);
			//transition.retry();
		}
	}
});
