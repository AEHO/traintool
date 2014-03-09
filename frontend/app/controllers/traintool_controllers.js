/*jshint camelcase: false */
TrainTool.ExercisesController = Ember.ArrayController.extend({
  sortProperties: ['created'],
  sortAscending: false,
  actions:{
    createExercise:function(){
      // Get values from inputs
      var name = this.get('exercise-name');
      var comment = this.get('exercise-comment');
      var equipament = this.get('exercise-equipament');
      var execution = this.get('exercise-execution');
      var reps = this.get('exercise-reps');
      var body_part = this.get('exercise-bodypart');
      // Reps must be a Array of integer, so split in each sequence
      // of non numerals.
      if(typeof reps === 'string'){
        reps = reps.split(/\D+/);
      }
      var exercise = this.store.createRecord('exercise', {
        name:name === null ? '' : name,
        body_part:body_part,
        comment:comment === null ? '' : comment,
        equipament:equipament === null ? '' : equipament,
        execution:execution === null ? '' : execution,
        reps:reps === null ? '' : reps
      });
      exercise.save();
    }
  }
});

TrainTool.ExercisesPageController = TrainTool.ExercisesController.extend();

TrainTool.ExerciseInListController = Ember.ObjectController.extend({
  actions:{
    //Toggle the details of an exercise
    toggleDetails:function(){
      this.toggleProperty('showDetails');
    }
  },
  showDetails:false
});

TrainTool.ExerciseController = Ember.ObjectController.extend({});

TrainTool.TrainsNewController = Ember.ObjectController.extend(TrainTool.NamesProperties, {
  selectedDay : null,
  // Define if the workout can be saved,
  // to be true the workout must be named and have
  // at least one day in it.
  canBeSaved : function(){
    var days = this.get('days');
    var withoutName = this.get('withoutName');
    var days_length = days.get('length');
    return !withoutName && days_length > 0;
  }.property('days.@each', 'name'),

  actions : {
    createDay : function(){
      var day = this.store.createRecord('day');
      this.get('days').pushObject(day);
      this.send('selectDay', day);
    },

    // Select a day to be show in details or be edited
    selectDay : function(day){
      this.get('days').forEach(function(day){
        day.set('selected', false);
      });

      day.set('selected', true);
      this.set('selectedDay', day);
    },

    removeDay : function(day){
      if(this.get('selectedDay') === day){
        this.set('selectedDay', null);
      }
      this.get('days').removeObject(day);
      day.deleteRecord();
    },
    // Do a copy of all models neasted in the workout recursively and
    // save the copied models.
    saveWorkout : function(){
      var that = this;
      var workour_attrs = this.get('model').toJSON();
      var days_list = this.get('model').get('days');
      var exercises_list;
      var workout_copy = this.store.createRecord('workout', workour_attrs);
      var day_copy;
      var exercise_copy;
      workout_copy.save().then(function(workout){
        days_list.forEach(function(day){
          exercises_list = day.get('exercises');
          day_copy = that.store.createRecord('day', day.toJSON());
          day_copy.set('workout_id', workout);
          workout.get('days').pushObject(day_copy);
          day_copy.save().then(function(saved_day){
            exercises_list.forEach(function(exercise){
              exercise_copy = that.store.createRecord('exercise', exercise.toJSON());
              exercise_copy.set('day_id', saved_day);
              saved_day.get('exercises').pushObject(exercise_copy);
              exercise_copy.save();
            });
          });
        });
      });
    }
  }
});

TrainTool.DayController = Ember.ObjectController.extend(TrainTool.NamesProperties, {
  deleteMode : false,
  // An day is valid when it's named and there is at least
  // one exercise in it.
  valid : function(){
    var exercises = this.get('exercises');
    var withoutName = this.get('withoutName');
    var exercisesLength = exercises.get('length');
    return !withoutName && exercisesLength > 0;
  }.property('exercises.length', 'withoutName'),

  exercisesQuantity : function(){
    return this.get('exercises').get('length');
  }.property('exercises.length'),

  actions : {
    enterDeleteMode : function(){
      this.set('deleteMode', true);
    },

    cancelDeleteMode : function(){
      this.set('deleteMode', false);
    },

    createExercise : function(){
      var exercise = this.store.createRecord('exercise', {
        reps : Ember.A()
      });
      this.get('exercises').pushObject(exercise);
      return false;
    },

    removeExercise : function(exercise){
      this.get('exercises').removeObject(exercise);
      exercise.deleteRecord();
    }
  }
});

TrainTool.ExercisesInTrainController = Ember.ObjectController.extend(TrainTool.NamesProperties, {
  isEditing : false,
  errorInReps : false,
  actions : {
    edit : function(){
      this.toggleProperty('isEditing');
    },

    newSerie : function(){
      var repetitions = this.get('repetitions');
      var regexNumber = /^\d+$/;
      if(regexNumber.test(repetitions)){
        var value = parseInt(repetitions, 10);
        var lastReps = this.get('reps').get('lastObject');
        this.get('reps').pushObject(value);
        if(lastReps){
          var nextPredictedRep = 2 * value - lastReps;
          this.set('repetitions', nextPredictedRep);
        } else {
          this.set('repetitions', '');
        }
        this.set('errorInReps', false);
      }else{
        this.set('errorInReps', true);
      }
    },
    removeSerie : function(){
      var reps = this.get('reps');
      this.set('reps', reps.slice(0, reps.get('length')-1));
    }
  },

  displReps : function(){
    return this.get('reps').join('x');
  }.property('reps.@each')

});