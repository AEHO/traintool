from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel
from endpoints_proto_datastore.ndb import EndpointsAliasProperty

class MyModel(EndpointsModel):
    attr1 = ndb.StringProperty()
    attr2 = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
    owner = ndb.UserProperty()


class Workout(EndpointsModel):
    _message_fields_schema = (
        'id','name','objective','description',)

    name        = ndb.StringProperty(indexed=True)
    objective   = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)


class Exercise(EndpointsModel):
    _message_fields_schema = (
        "id","name","body_part","equipament","execution",)

    name            = ndb.StringProperty(indexed=True)
    body_part       = ndb.StringProperty(indexed=True)
    equipament      = ndb.StringProperty(indexed=True)
    execution       = ndb.StringProperty(indexed=False)


class Day(EndpointsModel):
    _message_fields_schema = (
        "id","name","description","proper_time","exercises")

    exercises_keys  = ndb.KeyProperty(kind=Exercise, repeated=True)
    name            = ndb.StringProperty(indexed=True)
    description     = ndb.StringProperty(indexed=False)
    proper_time     = ndb.IntegerProperty(indexed=False)

    @EndpointsAliasProperty(repeated=True, property_type=Exercise.ProtoModel())
    def exercises(self):
        return ndb.get_multi(self.exercises_keys)


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