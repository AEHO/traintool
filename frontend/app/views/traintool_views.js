TrainTool.ShowMoreButtonView = Ember.View.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-default'],
  click: function(){
    this.get('controller').send('more');
  }
});

TrainTool.TabsPaneView = Ember.CollectionView.extend({
  tagName: 'ul',
  attributeBindings: ['data-section'],
  classNames: ['nav', 'nav-tabs'],
  'data-section': 'tab',
  itemViewClass: Ember.View.extend({
    tagName:'li',
    classNames: ['title'],
    contextBinding: 'parentView.content',
    template: 'reusable/tabPane'
  })
});

TrainTool.TabsView = Ember.CollectionView.extend({
  tagName: 'ul',
  attributeBindings: ['data-section'],
  'data-section': 'tab',
  itemViewClass: Ember.View.extend({
    tagName:'li',
    classNames: ['title'],
    contextBinding: 'parentView.content',
    template: 'reusable/tabContent'
  })
});

TrainTool.DayContentView = Ember.View.extend({
  templateName : 'trains/day',
  didInsertElement : function(){
    this.$().hide();
    this.set('dayToShow', this.get('controller').get('selectedDay'));
    this.$().fadeIn(100);
    Ember.addObserver(this.get('controller'), 'selectedDay', this, this.updateContentAnimation);
  },

  updateContentAnimation : function(){
    Ember.run(this, function(){
      this.$().fadeOut(100);
      this.set('dayToShow', this.get('controller').get('selectedDay'));
      this.$().fadeIn(100);
    });
  }
});

TrainTool.TabNav = Ember.CollectionView.extend({
  tagName: 'ul',
  classNames : ['nav', 'nav-tabs'],
  contentBinding: 'controller.days',
  itemViewClass: Ember.View.extend({
    tagName : 'li',
    templateName: 'reusable/itemTab'
  })
});