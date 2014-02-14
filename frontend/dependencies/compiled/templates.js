Ember.TEMPLATES["exercises"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n						<li>\n							<div>\n								<p>Nome: ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n								<p>Comentário: ");
  stack1 = helpers._triageMustache.call(depth0, "comment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n								<p>Criado: ");
  stack1 = helpers._triageMustache.call(depth0, "created", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n								<p>Repetições: ");
  stack1 = helpers._triageMustache.call(depth0, "reps", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n								<p>Equipamento: ");
  stack1 = helpers._triageMustache.call(depth0, "equipament", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n								<p>Execução: ");
  stack1 = helpers._triageMustache.call(depth0, "execution", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n								<p>id: ");
  stack1 = helpers._triageMustache.call(depth0, "id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n							</div>\n						</li>\n					");
  return buffer;
  }

  data.buffer.push("<article>\n	<div class=\"container\">\n		<div class=\"row\">\n			<div class=\"col-lg-4\">\n				<h2>Lista de exercícios</h2>\n				<ul>\n					");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</ul>\n			</div>\n			<div class=\"col-lg-8\">\n				<h2>Criar Exercício</h2>\n				<p>Nome<br>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'valueBinding': ("model.name"),
    'value': ("exName"),
    'id': ("exName")
  },hashTypes:{'valueBinding': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'valueBinding': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</p>\n				<p>Comentário<br>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'valueBinding': ("model.comment"),
    'value': ("exComment"),
    'id': ("exComment")
  },hashTypes:{'valueBinding': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'valueBinding': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</p>\n				<p>Equipamento<br>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'valueBinding': ("model.equipament"),
    'value': ("exEquipament"),
    'id': ("exEquipament")
  },hashTypes:{'valueBinding': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'valueBinding': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</p>\n				<p>Execução<br>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'valueBinding': ("model.execution"),
    'value': ("exExecution"),
    'id': ("exExecution")
  },hashTypes:{'valueBinding': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'valueBinding': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</p>\n				<p>Repetições<br>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'valueBinding': ("model.reps"),
    'value': ("exReps"),
    'id': ("exReps")
  },hashTypes:{'valueBinding': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'valueBinding': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</p>\n				<button id=\"exCreate\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createExercise", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Criar exercício</button>\n			</div>\n		</div>\n	</div>\n</article>");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<header>\n  <div class=\"navbar-wrapper\">\n    <div class='container'>\n      <nav class=\"navbar navbar-static-top navbar-default\" role=\"navigation\">\n        <div class=\"container\">\n          <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-ex1-collapse\">\n              <span class=\"sr-only\">Esconder barra de navegação</span>\n              <span class=\"icon-bar\"></span>\n              <span class=\"icon-bar\"></span>\n              <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"/\">GymUp</a>\n          </div>\n\n          <!-- Collect the nav links, forms, and other content for toggling -->\n          <div class=\"collapse navbar-collapse navbar-ex1-collapse\" id=\"menu\">\n            <ul class=\"nav navbar-nav\">\n              <li><a href=\"/\" id=\"index_nav_btn\"><i class=\"fa fa-home\"></i> Home</a></li>\n              <li><a href=\"\" id=\"index_nav_btn\"><i class=\"fa fa-compass\"></i> Explorar</a></li>\n            </ul>\n            <form class=\"navbar-form navbar-right hide\" role=\"login\" id=\"login_nav_form\">\n              <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"login\">\n              </div>\n              <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"senha\">\n              </div>\n              <button type=\"submit\" class=\"btn btn-default\">Login</button>\n            </form>\n            <ul class=\"nav navbar-nav\">\n              <li class=\"dropdown\">\n                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"fa fa-bars\"></i> Menu <b class=\"caret\"></b></a>\n                <ul class=\"dropdown-menu\">\n                  <li><a href=\"#\">Criar novo treino</a></li>\n                  <li><a href=\"#\">Perfil</a></li>\n                  <li><a href=\"#\">Convidar amigo</a></li>\n                </ul>\n              </li>\n            </ul>\n            <ul class=\"nav navbar-nav navbar-right\">\n              <li>\n                <a href=\"#\" id=\"login_toggle\">Login</a>\n              </li>\n            </ul>\n          </div><!-- /.navbar-collapse -->\n        </div>\n      </nav>\n    </div>\n  </div>\n  <div id=\"mainCarousel\" class=\"carousel slide\" data-ride=\"darousel\">\n    <ol class=\"carousel-indicators\">\n      <li data-target=\"#mainCarousel\" data-slide-to=\"0\" class=\"active\"></li>\n      <li data-target=\"#mainCarousel\" data-slide-to=\"1\"></li>\n      <li data-target=\"#mainCarousel\" data-slide-to=\"2\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div class=\"item active\">\n        <img src=\"\" data-src=\"holder.js/900x500/auto/#777:#7a7a7a/text:First slide\" alt=\"Primeiro slide\">\n        <div class=\"container\">\n          <div class=\"carousel-caption\">\n            <h1>Crie e Compartilhe seus treinos</h1>\n            <p>Mostre do que é capaz!</p>\n            <button class=\"btn btn-primary big\">Criar Treino</button>\n            <hr>\n          </div>\n        </div>\n      </div>\n      <div class=\"item\">\n        <img data-src=\"holder.js/900x500/auto/#777:#7a7a7a/text:First slide\" alt=\"Segundo Slide\">\n        <div class=\"container\">\n          <div class=\"carousel-caption\">\n            <h1>Crie e Comartilhe seus treinos!</h1>\n            <p>Crie e compartilhe agora mesmo</p>\n          </div>\n        </div>\n      </div>\n      <div class=\"item\">\n        <img data-src=\"holder.js/900x500/auto/#777:#7a7a7a/text:First slide\" alt=\"Terceiro Slide\">\n        <div class=\"container\">\n          <div class=\"carousel-caption\">\n            <h1>Crie e Comartilhe seus treinos!</h1>\n            <p>Crie e compartilhe agora mesmo</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <a class=\"left carousel-control\" href=\"#mainCarousel\" data-slide=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span></a>\n    <a class=\"right carousel-control\" href=\"#mainCarousel\" data-slide=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span></a>\n  </div>\n</header>\n<div class=\"container main-container\">\n  <article>\n    <div class=\"row\">\n      <div class=\"col-lg-4 text-center\">\n        <h2>Top Treinos</h2>\n        <ul class=\"list-unstyled\">\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n        </ul>       \n      </div>\n      <div class=\"col-lg-4 text-center\">\n        <h2>Novos Treinos</h2>\n        <ul class=\"list-unstyled\">\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n        </ul>\n      </div>\n      <div class=\"col-lg-4 text-center\">\n        <h2>Top Users</h2>\n        <ul class=\"list-unstyled\">\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n          <li class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">Treino do Arnold</h4>\n            </div>\n            <div class=\"panel-body\">\n              <p>Treino histórico promovido pelo maior fisiculturista de todos os tempos.</p>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </article>\n</div>");
  
});