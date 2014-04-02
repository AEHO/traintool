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
