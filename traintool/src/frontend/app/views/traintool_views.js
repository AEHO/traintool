TrainTool.ApplicationView = Ember.View.extend({
  didInsertElement: function() {
    $("#loading").remove();
  }
});

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
  delay: 200,
  didInsertElement: function () {
    var el = this.$();
    var numberDays = this.get('controller.workout_id.days.length');
    if(numberDays > 1){
      el.hide()
        .delay(this.delay-1)
        .fadeIn(this.delay);
    } else {
      el.hide()
        .fadeIn(this.delay);
    }
    this._super();
  },

  willDestroyElement: function() {
    var clone = this.$().clone();
    this.$().parent().append(clone);
    clone.fadeOut(this.delay);
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

TrainTool.TextFieldTypeahead = Ember.TextField.extend({
    didInsertElement : function(){
      var dataType = this.get('data-type');
      var data = this.get('data-source');
      var that = this;
      this.$().typeahead(null, {
        name: dataType,
        displayKey: 'name',
        source: data.ttAdapter()
      });

      this.$().bind('typeahead:selected', function(obj, datum, name) { 
        that.set('comment', datum.comment);
        that.set('execution', datum.execution);
      });
    }
});
