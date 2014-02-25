TrainTool.ShowMoreButtonView = Ember.View.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-default'],
  click: function(){
    this.get('controller').send('more');
  }
})