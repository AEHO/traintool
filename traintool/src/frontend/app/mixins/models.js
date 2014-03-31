/*jslint es5: true */
/*global console */

TrainTool.CopyAndSave = Ember.Mixin.create({
  getCopy : function(){
    var thisTypeKey = this.get('constructor.typeKey');
    var thisCopy = this.store.createRecord(thisTypeKey, this.toJSON());
    return thisCopy;
  },

  // Return a sequence of promises to call saveCopyAndChilds
  // for all childrens of this model.
  // @param {parentModel} The model instance to save childrens models in
  // @return sequence of promises to save all models inside it
  // @method childrensSequenceSavePromises
  childrensSequenceSavePromises : function(savedCopy){
    var that = this;
    return this.eachRelationship(function(key, relationship) {
      if(relationship.kind === 'hasMany'){
        that.get(key).reduce(function(sequence, childPromise){
          return sequence.then(function(){
            return childPromise;
          }).then(function(child){
            var childCopy = child.getCopy();
            child.saveCopyAndChilds(childCopy, savedCopy);
          });
        }, Ember.RSVP.Promise.resolve());
      }
    });
  },


  // Save a copy of the current model and call
  // childrensSequenceSavePromises to save the childrens
  // models.
  // @param {parentModel} the parent model of this
  // @return promise to save all models inside it
  // @method saveModelAndChilds
  saveCopyAndChilds : function(copy, parentModel){
    var that = this;
    // If parentModel is defined make it parent of this model
    if(parentModel){
      var modelTypeKey = parentModel.get('constructor.typeKey');
      copy.set(modelTypeKey + "_id", parentModel);
    }

    // Save the copy of this model and add a sequence of promises to save the
    // children models when the save promise is resolved
    return copy.save().catch(function(err){
      console.log('Error during the save of ' + copy.get('constructor.typeKey') + ' with id '+ copy.id + "\n" + err);
    }).then(function(savedCopy){
      return that.childrensSequenceSavePromises(savedCopy);
    });
  },

  copyModelAndChildrenAndSaveRecursivelyWithPromises: function(){
    var copy = this.getCopy();

    return this.saveCopyAndChilds(copy).then(function(){
      return copy;
    });
  }
});