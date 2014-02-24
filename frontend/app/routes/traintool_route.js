TrainTool.ExercisesRoute = Ember.Route.extend({
  model:function(params){
    return this.store.find('exercise');
  }
});

TrainTool.ExercisesPageRoute = Ember.Route.extend({
  model:function(params){
    return this.store.find('exercise', {pageToken: params.pageToken});
  },
  renderTemplate: function(controller) {
    this.render('exercises', {controller: controller});
  }
});

TrainTool.ExerciseRoute = Ember.Route.extend({
  setupController: function(controller, params) {
    var exercise = this.store.find('exercise', params.id);
    controller.set('model', exercise);
  }
});