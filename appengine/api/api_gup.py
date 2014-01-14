import endpoints

from protorpc import messages
from protorpc import message_types
from protorpc import remote

from api.models import MyModel
from api.models import Exercise, ExerciseDay, ExercisesLink
from api.models import Day
from api.models import Workout

@endpoints.api(name="gupapi",version="v1", description="GymUP Open Api",
            allowed_client_ids=[endpoints.API_EXPLORER_CLIENT_ID],
            audiences=[endpoints.API_EXPLORER_CLIENT_ID])
class GupApi(remote.Service):
    """ GymUP Open API """

    @MyModel.method(user_required=True,
                    path='mymodel',
                    http_method='POST',
                    name='mymodel.insert')
    def MyModelInsert(self,my_model):
        my_model.owner = endpoints.get_current_user()
        my_model.put()
        return my_model

    @MyModel.query_method(user_required=True,
                        path="mymodels",
                        http_method='GET',
                        name='mymodels.list')
    def MyModelList(self,query):
        return query

    #TESTING THE AUTH ABOVE


    @Exercise.query_method(query_fields=('limit','order','pageToken',),
                            path='exercises',
                            http_method="GET",
                            name='exercises.list')
    def ExercisesList(self,query):
        """ Queries the entire DB for retrieving the Exercises """
        return query


    @Exercise.method(request_fields=('id',),
                    path="exercise",
                    http_method="GET",
                    name="exercise.get")
    def ExerciseGet(self,exercise):
        """ Queries the DB for an Exercise with the given ID. """
        if not exercise.from_datastore:
            raise endpoints.NotFoundException('exercise not found')
        return exercise


    @Exercise.method(response_fields=('id',),
                    path='exercise',
                    http_method='POST',
                    name='exercise.post')
    def ExercisePost(self,exercise):
        """ Updates or Creates an Exercise in the Db """
        exercise.put()
        return Exercise


    @Exercise.method(request_fields=('id',),
                    path="exercise",
                    http_method="DELETE",
                    name="exercise.delete")
    def ExerciseDelete(self,exercise):
        """ Deletes an Exercise from the Db if the ID matches one. """
        if not exercise.from_datastore:
            raise endpoints.NotFoundException('Exercise nao encontrado')
        try:
            exercise.key.delete()
        except:
            raise endpoints.NotFoundException('Exercise nao encontrado')
        return exercise

