Ember.TEMPLATES["todos_list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n    <li ");
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editTodo", "todo", {hash:{
    'on': ("doubleClick")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': (":view todo.completed:completed todo.editing:editing")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      ");
  hashTypes = {};
  stack1 = helpers.unless.call(depth0, "todo.editing", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </li>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n        <input type=\"checkbox\" \n               class=\"toggle\" \n               ");
  hashTypes = {'checked': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'checked': ("todo.completed")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n               ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleTodo", "todo", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n         >\n        <label>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "todo.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</label>\n        <button ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeTodo", "todo", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"destroy\" ></button>\n      ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n        ");
  hashTypes = {'todoBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Todos.EditTodoTextField", {hash:{
    'todoBinding': ("todo")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      ");
  return buffer;
  }

  data.buffer.push("<!-- \n  actions on this template\n\n  editTodo, toggleTodo, removeTodo\n\n  will trigger a matching action name on\n  the template's controller (FilteredTodosController)\n  with the specific todo as an argument.\n\n  If the action is not implemented on the controller\n  the event will bubble up to the application's\n  current state (i.e. route)\n-->\n<ul id=\"todo-list\">\n  ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "todo", "in", "controller", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});