from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel
from endpoints_proto_datastore.ndb import EndpointsAliasProperty

class MyModel(EndpointsModel):
    attr1 = ndb.StringProperty()
    attr2 = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
    owner = ndb.UserProperty()


class Exercise(EndpointsModel):
    """ Represents the exercise per-se workout-independent """
    _message_fields_schema = (
        'id', 'name', 'body_part', 'equipament', 'execution','created',
        'owner',)

    name = ndb.StringProperty(indexed=True)
    body_part = ndb.StringProperty(indexed=True)
    equipament = ndb.StringProperty(indexed=True)
    execution = ndb.StringProperty(indexed=False)

    created = ndb.DateTimeProperty(auto_now_add=True)
    owner = ndb.UserProperty()


class ExerciseDay(EndpointsModel):
    """ The Exercise when is workout-dependent. i.e, it needs to 
        specify the repetitions and comments specific to that 
        workout 

        fields:
            reps -- repetitions of the exercise in a list of ints
            comment -- comment specific to the exercise on a workout
    """

    exercise_key = ndb.KeyProperty(kind=Exercise,indexed=True)
    reps = ndb.IntegerProperty(indexed=False, repeated=True)
    comment = ndb.StringProperty(indexed=False)
    created = ndb.DateTimeProperty(auto_now_add=True)
    owner = ndb.UserProperty()


class ExercisesLink(EndpointsModel):
    """ Conjunction of ExerciseDays that forms a special type of training
        inside the workout. 

        fields:
            exercises_days_keys -- keys from the ExerciseDays 
            rest_times -- list of ints that tells the rest time for the
                interval between to ExerciseDays
            link_type -- name of the type of the special training inside the 
                workout.
    """

    exercises_days_keys = ndb.KeyProperty(kind=ExerciseDay,repeated=True)
    rest_times = ndb.IntegerProperty(indexed=False, repeated=True)
    link_type = ndb.StringProperty(indexed=True)
    comment = ndb.StringProperty(indexed=False)


class Day(EndpointsModel):
    """ Conjunction of ExercisesLinks that forms a Day of training. """

    name = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)
    proper_time = ndb.IntegerProperty(indexed=False)

    exercises_links_keys = ndb.KeyProperty(kind=Exercise, repeated=True)


class Workout(EndpointsModel):
    """ Conjunction of days that forms a Workout """

    name        = ndb.StringProperty(indexed=True)
    objective   = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)
    created = ndb.DateTimeProperty(auto_now_add=True)
    owner = ndb.UserProperty()

    days_keys = ndb.KeyProperty(kind=Day, repeated=True)
