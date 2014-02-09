from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel
from endpoints_proto_datastore.ndb import EndpointsAliasProperty

# Defines all of the Models that shape the database

# //TODO
# - Provide SORT to the exercises that are returned by the day's 
#   exercises;
# - Create test to test the methods that are converting the ids to
#   the entitys keys. 

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
        order - the order of the exercise in a list of exercises that
            composes a day 
        day - the day that this exericse is listed to. If not specified
            then it is not an exercise of a day
    """
    
    _message_fields_schema = ('id', 'name', 'body_part', 'equipament',
        'execution', 'reps', 'comment', 'created', 'order', 'day_id')

    name = ndb.StringProperty(indexed=True)
    body_part = ndb.StringProperty(indexed=True)
    equipament = ndb.StringProperty(indexed=True)
    execution = ndb.StringProperty(indexed=False)
    reps = ndb.IntegerProperty(indexed=False, repeated=True)
    comment = ndb.StringProperty(indexed=False)
    created = ndb.DateTimeProperty(auto_now_add=True)
    order = ndb.IntegerProperty()

    day = ndb.KeyProperty(kind='Day')

    def day_set(self, value):
        """ 
        Receives an ID and set the day property with the ndb.Key 
        as it should.
        """
        self.day = ndb.Key('Day', int(value))

    @EndpointsAliasProperty(setter=day_set)
    def day_id(self):
        try:
            return str(self.day.id())   
        except:
            return self.day 


#CHECK IF THIS IS REALLY NEEDED
class Interval(EndpointsModel):
    """
    Interval between an Exercise and other Exercise.

    params:
        time - time in seconds till the next exercise
        comment - a comment about the interval
    """

    _message_fields_schema = ('id', 'time', 'comment', 'order',)

    time = ndb.IntegerProperty(indexed=False)
    comment = ndb.StringProperty(indexed=False)
    order = ndb.IntegerProperty(indexed=False)


class Day(EndpointsModel):
    """
    Conjunction of Exercises and Intervals that constitutes a Day of 
    training.

    params
        name - the name of the day
        description - a description about that day of training
        proper_time - in minutes, how much time does that day of
            training should last 
        workout - a key that references the workout that this day
            is linked to
        order - the order of the day in the context of a Workout
    """

    _message_fields_schema = ('id', 'name', 'description', 'proper_time',
        'workout_id',)

    name = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)
    proper_time = ndb.IntegerProperty(indexed=False)
    order = ndb.IntegerProperty(indexed=False)

    workout = ndb.KeyProperty(kind='Workout')

    @EndpointsAliasProperty(repeated=True, property_type=Exercise.ProtoModel())
    def exercises(self):
        """ 
        Returns a list of all of the Exercises that has this particular
        day as its day.
        """
        exercises_qry = Exercise.query()
        excs_keys = [excs.key for excs in 
            exercises_qry.filter(Exercise.day == self.key)]
        return ndb.get_multi(excs_keys)

    def workout_set(self, value):
        """ 
        Receives an ID and set the workout property with the ndb.Key 
        as it should.
        """
        self.workout = ndb.Key('Workout', int(value))

    @EndpointsAliasProperty(setter=workout_set)
    def workout_id(self):
        try:
            return str(self.workout.id())   
        except:
            return self.workout 


class Workout(EndpointsModel):
    """
    Conjunction of days that forms a Workout
    """
    _message_fields_schema = ('id', 'name', 'objective', 'description',
        'created', 'comment')

    name = ndb.StringProperty(indexed=True)
    objective = ndb.StringProperty(indexed=True)
    description = ndb.StringProperty(indexed=False)
    created = ndb.DateTimeProperty(auto_now_add=True)
    comment = ndb.StringProperty(indexed=False)

    @EndpointsAliasProperty(repeated=True, property_type=Day.ProtoModel())
    def days(self):
        """
        Returns a list of all of the days that are attached to this 
        workout by specifying the workout id in the workout_id field.
        """
        days_qry = Day.query()
        days_keys = [day.key for day in 
            days_qry.filter(Day.workout == self.key)]
        return ndb.get_multi(days_keys)