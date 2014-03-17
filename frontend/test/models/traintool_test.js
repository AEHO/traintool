/*jshint camelcase: false */
var workout, day, exercise, controller;
var getRandomStr = function(){
  return Math.random().toString(36).substring(7);
};


// get length of the days list in the actual controller
// {object || undefined} filterBy - {property : desiredValue, ...}
// (e.g. {selected : true, withoutName : false})
var getDaysLength = function(filterBy){
  var length;
  Ember.run(function(){
    var days = controller.get('days');
    for(var key in filterBy){
      days = days.filterBy(key, filterBy[key]);
    }
    length = days.get('length');
  });
  return length;
};

// get length of the exercises list in the actual controller
// {object || undefined} filterBy - {property : desiredValue, ...}
// (e.g. {selected : true, withoutName : false})
var getExercisesLength = function(filterBy){
  var length;
  Ember.run(function(){
    var exercises = controller.get('exercises');
    for(var key in filterBy){
      exercises = exercises.filterBy(key, filterBy[key]);
    }
    length = exercises.get('length');
  });
  return length;
};

TrainTool.setupForTesting();
TrainTool.injectTestHelpers();

// Unit tests of the controllers

module("TrainsNew controller test", {
  setup: function() {
    TrainTool.reset();
    controller = TrainTool.__container__.lookup('controller:trainsNew');
    Ember.run(function(){
      workout = controller.get('store').createRecord('workout');
    });
    controller.set('model', workout);
  },
  teardown: function() {
    controller = null;
    workout = null;
  }
});

test("Test displayedName property", function() {
  Ember.run(function(){
    workout.set('name', '');
  });
  equal(controller.get('displayedName'), 'Sem nome', '"Sem nome" is the default name when name is not defined');
  Ember.run(function(){
    workout.set('name', 'Testing');
  });
  equal(controller.get('displayedName'), 'Testing', 'When name is defined displayedName is the name itself');
});

test("Test canBeSaved property of the workout", function() {
  var canBeSaved;
  Ember.run(function(){
    workout.set('name', '');
    canBeSaved = controller.get('canBeSaved');
  });
  equal(canBeSaved, false, 'When workout name is null and there is no days in it, it can not be saved');

  Ember.run(function(){
    workout.set('name', 'Name set');
    canBeSaved = controller.get('canBeSaved');
  });
  equal(canBeSaved, false, 'When workout have no days can not be saved');

  Ember.run(function(){
    workout.set('name', '');
    day = controller.get('store').createRecord('day');
    workout.get('days').pushObject(day);
    canBeSaved = controller.get('canBeSaved');
  });
  equal(canBeSaved, false, 'When workout name is null it can not be saved');

  Ember.run(function(){
    workout.set('name', 'Name set');
    canBeSaved = controller.get('canBeSaved');
  });
  equal(canBeSaved, true, 'When workout have a day and it is named it can be saved');
});
 
test('Test createDay action', function(){
  equal(getDaysLength(), 0, 'There is no days created yet');
  Ember.run(function(){
    controller.send('createDay');
    day = controller.get('days').objectAt(0);
  });
  equal(getDaysLength(), 1, 'There is one day created');
  
});

test('Test removeDay action', function(){
  Ember.run(function(){
    controller.send('createDay');
    day = controller.get('days').objectAt(0);
  });
  equal(getDaysLength(), 1, 'There is one day created');
  equal(controller.get('selectedDay'), day, 'The day created is the selectedDay');

  Ember.run(function(){
    controller.send('removeDay', day);
  });
  equal(getDaysLength(), 0, 'There is no more days in the workout');
  equal(controller.get('selectedDay'), null, 'The selectedDay was unset after it was removed');
});

test('Test selectDay action and selected days\' property', function(){
  var numberOfDays = 10;
  var i;
  Ember.run(function(){
    for(i = 0; i < numberOfDays; i += 1){
      controller.send('createDay');
    }
  });
  equal(getDaysLength(), 10, 'There is 10 days created');
  equal(getDaysLength({'selected' : true}), 1, 'Just the last created day is selected');
  Ember.run(function(){
    day = controller.get('days').objectAt(5);
    controller.send('selectDay', day);
  });
  equal(controller.get('selectedDay'), day, 'selectedDay is the day selected');
  ok(day.get('selected'), 'Selected day has selected property equal true');
  equal(getDaysLength({'selected' : true}), 1, 'Just the selectedDay is selected');
});

module("Day controller test", {
  setup: function() {
    TrainTool.reset();
    controller = TrainTool.__container__.lookup('controller:day');
    Ember.run(function(){
      day = controller.get('store').createRecord('day');
    });
    controller.set('model', day);
  },
  teardown: function() {
    controller = null;
    workout = null;
  }
});

test('Test createExercise action', function(){
  equal(getExercisesLength(), 0, 'There is no exercises before add some');
  Ember.run(function(){
    controller.send('createExercise');
  });
  equal(getExercisesLength(), 1, 'There is one exercises after addition');
});

test('Test removeExercise action', function(){
  Ember.run(function(){
    controller.send('createExercise');
    exercise = controller.get('exercises').objectAt(0);
  });
  equal(getExercisesLength(), 1, 'There is one exercise');

  Ember.run(function(){
    controller.send('removeExercise', exercise);
  });
  equal(getExercisesLength(), 0, 'The exercise was removed succefully');
});

test('Test valid property', function(){
  var valid;
  Ember.run(function(){
    day.set('name', '');
    valid = controller.get('valid');
  });
  ok(!valid, 'When day name is null and there is no exercises in it, it can not be saved');

  Ember.run(function(){
    day.set('name', 'Name set');
    valid = controller.get('valid');
  });
  ok(!valid, 'When day have no exercises can not be saved');

  Ember.run(function(){
    day.set('name', '');
    controller.send('createExercise');
    valid = controller.get('valid');
  });
  ok(!valid, 'When day name is null it can not be saved');

  Ember.run(function(){
    day.set('name', 'Name set');
    valid = controller.get('valid');
  });
  ok(valid, 'When day have a exercise and it is named it can be saved');
});

test('Test exercisesQuantity property', function(){
  var desiredExercisesQuantity = 10;
  var exercisesQuantity;
  var i;
  Ember.run(function(){
    for(i = 0; i < desiredExercisesQuantity; i += 1){
      controller.send('createExercise');
    }
    exercisesQuantity = controller.get('exercisesQuantity');
  });
  equal(exercisesQuantity, desiredExercisesQuantity, 'The exerciseQuantity is ok');
});


module("Testing workout creation page.", {
  setup: function() {
    TrainTool.reset();
  },
  teardown: function() {
    localStorage.removeItem("traintool");
  }
});

test('Check HTML is returned', function() {
  visit('/trains/new').then(function(){
    ok(find('*'), 'Found HTML');
  });
});

test('Check if the change of workout\'s name field make the right changes in the page.', function(){
  visit('/trains/new')
    .then(function(){
      ok(find('h2:first:contains(\'Sem nome\')'), 'The default title when the workout is without name is ok');
    })
    .fillIn('#workout-name', 'Testing')
    .then(function(){
      ok(find('h2:first:contains(\'Testing\')'), 'The name added was puted in the <workout></workout> title');
    });
});

test('Check the creation of a new day.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .then(function(){
      equal(find('.day-tab').length, 1, 'New day tab created');
    });
});

test('Check the creation of a new exercise.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .click('.create-exercise-btn:first')
    .then(function(){
      equal(find('.exercise-group-item').length, 1, 'New exercise group-item created');
    });
});

test('Check the remotion mode of a day.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .click('.remove-day:first')
    .then(function(){
      equal(find('.delete-day-confirmation').length, 1, 'Delete confirmation div ok');
    })
    .click('.cancel-day-deletion-btn')
    .then(function(){
      equal(find('.delete-day-confirmation').length, 0, 'Cancel deletion ok');
    });
});

test('Check the remotion of a day.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .click('.remove-day:first')
    .click('.remove-day-btn:first')
    .then(function(){
      equal(find('.day-tab').length, 0, 'Day remotion ok');
    });
});

test('Check the remotion of a exercise.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .click('.create-exercise-btn:first')
    .click('.remove-exercise:first')
    .then(function(){
      equal(find('.exercise-group-item').length, 0, 'Exercise remotion ok');
    });
});

test('Check if the change of day\'s name field make the right changes in the page.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .then(function(){
      equal(find('.day-title:contains("Sem nome")').length, 1, 'The default title when the day is without name is ok');
    })
    .fillIn('.day-name-input', 'Testing day name')
    .then(function(){
      equal(find('.day-title:contains(\'Testing day name\')').length, 1, 'The name added was puted in the day title');
    });
});

test('Check if the change of exercise\'s name field make the right changes in the page.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .click('.create-exercise-btn:first')
    .click('.exercise-group-item:first')
    .then(function(){
      equal(find('.exercise-title:contains("Sem nome")').length, 1, 'The default title when the exercise is without name is ok');
    })
    .fillIn('.exercise-name-input', 'Testing day name')
    .then(function(){
      equal(find('.exercise-title:contains("Testing day name")').length, 1, 'The default title when the exercise is without name is ok');
    });
});
