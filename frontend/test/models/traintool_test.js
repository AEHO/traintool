

module("Testing the exercises creator", {
  setup: function() {
    TrainTool.setupForTesting();
    TrainTool.injectTestHelpers();
    TrainTool.reset();
  }
});

test("Exercise creation", function() {
  // async helper telling the application to go to the '/' route
  var name = Math.random().toString(36).substring(7);
  var comment = Math.random().toString(36).substring(7);
  var equipament = Math.random().toString(36).substring(7);
  var execution = Math.random().toString(36).substring(7);
  //The array adapter passes a raw value. So a random int is ok.
  var reps = Math.round(Math.random() * 10000000);
  visit("/")
    .fillIn("#exName", name)
    .fillIn("#exComment", comment)
    .fillIn("#exEquipament", equipament)
    .fillIn("#exExecution", execution)
    .fillIn("#exReps", reps)
    .click("#exCreate")
    .then(function(){
      ok(find("ul>li:last:contains('"+name+"')").length, "The exercise name text is ok.");
      ok(find("ul>li:last:contains('"+comment+"')").length, "The exercise comment text is ok");
      ok(find("ul>li:last:contains('"+execution+"')").length, "The exercise execution text is ok");
      ok(find("ul>li:last:contains('"+equipament+"')").length, "The exercise equipament text is ok");
      ok(find("ul>li:last:contains('"+reps+"')").length, "The exercise reps text is ok");
    }).visit("/")
    .then(function(){
      ok(find("ul>li:last:contains('"+name+"')").length, "Before refresh the page the exercise name text still ok.");
      ok(find("ul>li:last:contains('"+comment+"')").length, "Before refresh the page the exercise comment text still ok");
      ok(find("ul>li:last:contains('"+execution+"')").length, "Before refresh the page the exercise execution text still ok");
      ok(find("ul>li:last:contains('"+equipament+"')").length, "Before refresh the page the exercise equipament text still ok");
      ok(find("ul>li:last:contains('"+reps.toString()+"')").length, "Before refresh the page the exercise reps text still ok");
    });
    
});

// test("a Todo begins with completed set to false", function(){
//   var exercise = TrainTool.get('store').createRecord('exercise', {});
//   ok(exercise.get('store') instanceof TrainTool.Store, "todo's store is a Store");
// });

// test("a Todo has access to the localStore store", function(){
//   var todo = Todos.Todo.create();
//   ok(todo.get('store') instanceof Todos.Store, "todo's store is a Store");
// });

// test("when a Todo's title changes it automatically saves", function(){
//   var todo = Todos.Todo.create();
//   var update = sinon.stub(todo.get('store'), 'update');

//   Ember.run(function(){
//     todo.set('title', 'a new title');
//   });

//   ok(update.calledOnce);

//   update.restore();
// });

// test("when a Todo's completed status changes it automatically saves", function(){
//   var todo = Todos.Todo.create();
//   var update = sinon.stub(todo.get('store'), 'update');

//   Ember.run(function(){
//     todo.toggleProperty('completed');
//   });

//   ok(update.calledOnce);

//   update.restore();
// });

// test("the Todo constructor has access to the store", function(){
//   ok(Todos.Todo.store instanceof Todos.Store, "Todo store is a Store");
// });

// test("creating a Todo proxies to the store", function(){
//   var create = sinon.stub(Todos.Todo.store, 'createRecord'),
//       properties = {title: 'hi'};
//   Todos.Todo.createRecord(properties);

//   ok(create.calledOnce);
//   create.restore();
// });

// test("destroying a Todo proxies to the store", function(){
//   var destroy = sinon.stub(Todos.Todo.store, 'destroy'),
//       todo = Todos.Todo.createRecord();

//   Todos.Todo.destroy(todo);
//   ok(destroy.calledOnce);
//   destroy.restore();
// });

// test("asking for all todos proxies to the store", function(){
//   var all = sinon.stub(Todos.Todo.store, 'all');
//   Todos.Todo.all();

//   ok(all.calledOnce);
//   all.restore();
// });