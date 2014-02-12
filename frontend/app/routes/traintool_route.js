TrainTool.ExerciseRoute = Ember.Route.extend({
	model:function(){
		return this.store.find('exercise');
	}
});
