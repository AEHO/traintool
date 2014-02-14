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
require('app/base_app');

/*
  Creates a new instance of an Ember application and
  specifies what HTML element inside index.html Ember
  should manage for you.
*/
window.TrainTool = Ember.Application.create({
  rootElement: '#traintoolapp'
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

/*
 * Get the RESTAdapeter modified for the triantool
 * REST API.
 */
require('app/adapters/traintool_rest');
/*
 *	Add the transformers to handle custom model attrs
 */
require('app/adapters/transformers');