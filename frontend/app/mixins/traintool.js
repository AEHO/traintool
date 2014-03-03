TrainTool.NamesProperties = Ember.Mixin.create({
  displayedName : function(){
    var name = this.get('name');
    return name === undefined || name === '' ? 'Sem nome' : name;
  }.property('name'),

  withoutName : function(){
    var name = this.get('name');
    return name === undefined || name === '';
  }.property('name')
});