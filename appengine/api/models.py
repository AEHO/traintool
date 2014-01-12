from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel


class Workout(EndpointsModel):
    _message_fields_schema = (
        'id','name','objective','description')

    name        = ndb.StringProperty(indexed=True)
    objective   = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)


class Day(EndpointsModel):
    name            = ndb.StringProperty(indexed=True)
    description     = ndb.StringProperty(indexed=False)
    proper_time     = ndb.IntegerProperty(indexed=False)


class Exercise(EndpointsModel):
    name            = ndb.StringProperty(indexed=True)
    body_part       = ndb.StringProperty(indexed=True)
    equipament      = ndb.StringProperty(indexed=True)
    execution       = ndb.StringProperty(indexed=False)


class ExercisesLink(EndpointsModel):
    key_exercise_0  = ndb.StringProperty(indexed=True)
    key_exercise_1  = ndb.StringProperty(indexed=True)
    exercise_type   = ndb.StringProperty(indexed=True)
    rest_time       = ndb.IntegerProperty(indexed=True)
    comment         = ndb.StringProperty(indexed=False)


class DayWorkout(EndpointsModel):
    key_day         = ndb.StringProperty(indexed=True)
    key_workout     = ndb.StringProperty(indexed=True)


class ExerciseDay(EndpointsModel):
    key_exercise    = ndb.StringProperty(indexed=True)
    key_day         = ndb.StringProperty(indexed=True)
    series          = ndb.StringProperty(indexed=False)