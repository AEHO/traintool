
var getRandomStr = function(){
  return Math.random().toString(36).substring(7);
};

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
  visit("/exercises").then(function() {
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


test("creating a Exercise proxies to the store", function(){
  var create = sinon.stub(TrainTool.Exercise.store, 'createRecord'),
      properties = {name: 'hi'};
  TrainTool.Exercise.store.createRecord('exercise', properties);

  ok(create.calledOnce);
  create.restore();
});

test("destroying a Todo proxies to the store", function(){
  var destroy = sinon.stub(TrainTool.Exercise.store, 'destroy');
  var exercise;
  Ember.run(function(){
    exercise = TrainTool.Exercise.store.createRecord('exercise', {});
  });

  TrainTool.Exercise.store.destroy(exercise);
  ok(destroy.calledOnce);
  destroy.restore();
});

test("asking for all todos proxies to the store", function(){
  var all = sinon.stub(TrainTool.Exercise.store, 'all');
  TrainTool.Exercise.store.all();

  ok(all.calledOnce);
  all.restore();
});