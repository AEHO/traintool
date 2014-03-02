TrainTool.ExercisesRoute = Ember.Route.extend({
  model:function(params){
    return this.store.find('exercise');
  },

  actions: {
    more: function(){
      var meta = this.store.metadataFor("exercise");
      var exercises = this.store.modelFor("exercise");
      var newsModels = this.store.find('exercise', {pageToken: meta.nextPageToken});
      newsModels.forEach(function(newModel){
        exercises.pushObject(newModel);
      });
    }
  }
});

TrainTool.ExerciseRoute = Ember.Route.extend({
  setupController: function(controller, params) {
    var exercise = this.store.find('exercise', params.id);
    controller.set('model', exercise);
  }
});

TrainTool.TrainsIndexRoute = Ember.Route.extend({});

TrainTool.TrainsNewRoute = Ember.Route.extend({
  renderTemplate:function(){
    this.render('trains/new');
  },
  model: function(){
    return this.store.createRecord('workout', {name:'teste'});
  }
});