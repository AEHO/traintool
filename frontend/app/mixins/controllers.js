TrainTool.NamesProperties = Ember.Mixin.create({
	// It gives the name when it's defined and a default name
	// when the name property is empty or undefined
	// @method displayName
	// @return 'Sem nome' when name property is undefined or empty or name
	// when it's defined and not empty.
  displayedName : function(){
    var name = this.get('name');
    return name === undefined || name === '' ? 'Sem nome' : name;
  }.property('name'),


  // It return if the controller have the name proeprty defined and no empty
  // @return bool
  withoutName : function(){
    var name = this.get('name');
    return name === undefined || name === '';
  }.property('name')
});