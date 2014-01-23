import unittest
import webtest

# from main import application
from google.appengine.ext import testbed


class DummyTest(unittest.TestCase):
    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()

    def test_dummy(self):
        self.assertEqual(1,1)

    def tearDown(self):
        self.testbed.deactivate()

        
if __name__ == '__main__':
    unittest.main()