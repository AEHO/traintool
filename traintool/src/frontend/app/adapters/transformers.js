// Use the raw value passed to the model
TrainTool.ArrayTransform = DS.Transform.extend({
  serialize:function(value){
    return value;
  },
  deserialize:function(value){
    return value;
  }
});

Ember.Handlebars.helper('format-date', function(date){
    return moment(date).fromNow(true);
  });

Ember.Handlebars.helper('joinWithX', function(list){
	try{
		return list.join('x');
	}catch(err){
		return '';
	}
});
