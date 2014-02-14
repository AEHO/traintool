/* jshint camelcase: false */
TrainTool.Exercise = DS.Model.extend({
	body_part:DS.attr('string'),
	comment:DS.attr('string'),
	created:DS.attr('date'),
	//day_id:DS.attr('')
	equipament:DS.attr('string'),
	execution:DS.attr('string'),
	name:DS.attr('string'),
	order:DS.attr('number'),
	reps:DS.attr('array')
});