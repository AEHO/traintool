from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel
from endpoints_proto_datastore.ndb import EndpointsAliasProperty

# Defines all of the Models that shape the database

class Exercise(EndpointsModel):
    """
    Represents the exercise per-se workout-independent

    params:
        name - the name of that exercise 
        body_part - the name of the body part that the exercises
            most uses
        equipament - the name of  the equipament used for the execution
            of the exercise
        execution - how to execute the exercise 
        created - the timestamp of the creation of the exercise 
        reps - a list of integers that represents the number of
            repetitions to be done when performing the exercise
        comment - a commentary about the exercise 
    """
    
    _message_fields_schema = ('id', 'name', 'body_part', 'equipament',
        'execution', 'reps', 'comment', 'created')

    name = ndb.StringProperty(indexed=True)
    body_part = ndb.StringProperty(indexed=True)
    equipament = ndb.StringProperty(indexed=True)
    execution = ndb.StringProperty(indexed=False)
    reps = ndb.IntegerProperty(indexed=False, repeated=True)
    comment = ndb.StringProperty(indexed=False)
    created = ndb.DateTimeProperty(auto_now_add=True)


class Interval(EndpointsModel):
    """
    Interval between an Exercise and other Exercise.

    params:
        time - time in seconds till the next exercise
        comment - a comment about the interval
    """
    time = ndb.IntegerProperty(indexed=False)
    comment = ndb.StringProperty(indexed=False)


class Day(EndpointsModel):
    """
    Conjunction of Exercises and Intervals that constitutes a Day of 
    training.

    params
        name - the name of the day
        description - a description about that day of training
        proper_time - in minutes, how much time does that day of
            training should last 
        exercises_and_interval - a list containing the keys to the
            exercises and intervals that constitutes the day of
            training
    """

    name = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)
    proper_time = ndb.IntegerProperty(indexed=False)
    exercises_and_interval = ndb.KeyProperty(repeated=True)


class Workout(EndpointsModel):
    """
    Conjunction of days that forms a Workout
    """

    name = ndb.StringProperty(indexed=True)
    objective = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)
    created = ndb.DateTimeProperty(auto_now_add=True)
    days_keys = ndb.KeyProperty(kind=Day, repeated=True)



class MyModel(EndpointsModel):
    attr1 = ndb.StringProperty()

    def attr2_set(self, value):
        self._attr2 = value

    # Since no property_type was passed it will assume that it wants
    # protorpc.messages.StringField
    @EndpointsAliasProperty(setter=attr2_set)
    def attr2(self):
        return getattr(self, '_attr2', None)