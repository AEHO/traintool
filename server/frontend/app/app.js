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
 * Set moment language to pt-br globaly
 */
moment.lang('pt-br');


/*
 * Since we're precompiling our templates, we only need the
 * handlebars-runtime microlib instead of the
 * entire handlebars library and its string parsing functions.
*/

require('dependencies/compiled/templates');

/*
  Creates a new instance of an Ember application and
  specifies what HTML element inside index.html Ember
  should manage for you.
*/
window.TrainTool = Ember.Application.create({
  rootElement: window.TESTING ? '#ember-testing':'#traintoolapp',
  LOG_TRANSITIONS: true
});

console.log(TrainTool);
/*
 * Mixins to act in the application
 */
require('app/mixins/controllers');
require('app/mixins/models');

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

require('app/views/traintool_views');

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

/*
 * Get the adapters. They are two, a localstorage for tests and a REST adapter modified
 * for the traintool REST Api.
 */
require('app/adapters/traintool');
/*
 *	Add the transformers to handle custom model attrs
 */
require('app/adapters/transformers');

/*
 * Misc folder holds definitions that don't fit in the others
 * project folders
 */

require('app/misc/main');

/*
  this file is generated as part of the build process.
  If you haven't run that yet, you won't see it.

  It is excluded from git commits since it's a 
  generated file.
*/