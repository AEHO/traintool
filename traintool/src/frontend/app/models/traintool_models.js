/* jshint camelcase: false */
TrainTool.Exercise = DS.Model.extend(TrainTool.CopyAndSave, {
  body_part:DS.attr('string'),
  comment:DS.attr('string'),
  created:DS.attr('date'),
  equipment:DS.attr('string'),
  execution:DS.attr('string'),
  name:DS.attr('string'),
  reps:DS.attr('array'),
  day_id: DS.belongsTo('day')
});

TrainTool.Day = DS.Model.extend(TrainTool.CopyAndSave, {
  name: DS.attr('string'),
  created: DS.attr('date'),
  description: DS.attr('string'),
  workout_id: DS.belongsTo('workout'),
  exercises: DS.hasMany('exercise', {async: true, embedded : 'always'}),
  proper_time : DS.attr('number')
});

TrainTool.Workout = DS.Model.extend(TrainTool.CopyAndSave, {
  name:DS.attr('string'),
  comment:DS.attr('string'),
  created:DS.attr('date'),
  description:DS.attr('string'),
  objective:DS.attr('string'),
  days:DS.hasMany('day', {async: true, embedded : 'always'})
});