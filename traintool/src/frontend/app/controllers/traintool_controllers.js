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
  saving: false,
  saved: false,
  error: false,

  // Define if the workout can be saved,
  // to be true the workout must be named and have
  // at least one day in it.
  saveLocked : function(){
    var days = this.get('days');
    var withoutName = this.get('withoutName');
    var days_length = days.get('length');
    return withoutName || days_length === 0 || this.get('saving');
  }.property('days.@each', 'name', 'saving'),

  actions : {
    createDay : function(){
      var day = this.store.createRecord('day');
      this.get('days').then(function(days){
        days.pushObject(day);
      });
      this.send('selectDay', day);
    },

    // Select a day to be show in details or be edited
    // and unselect all others
    selectDay : function(day){
      this.get('days').then(function(days){
        days.forEach(function(dayInWorkout){
          dayInWorkout.set('selected', false);
        });
        day.set('selected', true);
      });
      
      this.set('selectedDay', day);
    },

    removeDay : function(day){
      if(this.get('selectedDay') === day){
        this.set('selectedDay', null);
      }
      this.get('days').then(function(days){
        days.removeObject(day);
        day.deleteRecord();
      });
    },

    // Save those models and their childs models.
    saveWorkout : function(){
      var that = this;
      this.set('saving', true);
      var workout = this.get('model');
      return workout.copyModelAndChildrenAndSaveRecursivelyWithPromises().then(function(copy){
        that.set('saving', false);
        that.set('saved', true);
        that.set('id', copy.get('id'));
        that.send('viewTrain', that);
      }, function(err){
        that.set('saving', false);
        that.set('error', true);
      });
    }
  }
});

TrainTool.DayController = Ember.ObjectController.extend(TrainTool.NamesProperties,{
  deleteMode : false,
  unsparsed_proper_time:'',
  // A day is valid when it's named, the proper time of it is seted and there
  // is at least one exercise in it.
  valid : function(){
    var proper_time = this.get('proper_time')
    var withoutName = this.get('withoutName');

    return proper_time && !withoutName && this.get('exercisesQuantity') > 0;
  }.property('exercises.length', 'withoutName', 'proper_time'),

  error: function(){
    var proper_time = this.get('proper_time')
    var withoutName = this.get('withoutName');
    
    if(withoutName){
      return 'O dia deve ser nomeado.'
    }
    if(proper_time === undefined){
      return 'O tempo apropriado deve ser em minutos. Ex.: 10.'
    }
    if(this.get('exercisesQuantity') === 0){
      return 'Deve haver exercícios adicionados ao dia.'
    }
  }.property('exercises.length', 'withoutName', 'proper_time'),

  // Set initialy and update exercisesQuantity when exercises.lenth
  // changes.
  exercisesQuantity : function(){
    return this.get('exercises.length');
  }.property('exercises.length'),

  allExercisesList: function(){
    var exercises = new Bloodhound({
      datumTokenizer: function(d){
        return Bloodhound.tokenizers.whitespace(d.name);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit:10,
      prefetch:{
        url:'https://gup-traintool.appspot.com/_ah/api/gupapi/v1/exercises/all?limit=300',
        filter: function(list) {
          var data = $.map(list.items, function(exercise){
            return {
              id: exercise.id,
              name: exercise.name ? exercise.name : '',
              comment: exercise.comment ? exercise.comment : '' ,
              execution: exercise.execution ? exercise.execution : '',
              equipment: exercise.equipment ? exercise.equipment : ''
            };
          });
          return data;
        }
      },
    });

    exercises.initialize();
    return exercises;
  }.property(),

  // Parse and validade the proper time field
  // to just accept minutes.
  updateProperTime: function(){
    var raw = this.get('unsparsed_proper_time');
    var minutes = raw.match(/(\d+)\s*(m.*)?$/);

    if(minutes !== null){
      this.set('proper_time', minutes[1]);
    }else{
      this.set('proper_time', undefined);
    }

  }.observes('unsparsed_proper_time'),

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
      var that = this;
      this.get('exercises').then(function(exercises){
        exercises.pushObject(exercise);
      });
    },

    removeExercise : function(exercise){
      this.get('exercises').then(function(exercises){
        exercises.removeObject(exercise);
      }).then(function(){
        exercise.deleteRecord();
      });
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

TrainTool.TrainsTrainController = Ember.ObjectController.extend(TrainTool.NamesProperties, {
});

TrainTool.DayInTrainController = Ember.ObjectController.extend(TrainTool.NamesProperties, {
  isEditing : false,
  actions : {
    edit : function(){
      this.toggleProperty('isEditing');
    }
  }
});