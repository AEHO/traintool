import endpoints

from protorpc import messages
from protorpc import message_types
from protorpc import remote

from api.models import Exercise
from api.models import Interval
from api.models import Day
from api.models import Workout


@endpoints.api(name="gupapi",version="v1", description="GymUP Open Api",
            allowed_client_ids=[endpoints.API_EXPLORER_CLIENT_ID],
            audiences=[endpoints.API_EXPLORER_CLIENT_ID])
class GupApi(remote.Service):
    """
    GymUP TrainTool Open API v1
    """

    # //TODO
    # As it doesnt makes sense to query over all the list of
    # exercises (here we'll have a lot of dupplicates), it needs
    # to require a field for filtering it.

    @Exercise.query_method(query_fields=('limit','pageToken',),
                            # collection_fields=('name'),
                            path='exercises',
                            http_method="GET",
                            name='exercises.list')
    def ExercisesList(self, query):
        """
        Queries the entire DB for retrieving the Exercises.
        """
        return query

    @Exercise.method(request_fields=('id',),
                    path="exercise",
                    http_method="GET",
                    name="exercise.get")
    def ExerciseGet(self, exercise):
        """
        Queries the DB for an Exercise with the given ID.
        """
        if not exercise.from_datastore:
            raise endpoints.NotFoundException('exercise not found')
        return exercise

    @Exercise.method(path='exercise',
                    http_method='POST',
                    name='exercise.post')
    def ExercisePost(self, exercise):
        """
        Updates or Creates an Exercise in the Db
        """
        exercise.put()
        return exercise

    # //TODO
    # As it doesnt makes sense to query over all the list of
    # intervals it needs to require a field for filtering it.

    @Interval.query_method(query_fields=('limit', 'pageToken',),
                            path='intervals',
                            http_method='GET',
                            name='intervals.list')
    def IntervalsList(self, query):
        """
        Returns a list containing all the intervals
        """
        return query


    @Interval.method(path='interval',
                    http_method='POST',
                    name='interval.post')
    def IntervalPost(self, interval):
        """
        Updates or creates an Interval in the Db
        """
        interval.put()
        return interval

    @Day.method(path="day",
                http_method="POST",
                name="day.post")
    def DayPost(self, day):
        """
        Updates or creates a Day in the Database
        """
        day.put()
        return day


    @Day.method(request_fields=('id',),
                path='day',
                http_method='GET',
                name='day.get')
    def DayGet(self, day):
        """
        Returns a Day given an ID if the Day Exists in the Database
        """
        if not day.from_datastore:
            raise endpoints.NotFoundException('day not found')
        return day

    @Day.query_method(query_fields=('limit', 'pageToken',),
                    path='days',
                    http_method='GET',
                    name="days.list")
    def DaysList(self, query):
        """
        Lists all of the Days contained in the Database
        """
        return query