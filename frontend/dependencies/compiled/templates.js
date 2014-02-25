Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "reusable/header", options) : helperMissing.call(depth0, "partial", "reusable/header", options))));
  data.buffer.push("\n<article> \n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</article>");
  return buffer;
  
});

Ember.TEMPLATES["exercise"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div class=\"container\">\n	<p>Nome: ");
  stack1 = helpers._triageMustache.call(depth0, "model.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n	<p>Comentário: ");
  stack1 = helpers._triageMustache.call(depth0, "model.comment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n	<p>Criado: ");
  stack1 = helpers._triageMustache.call(depth0, "model.created", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n	<p>Repetições: ");
  stack1 = helpers._triageMustache.call(depth0, "model.reps", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n	<p>Equipamento: ");
  stack1 = helpers._triageMustache.call(depth0, "model.equipament", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n	<p>Execução: ");
  stack1 = helpers._triageMustache.call(depth0, "model.execution", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n	<p>id: ");
  stack1 = helpers._triageMustache.call(depth0, "model.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["exercises"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <li class=\"list-group-item withFooter clickable\">\n            <div class=\"row exercise-div\">\n              <div class=\"col-lg-12 text-left\">\n              ");
  stack1 = helpers['if'].call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              </div>\n              <div class=\"col-lg-12 text-center btnFooter btn-ex-details\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleDetails", {hash:{
    'on': ("click")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n                Detalhes\n              </div>\n              ");
  stack1 = helpers['if'].call(depth0, "showDetails", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n          </li>\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <span class=\"name\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span></h5>\n              ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n                <span class=\"name\"><span class=\"glyphicon glyphicon-remove form-control-feedback\"></span> Sem nome</span></h5>\n              ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                <div class=\"col-lg-12 text-left\">\n                  <p>Nome: ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                  <p>Comentário: ");
  stack1 = helpers._triageMustache.call(depth0, "comment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                  <p>Criado: ");
  data.buffer.push(escapeExpression((helper = helpers['format-date'] || (depth0 && depth0['format-date']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "created", options) : helperMissing.call(depth0, "format-date", "created", options))));
  data.buffer.push("</p>\n                  <p>Repetições: ");
  stack1 = helpers._triageMustache.call(depth0, "reps", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                  <p>Equipamento: ");
  stack1 = helpers._triageMustache.call(depth0, "equipament", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                  <p>Execução: ");
  stack1 = helpers._triageMustache.call(depth0, "execution", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                  <p>id: ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "exercise", "", options) : helperMissing.call(depth0, "link-to", "exercise", "", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                </div>\n              ");
  return buffer;
  }
function program7(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Mostrar mais");
  }

  data.buffer.push("<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-lg-7\">\n      <h2>Lista de exercícios</h2>\n      <ul class=\"list-group list\">\n        ");
  stack1 = helpers.each.call(depth0, "", {hash:{
    'itemController': ("exerciseInList")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </ul>\n      ");
  stack1 = helpers.view.call(depth0, "TrainTool.ShowMoreButtonView", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n    <div class=\"col-lg-5\">\n      <h2>Criar Exercício</h2>\n      <div class=\"form-group\">\n        <label>Nome</label>\n        <br>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'class': ("form-control"),
    'value': ("exercise-name"),
    'id': ("exercise-name")
  },hashTypes:{'class': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'class': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n      </div>\n      <div class=\"form-group\">\n      <label>Comentário</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'class': ("form-control"),
    'value': ("exercise-comment"),
    'id': ("exercise-comment")
  },hashTypes:{'class': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'class': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("</p>\n      </div>\n      <div class=\"form-group\">\n      <label>Equipamento</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'class': ("form-control"),
    'value': ("exercise-equipament"),
    'id': ("exercise-equipament")
  },hashTypes:{'class': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'class': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</p>\n      </div>\n      <div class=\"form-group\">\n      <label>Execução</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'class': ("form-control"),
    'value': ("exercise-execution"),
    'id': ("exercise-execution")
  },hashTypes:{'class': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'class': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</p>\n      </div>\n      <div class=\"form-group\">\n      <label>Repetições</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'class': ("form-control"),
    'value': ("exercise-reps"),
    'id': ("exercise-reps")
  },hashTypes:{'class': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'class': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</p>\n      </div>\n      <div class=\"form-group\">\n      <label>Parte do Corpo</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'class': ("form-control"),
    'value': ("exercise-bodypzart"),
    'id': ("exercise-bodypart")
  },hashTypes:{'class': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'class': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</p>\n      </div>\n      <button id=\"exercise-create\" class=\"btn btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createExercise", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Criar exercício</button>\n    </div>\n  </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "reusable/header", options) : helperMissing.call(depth0, "partial", "reusable/header", options))));
  data.buffer.push("\n<article role=\"header\">\n  <div id=\"mainCarousel\" class=\"carousel slide\" data-ride=\"darousel\">\n    <ol class=\"carousel-indicators\">\n      <li data-target=\"#mainCarousel\" data-slide-to=\"0\" class=\"active\"></li>\n      <li data-target=\"#mainCarousel\" data-slide-to=\"1\"></li>\n      <li data-target=\"#mainCarousel\" data-slide-to=\"2\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div class=\"item active\">\n        <img src=\"\" data-src=\"holder.js/900x500/auto/#777:#7a7a7a/text:First slide\" alt=\"Primeiro slide\">\n        <div class=\"container\">\n          <div class=\"carousel-caption\">\n            <h1>Crie e Compartilhe seus treinos</h1>\n            <p>Mostre do que é capaz!</p>\n            <button class=\"btn btn-primary big\">Criar Treino</button>\n            <hr>\n          </div>\n        </div>\n      </div>\n      <div class=\"item\">\n        <img data-src=\"holder.js/900x500/auto/#777:#7a7a7a/text:First slide\" alt=\"Segundo Slide\">\n        <div class=\"container\">\n          <div class=\"carousel-caption\">\n            <h1>Crie e Comartilhe seus treinos!</h1>\n            <p>Crie e compartilhe agora mesmo</p>\n          </div>\n        </div>\n      </div>\n      <div class=\"item\">\n        <img data-src=\"holder.js/900x500/auto/#777:#7a7a7a/text:First slide\" alt=\"Terceiro Slide\">\n        <div class=\"container\">\n          <div class=\"carousel-caption\">\n            <h1>Crie e Comartilhe seus treinos!</h1>\n            <p>Crie e compartilhe agora mesmo</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <a class=\"left carousel-control\" href=\"#mainCarousel\" data-slide=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span></a>\n    <a class=\"right carousel-control\" href=\"#mainCarousel\" data-slide=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span></a>\n  </div>\n</article>\n<div class=\"container main-container\">\n  <article>\n    <div class=\"row\">\n      <div class=\"col-lg-4 text-center\">\n        <h2>Top Treinos</h2>\n        <ul class=\"list-unstyled\">\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n        </ul>       \n      </div>\n      <div class=\"col-lg-4 text-center\">\n        <h2>Novos Treinos</h2>\n        <ul class=\"list-unstyled\">\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n        </ul>\n      </div>\n      <div class=\"col-lg-4 text-center\">\n        <h2>Top Users</h2>\n        <ul class=\"list-unstyled\">\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </article>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["reusable/header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("GymUp");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("<i class=\"fa fa-home\"></i> Home");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Lista de exercícios");
  }

  data.buffer.push("<header>\n  <nav class=\"navbar navbar-fixed-top navbar-default\" role=\"navigation\">\n    <div class=\"container\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-ex1-collapse\">\n          <span class=\"sr-only\">Esconder barra de navegação</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("navbar-brand")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </div>\n\n      <!-- Collect the nav links, forms, and other content for toggling -->\n      <div class=\"collapse navbar-collapse navbar-ex1-collapse\" id=\"menu\">\n        <ul class=\"nav navbar-nav\">\n          <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n          <!--li><a href=\"\" id=\"index_nav_btn\"><i class=\"fa fa-compass\"></i> Explorar</a></li-->\n        </ul>\n        <ul class=\"nav navbar-nav\">\n          <li class=\"dropdown\">\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"fa fa-bars\"></i> Explore <b class=\"caret\"></b></a>\n            <ul class=\"dropdown-menu\">\n              <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "exercises", options) : helperMissing.call(depth0, "link-to", "exercises", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n            </ul>\n          </li>\n        </ul>\n      </div><!-- /.navbar-collapse -->\n    </div>\n  </nav>\n</header>");
  return buffer;
  
});