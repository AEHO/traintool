/* jshint camelcase: false */
TrainTool.Exercise = DS.Model.extend({
	body_part:DS.attr('string'),
	comment:DS.attr('string'),
	created:DS.attr('date'),
	equipament:DS.attr('string'),
	execution:DS.attr('string'),
	name:DS.attr('string'),
	reps:DS.attr('array'),
	//Used to chose field to be used to order the elements.
	order:DS.attr('string'),
});