import endpoints

from protorpc import messages
from protorpc import message_types
from protorpc import remote

from api.models import Exercise, Day, MyModel

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
        # return query.filter(MyModel.owner == endpoints.get_current_user())
        return query



    @Exercise.method(response_fields=('id',),
                    path='exercise',
                    http_method='PUT',
                    name='exercise.put')
    def ExercisePut(self,exercise):
        exercise.put()
        return Exercise

    @Exercise.method(request_fields=('id',),
                    path="exercise",
                    http_method="DELETE",
                    name="exercise.delete")
    def ExerciseDelete(self,exercise):
        if not exercise.from_datastore:
            raise endpoints.NotFoundException('Exercise nao encontrado')
        return exercise

    @Exercise.method(request_fields=('id',),
                    path="exercise",
                    http_method="GET",
                    name="exercise.get")
    def ExerciseGet(self,exercise):
        if not exercise.from_datastore:
            raise endpoints.NotFoundException('exercise nao encontrado')
        return exercise

    @Exercise.query_method(query_fields=('limit','order','pageToken',),
                            path='exercises',
                            name='exercises.list')
    def ExercisesList(self,query):
        return query


    @Day.query_method(query_fields=("limit","pageToken",),
                    path="days",
                    name="days.list")
    def DaysList(self,query):
        return query


