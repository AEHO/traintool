"""Methods ran by the API."""

import endpoints

from google.appengine.ext import ndb
from protorpc import messages
from protorpc import message_types
from protorpc import remote
from endpoints_proto_datastore import utils as epd_utils
from api.models import Exercise
from api.models import Interval
from api.models import Day
from api.models import Workout


class ExerciseMsg(messages.Message):

    """A message that represents the Exercise entity."""

    # //TODO
    #   -   THINK ABOUT THE day keyProperty and how to
    #       properly include an day_id setter
    #   -   Search more on the Fields of the message
    #   -   Understand the ProtoRPC

    name = messages.StringField(1)
    body_part = messages.StringField(2)
    equipament = messages.StringField(3)
    execution = messages.BytesField(4)
    reps = messages.IntegerField(5, repeated=True)
    comment = messages.BytesField(6)
    created = messages.StringField(7)
    sequency = messages.IntegerField(8)

    day_id = messages.StringField(9)
    id = messages.StringField(10)


class ExerciseMsgCollection(messages.Message):

    """Container for multiple ExerciseMsg ProtoRPC message."""

    items = messages.MessageField(ExerciseMsg, 1, repeated=True)


@endpoints.api(name="gupapi", version="v1", description="GymUP Open Api",
               allowed_client_ids=[endpoints.API_EXPLORER_CLIENT_ID],
               audiences=[endpoints.API_EXPLORER_CLIENT_ID])
class GupApi(remote.Service):

    """GymUP TrainTool Open API v1."""

    @Exercise.query_method(query_fields=('limit', 'pageToken', 'order',
                                         'name', 'body_part', 'equipament',
                                         'created',),
                           path='exercises',
                           http_method="GET",
                           name='exercises.list')
    def ExercisesList(self, query):
        """Queries the entire DB for retrieving the Exercises."""
        return query

    @endpoints.method(ExerciseMsgCollection, ExerciseMsgCollection,
                      path='exercises', http_method='POST',
                      name='exercises.listpost')
    def ExercisesListPost(self, request):
        """Receives a POST containing a list of Exercises."""
        exercises = []
        for item in request.items:
            exercise = Exercise()
            exercise.name = getattr(item, 'name', None)
            exercise.body_part = getattr(item, 'body_part', None)
            exercise.equipament = getattr(item, 'equipament', None)
            exercise.execution = getattr(item, 'execution', None)
            exercise.reps = getattr(item, 'reps', None)
            exercise.comment = getattr(item, 'comment', None)
            if item.created:
                exercise.created = epd_utils.\
                    DatetimeValueFromString(getattr(item, 'created', ''))
            exercise.sequency = getattr(item, 'sequency', None)
            if item.day_id:
                exercise.day = ndb.Key('Day', int(item.day_id))
            exercises.append(exercise)

        inserted = ndb.put_multi(exercises)

        resp = [ExerciseMsg(id=str(key.id())) for key in inserted]
        return ExerciseMsgCollection(items=resp)

    @Exercise.method(request_fields=('id',),
                     path="exercise",
                     http_method="GET",
                     name="exercise.get")
    def ExerciseGet(self, exercise):
        """Queries the DB for an Exercise with the given ID."""
        if not exercise.from_datastore:
            raise endpoints.NotFoundException('exercise not found')
        return exercise

    @Exercise.method(path='exercise',
                     http_method='POST',
                     name='exercise.post')
    def ExercisePost(self, exercise):
        """Creates an Exercise in the Db."""
        exercise.put()
        return exercise

    @Interval.query_method(query_fields=('limit', 'pageToken',),
                           path='intervals',
                           http_method='GET',
                           name='intervals.list')
    def IntervalsList(self, query):
        """Returns a list containing all the intervals."""
        return query

    @Interval.method(path='interval',
                     http_method='POST',
                     name='interval.post')
    def IntervalPost(self, interval):
        """Creates an Interval in the Db."""
        interval.put()
        return interval

    @Day.method(path="day",
                http_method="POST",
                name="day.post")
    def DayPost(self, day):
        """Creates a Day in the Database."""
        day.put()
        return day

    @Day.method(request_fields=('id',),
                response_fields=('id', 'name', 'description', 'proper_time',
                                 'exercises', 'workout_id',),
                path='day',
                http_method='GET',
                name='day.get')
    def DayGet(self, day):
        """Returns a Day given an ID if the Day exists in the Db."""
        if not day.from_datastore:
            raise endpoints.NotFoundException('day not found')
        return day

    @Day.query_method(query_fields=('limit', 'pageToken', 'name', 'created',),
                      collection_fields=('id', 'name', 'description',
                                         'proper_time', 'exercises', 'created',
                                         'workout_id',),
                      path='days',
                      http_method='GET',
                      name="days.list")
    def DaysList(self, query):
        """Lists all of the Days contained in the Database."""
        return query

    @Workout.query_method(query_fields=('limit', 'pageToken', 'name',
                                        'objective', 'created',),
                          collection_fields=('id', 'name', 'objective',
                                             'description', 'created',
                                             'comment', 'days',),
                          path='workouts',
                          http_method='GET',
                          name='workouts.list')
    def WorkoutsList(self, query):
        """Lists all of the workouts contained in the Database."""
        return query

    @Workout.method(request_fields=('id',),
                    path='workout',
                    http_method='GET',
                    name='workout.get')
    def WorkoutGet(self, workout):
        """Returns a Workout gotten from the Database if found."""
        if not workout.from_datastore:
            raise endpoints.NotFoundException('workout not found')
        return workout

    @Workout.method(path='workout',
                    http_method='POST',
                    name='workout.post')
    def WorkoutPost(self, workout):
        """Creates a Workout in the Database."""
        workout.put()
        return workout
