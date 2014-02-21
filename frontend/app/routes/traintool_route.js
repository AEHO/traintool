TrainTool.ExercisesRoute = Ember.Route.extend({
	model:function(){
		return this.store.find('exercise');
	}
});

TrainTool.ExerciseRoute = Ember.Route.extend({
	setupController: function(controller, params) {
		var exercise = this.store.find('exercise', params.id);
		controller.set('model', exercise);
	}
});