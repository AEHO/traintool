# Will do tests over all the api endpoints

import unittest
import webtest
import endpoints
import main

from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.ext import testbed


class StubTest(unittest.TestCase):
    """
    Sanity Test to check if we are able to even create the stubs
    """

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()

    def tearDown(self):
        self.testbed.deactivate()

    def test_sanity(self):
        self.assertTrue(True)


# All the requests to the api **must** be done with a post request
# with 'application/json' as content-type. The path for the requests
# must be addressed to /_ah/spi/{API_OBJECT.api_method}, and not as one
# would do in the browser with /_ah/api/{path}. As we are referencing 
# the api method and not the path, there is, then, an implicit
# differentiation between the http_methods that each supports. Remember
# that this does not happens in the production environment (_ah/api/) - 
# you'll have to set the proper http methods in that environment.

class ApiV1IntegrationTest(unittest.TestCase):
    """ 
    Tests the endpoints of Gup TrainTool API V1 
    """

    BASE_PATH = '/_ah/spi/GupApi.'

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.setup_env(current_version_id='testbed.version')
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testapp = webtest.TestApp(main.api_application)

    def tearDown(self):
        self.testbed.deactivate

    def test_exercise_list_get(self):
        response = self.testapp.post_json(self.BASE_PATH + 'ExercisesList',{})
        self.assertEqual(response.status_int, 200)

    def test_exercise_post(self):
        response_error = self.testapp.post_json(self.BASE_PATH + 'ExercisePost',
            { "id": "random_id" }, status=400)
        response_ok = self.testapp.post_json(self.BASE_PATH + 'ExercisePost', {
            "name": "exercise_name",
            "body_part": "body_part",
        })
        self.assertEqual(response_ok.status_int, 200)
        self.assertNotEqual(response_error.status_int, 200)

    def test_exercise_get(self):
        response_post_ok = self.testapp.post_json(self.BASE_PATH + \
            'ExercisePost', {
                "name": "exercise_name",
                "body_part": "body_part",
            })
        response_get = self.testapp.post_json(self.BASE_PATH + 'ExerciseGet', {
            "id": response_post_ok.json['id']
        })
        response_get_fail = self.testapp.post_json(self.BASE_PATH + \
            'ExerciseGet', { "id": "fail_id" }, status=400)

        self.assertEqual(response_get.status_int, 200)
        self.assertEqual(response_get.json['id'], response_post_ok.json['id'])
        self.assertNotEqual(response_get_fail.status_int, 200)

    def test_intervals_list_get(self):
        response = self.testapp.post_json(self.BASE_PATH + \
            'IntervalsList',{})
        self.assertEqual(response.status_int, 200)


if __name__ == '__main__':
    unittest.main()