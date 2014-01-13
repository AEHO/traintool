import endpoints

from protorpc import messages
from protorpc import message_types
from protorpc import remote

from api.models import Exercise,Day

@endpoints.api(name="gupapi",version="v1")
class GupApi(remote.Service):
    """ GymUP Open API """

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


