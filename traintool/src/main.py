# Main handler for the requests. Routes the paths to the methods

import endpoints
from api.api_gup import GupApi


api_application = endpoints.api_server([
    GupApi,
], restricted=False)
