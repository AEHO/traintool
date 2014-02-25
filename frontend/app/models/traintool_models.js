/* jshint camelcase: false */
TrainTool.Exercise = DS.Model.extend({
	body_part:DS.attr('string'),
	comment:DS.attr('string'),
	created:DS.attr('date'),
	equipament:DS.attr('string'),
	execution:DS.attr('string'),
	name:DS.attr('string'),
	reps:DS.attr('array'),
	pageToken:DS.attr('string')
});