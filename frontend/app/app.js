/*
 * Hey! This is an Ember application. It's built using a 
 * neuter task (see this project's Gruntfile for what that means).
 *
 * `require`s in this file will be stripped and replaced with
 * the string contents of the file they refer to wrapped in
 * a closure.
 *
 * Each file contains its own commenting, so feel free to crack
 * them open if you want more information about what is going on.
*/

/*
 * These are the dependencies for an Ember application
 * and they have to be loaded before any application code.
*/
require('dependencies/bower_components/jquery/jquery');

/*
 * Since we're precompiling our templates, we only need the
 * handlebars-runtime microlib instead of the
 * entire handlebars library and its string parsing functions.
*/
/* Added ember and ember-data */
require('dependencies/bower_components/ember/ember');
require('dependencies/bower_components/ember-data/ember-data');

/*
  this file is generated as part of the build process.
  If you haven't run that yet, you won't see it.

  It is excluded from git commits since it's a 
  generated file.
*/
require('dependencies/compiled/templates');

/*
  Creates a new instance of an Ember application and
  specifies what HTML element inside index.html Ember
  should manage for you.
*/
window.TrainTool = Ember.Application.create({
  rootElement: window.TESTING ? '#qunit-fixture' : '#traintoolapp',
  LOG_TRANSITIONS: true, // basic logging of successful transitions
  LOG_TRANSITIONS_INTERNAL: true // detailed logging of all routing steps
});

if (window.TESTING) {
  window.TrainTool.deferReadiness();
}


TrainTool.ApplicationSerializer = DS.RESTSerializer.extend({
  extract: function(store, primaryType, payload, recordId, requestType) {
    root = "items";
    payload = this.normalizePayload(primaryType, payload);
    var primaryRecord = this.normalize(primaryType, payload[root], root);
    return primaryRecord;
  },
  serializeIntoHash: function(hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  }
});

TrainTool.ApplicationAdapter = DS.RESTAdapter.extend({
  host:'https://gup-traintool.appspot.com',
  namespace:'_ah/api/gupapi/v1',
  buildURLByOperation: function(type, operation) {
    var url = [],
        host = this.get('host'),
        prefix = this.urlPrefix();

    if (type) {
      if(operation === "POST"){
        url.push(this.pathForTypeSingular(type));
      } else {
        url.push(this.pathForType(type));
      }
    }
    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  },

  pathForTypeSingular: function(type) {
    var camelized = Ember.String.camelize(type);
    return camelized;
  },

  createRecord: function(store, type, record) {
    var requestType = "POST";
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record, { includeId: true });
    console.log(data);
    return this.ajax(this.buildURLByOperation(type.typeKey, requestType),requestType, { data: data });
  },

});

/* 
 * Model layer. 
*/
require('app/models/traintool_models');

/*
 * Views layer.
 * You'll notice that there are only a few views.
 * Ember accomplishes a lot in its templates and 
 * Views are only necessary if you have view-specific
 * programming to do. 
*/

/*
 * Controller layer.
 * Controllers wrap objects and provide a place
 * to implement properties for display
 * whose value is computed from the content of the
 * controllers wrapped objects.
*/
require('app/controllers/traintool_controllers');

/* 
 * States (i.e. Routes)
 * Handles serialization of the application's current state
 * which results in view hierarchy updates. Responds to
 * actions.
*/
require('app/routes/router');