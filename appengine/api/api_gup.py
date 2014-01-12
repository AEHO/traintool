import endpoints

from protorpc import messages
from protorpc import message_types
from protorpc import remote

from api.models import Exercicio

@endpoints.api(name="gupapi",version="v1")
class GupApi(remote.Service):
    """ GymUP Open API """

    @Exercicio.method(response_fields=('id',),
                    path='exercicio',
                    http_method='PUT',
                    name='exercicio.put')
    def ExercicioPut(self,exercicio):
        exercicio.put()
        return exercicio

    @Exercicio.method(request_fields=('id',),
                    path="exercicio",
                    http_method="DELETE",
                    name="exercicio.delete")
    def ExercicioDelete(self,exercicio):
        if not exercicio.from_datastore:
            raise endpoints.NotFoundException('Exercicio nao encontrado')
        return exercicio

    @Exercicio.method(request_fields=('id',),
                    path="exercicio",
                    http_method="GET",
                    name="exercicio.get")
    def ExercicioGet(self,exercicio):
        if not exercicio.from_datastore:
            raise endpoints.NotFoundException('Exercicio nao encontrado')
        return exercicio

    @Exercicio.query_method(query_fields=('limit','order','pageToken',),
                            path='exercicios',
                            name='exercicios.list')
    def ExerciciosList(self,query):
        return query