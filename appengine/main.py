# Main handler for the requests. Routes the paths to the methods

import webapp2
import endpoints
import settings

import index.views
from api.api_gup import GupApi


api_application = endpoints.api_server([
    GupApi,
]) 

application = webapp2.WSGIApplication([
    ('/',index.views.IndexPage),
], debug=settings.DEBUG)