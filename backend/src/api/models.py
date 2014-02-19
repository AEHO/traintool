""" Defines the structure for the data in the Datastore. """

from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel
from endpoints_proto_datastore.ndb import EndpointsAliasProperty


class Exercise(EndpointsModel):

    """
    Represents the exercise per-se workout-independent.

    params:
        name - the name of that exercise
        body_part - the name of the body part that the exercises
            most uses
        equipment - the name of  the equipment used for the execution
            of the exercise
        execution - how to execute the exercise
        created - the timestamp of the creation of the exercise
        reps - a list of integers that represents the number of
            repetitions to be done when performing the exercise
        comment - a commentary about the exercise
        sequency - the sequency of the exercise in a list of exercises
            that composes a day
        day - the day that this exericse is listed to. If not specified
            then it is not an exercise of a day

    """

    _message_fields_schema = (
        'id', 'name', 'body_part', 'equipment',
        'execution', 'reps', 'comment', 'created', 'sequency', 'day_id',
    )

    name = ndb.StringProperty(indexed=True)
    body_part = ndb.StringProperty(indexed=True)
    equipment = ndb.StringProperty(indexed=True)
    execution = ndb.TextProperty()
    reps = ndb.IntegerProperty(indexed=False, repeated=True)
    comment = ndb.TextProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
    sequency = ndb.IntegerProperty(indexed=True)

    day = ndb.KeyProperty(kind='Day')  # just used internaly

    def day_set(self, value):
        """ Sets the key on the day given an Id. """
        self.day = ndb.Key('Day', int(value))

    @EndpointsAliasProperty(setter=day_set)
    def day_id(self):
        """Field representing the ID of the day's key."""
        try:
            return str(self.day.id())
        except:
            return self.day


class ExerciseCollection(EndpointsModel):

    """Container for creating the ProtoRPC messages of Exercise."""

    _message_fields_schema = ('id', 'items',)
    items = ndb.LocalStructuredProperty(Exercise, repeated=True)


# CHECK IF THIS IS REALLY NEEDED
class Interval(EndpointsModel):

    """
    Interval between an Exercise and other Exercise.

    params:
        time - time in seconds till the next exercise
        comment - a comment about the interval

    """

    _message_fields_schema = ('id', 'time', 'comment', 'sequency',)

    time = ndb.IntegerProperty(indexed=False)
    comment = ndb.StringProperty(indexed=False)
    sequency = ndb.IntegerProperty(indexed=False)


class Day(EndpointsModel):

    """
    A Day which is formed by Exercises and Intervals.

    params:
        name - the name of the day
        description - a description about that day of training
        proper_time - in minutes, how much time does that day of
            training should last
        workout - a key that references the workout that this day
            is linked to
        sequency - the sequency of the day in the context of a Workout

    """

    _message_fields_schema = ('id', 'name', 'description', 'proper_time',
                              'workout_id',)

    name = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)
    proper_time = ndb.IntegerProperty(indexed=False)
    sequency = ndb.IntegerProperty(indexed=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

    workout = ndb.KeyProperty(kind='Workout')  # just used internaly

    @EndpointsAliasProperty(repeated=True, property_type=Exercise.ProtoModel())
    def exercises(self):
        """Lists all the Exercises the day has."""
        exercises_qry = Exercise.query(Exercise.day == self.key).\
            order(Exercise.sequency)
        excs_keys = [excs.key for excs in exercises_qry]

        print excs_keys

        return ndb.get_multi(excs_keys)

    def workout_set(self, value):
        """Sets the key of the workout given an ID."""
        self.workout = ndb.Key('Workout', int(value))

    @EndpointsAliasProperty(setter=workout_set)
    def workout_id(self):
        """Field representing the ID of the workout key."""
        try:
            return str(self.workout.id())
        except:
            return self.workout


class DayCollection(EndpointsModel):

    """Container for creating the ProtoRPC messages of Day."""

    _message_fields_schema = ('id', 'items',)
    items = ndb.LocalStructuredProperty(Day, repeated=True)


class Workout(EndpointsModel):

    """Conjunction of days that forms a Workout."""

    _message_fields_schema = ('id', 'name', 'objective', 'description',
                              'created', 'comment')

    name = ndb.StringProperty(indexed=True)
    objective = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)
    created = ndb.DateTimeProperty(auto_now_add=True)
    comment = ndb.StringProperty(indexed=False)

    @EndpointsAliasProperty(repeated=True, property_type=Day.ProtoModel())
    def days(self):
        """List of days attached to the workout."""
        days_qry = Day.query(Day.workout == self.key).\
            order(Day.sequency)
        days_keys = [day.key for day in
                     days_qry.filter(Day.workout == self.key)]
        return ndb.get_multi(days_keys)
