/*jslint es5: true */
/*global console */
TrainTool.CopyAndSave = Ember.Mixin.create({
  // Return a sequence of promises to call saveModelAndChilds
  // for all childrens of this model.
  // @param {parentModel} The model instance to save childrens models in
  // @return sequence of promises to save all models inside it
  // @method childrensSequenceSavePromises
  childrensSequenceSavePromises : function(parentModel){
    var that = this;
    return this.eachRelationship(function(key, relationship) {
      if(relationship.kind === 'hasMany'){
        that.get(key).reduce(function(sequence, childPromise){
          return sequence.then(function(){
            return childPromise;
          }).then(function(child){
            child.saveModelAndChilds(parentModel);
          });
        }, Ember.RSVP.Promise.resolve());
      }
    });
  },


  // Save a copy of the current model and of all it's childrens
  // and return the save promise.
  // @param {parentModel} the parent model of this
  // @return save promise
  // @method saveModelAndChilds
  saveModelAndChilds : function(parentModel){
    var that = this;
    var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
    var thisTypeKey = this.get('constructor.typeKey');
    var thisPluralized = inflector.pluralize(thisTypeKey);

    // Make a copy of this model
    var thisCopy = this.store.createRecord(thisTypeKey, this.toJSON());

    // If parentModel is defined make it parent of this model
    if(parentModel){
      var modelTypeKey = parentModel.get('constructor.typeKey');
      thisCopy.set(modelTypeKey + "_id", parentModel);
    }

    // Save the copy of this model and add a sequence of promises to save the
    // children models when the save promise is resolved
    return thisCopy.save().catch(function(err){
      console.log('Error during the save of ' + thisTypeKey + ' with id '+ thisCopy.id + "\n" + err);
    }).then(that.childrensSequenceSavePromises);
    
  },
});