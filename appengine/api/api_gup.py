import endpoints

from protorpc import messages
from protorpc import message_types
from protorpc import remote

from api.models import Exercise, MyModel
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
        """ Queries the DB for an Exercise with the given ID. """
        if not exercise.from_datastore:
            raise endpoints.NotFoundException('exercise not found')
        return exercise

    @Exercise.method(response_fields=('id',),
                    path='exercise',
                    http_method='POST',
                    name='exercise.post')
    def ExercisePost(self, exercise):
        """ Updates or Creates an Exercise in the Db """
        if endpoints.get_current_user():
            exercise.owner = endpoints.get_current_user()
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
        return query


    @MyModel.method(path="mymodel", 
                    http_method="POST", 
                    name="mymodel.post")
    def MyModelPost(self, mymodel):
        return mymodel


    # @Exercise.method(user_required=True,
    #                 request_fields=('id',),
    #                 path="exercise",
    #                 http_method="DELETE",
    #                 name="exercise.delete")
    # def ExerciseDelete(self,exercise):
    #     """ Deletes an Exercise from the Db if the ID matches one. """
    #     if not exercise.from_datastore:
    #         raise endpoints.NotFoundException('Exercise not found')
    #     if not exercise.owner == endpoints.get_current_user():
    #         raise endpoints.UnauthorizedException("Not authorized")
    #     try:
    #         exercise.key.delete()
    #     except:
    #         raise endpoints.InternalServerErrorException(
    #             'exercise found but an error happened while deleting')
    #     return exercise

    # @ExerciseDay.method(path="exerciseday",
    #                     http_method='POST',
    #                     name='exerciseday.post')
    # def ExerciseDayPost(self, exerciseday):
    #     exerciseday.put()
    #     return exerciseday

    # @ExerciseDay.method(request_fields=('id',),
    #                     path='exerciseday',
    #                     http_method='GET',
    #                     name='exerciseday.get')
    # def ExerciseDayGet(self, exerciseday):
    #     if not exerciseday.from_datastore:
    #         raise endpoints.NotFoundException('ExerciseDay not found')
    #     return exerciseday

    # @ExerciseDay.query_method(query_fields=('limit','pageToken',),
    #                         path="exercisedays",
    #                         http_method='GET',
    #                         name='exercisedays.list')
    # def ExerciseDaysList(self, query):
    #     return query

    # @ExerciseDay.method(user_required=True,
    #                     request_fields=('id',),
    #                     path='exerciseday',
    #                     http_method='DELETE',
    #                     name='exerciseday.delete')
    # def ExerciseDayDelete(self, exerciseday):
    #     if not exerciseday.from_datastore:
    #         raise endpoints.NotFoundException('ExerciseDay not found')
    #     if not exerciseday.owner == endpoints.get_current_user():
    #         raise endpoints.UnauthorizedException("Not authorized")
    #     try:
    #         exerciseday.key.delete()
    #     except:
    #         raise endpoints.InternalServerErrorException(
    #             'Something unexpected happened while deleting')
    #     return exercise
