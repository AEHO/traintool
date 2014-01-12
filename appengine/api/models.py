from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel

class Exercicio(EndpointsModel):

    _message_fields_schema = (
        'id','nome',)
    nome = ndb.StringProperty(indexed=True)