# Will check if the testing environment is OK for Functional Testing

import unittest
import webtest
import endpoints

import main

from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.ext import testbed


class StubTest(unittest.TestCase):
    """ Test if we are able to create the stubs """

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()

    def tearDown(self):
        self.testbed.deactivate()

    def test_sanity(self):
        self.assertTrue(True)


class ApiStubTest(unittest.TestCase):
    """ Suit for testing if SPI is at least responding as expected """

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.setup_env(current_version_id='testbed.version')
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testapp = webtest.TestApp(main.api_application)

    def tearDown(self):
        self.testbed.deactivate

    def test_endpoint_get(self):
        response = self.testapp.post_json('/_ah/spi/GupApi.ExercisesList',{})
        self.assertEqual(response.status_int, 200)

    def test_endpoint_post(self):
        response = self.testapp.post_json('/_ah/spi/GupApi.ExercisePost',
                                        {"name": "exercicio"})
        self.assertEqual(response.status_int, 200)




if __name__ == '__main__':
    unittest.main()