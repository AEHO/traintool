
var model, controller;
var getRandomStr = function(){
  return Math.random().toString(36).substring(7);
};

module("Testing workout creation page.", {
  setup: function() {
    TrainTool.setupForTesting();
    TrainTool.injectTestHelpers();
  },
  teardown: function() {
    localStorage.removeItem("traintool");
    TrainTool.reset();
  }
});

test('Check HTML is returned', function() {
  visit('/trains/new').then(function(){
    ok(find('*'), 'Found HTML.');
  });
});

test('Check if the change of workout\'s name field make the right changes in the page.', function(){
  visit('/trains/new')
    .then(function(){
      ok(find('h2:first:contains(\'Sem nome\')'), 'The default title when the workout is without name is ok.');
    })
    .fillIn('#workout-name', 'Testing')
    .then(function(){
      ok(find('h2:first:contains(\'Testing\')'), 'The name added was puted in the <workout></workout> title.');
    });
});

test('Check the creation of a new day.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .then(function(){
      ok(find('.day-tab').length === 1, 'New day tab created.');
    });
});

test('Check the creation of a new exercise.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .click('#create-exercise-btn')
    .then(function(){
      ok(find('.exercise-group-item').length === 1, 'New exercise group-item created.');
    });
});

test('Check if the change of day\'s name field make the right changes in the page.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .then(function(){
      ok(find('.day-title:contains("Sem nome")').length === 1, 'The default title when the day is without name is ok.');
    })
    .fillIn('.day-name-input', 'Testing day name')
    .then(function(){
      ok(find('.day-title:contains(\'Testing day name\')').length === 1, 'The name added was puted in the day title.');
    });
});

test('Check if the change of exercise\'s name field make the right changes in the page.', function(){
  visit('/trains/new')
    .click('#create-day-btn')
    .click('#create-exercise-btn')
    .click('.exercise-group-item:first')
    .then(function(){
      ok(find('.exercise-title:contains("Sem nome")').length === 1, 'The default title when the exercise is without name is ok.');
    })
    .fillIn('.exercise-name-input', 'Testing day name')
    .then(function(){
      ok(find('.exercise-title:contains("Testing day name")').length === 1, 'The default title when the exercise is without name is ok.');
    });
});

module("Testing exercises operations and page generations", {
  setup: function() {
    TrainTool.setupForTesting();
    TrainTool.injectTestHelpers();
  },
  teardown: function() {
    localStorage.removeItem("traintool");
    TrainTool.reset();
  }
});

test("Check HTML is returned", function() {
  visit("/").then(function() {
    ok(find("*"), "Found HTML!");
  });
});


test("Creating the exercises using the exercise creator page.", function(){
  var name = getRandomStr();
  var comment = getRandomStr();
  var equipament = getRandomStr();
  var execution = getRandomStr();
  var bodyPart = getRandomStr();
  //The array adapter passes a raw value. So a random int is ok.
  var reps = Math.round(Math.random() * 10000000);
  // async helper telling the application to go to the '/' route
  visit("/exercises")
    .fillIn("#exercise-name", name)
    .fillIn("#exercise-comment", comment)
    .fillIn("#exercise-equipament", equipament)
    .fillIn("#exercise-execution", execution)
    .fillIn("#exercise-reps", reps)
    .fillIn("#exercise-bodypart", bodyPart)
    .click('#exercise-create')
    .then(function(){
      ok(find(".exercise-div:first:contains('"+name+"')").length, "The exercise name text is ok.");
    })
    .click(".exercise-div:first>.btn-ex-details")
    .then(function(){
      ok(find(".exercise-div:first:contains('"+comment+"')").length, "The exercise comment text is ok");
      ok(find(".exercise-div:first:contains('"+execution+"')").length, "The exercise execution text is ok");
      ok(find(".exercise-div:first:contains('"+equipament+"')").length, "The exercise equipament text is ok");
      ok(find(".exercise-div:first:contains('"+reps+"')").length, "The exercise reps text is ok");
    });
});

// Unit tests for controllers

module("Post Controller Test", {
  setup: function() {
    App.reset();
    controller = TrainTool.__container__.lookup('controller:trainsNew');
    model = TrainTool.Wokout.create();
    controller.set('model', model);
  },
  teardown: function() {
    controller = null;
    model = null;
  }
});

test("it should capitalize the title", function() {
});