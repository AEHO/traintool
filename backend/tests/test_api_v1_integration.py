# -*- coding: utf-8 -*-
"""Functional/E2E Tests for the API."""

import unittest
import webtest
import endpoints
import main

# from src.api import models
from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.ext import testbed


# All the requests to the api **must** be done with a post request
# with 'application/json' as content-type. The path for the requests
# must be addressed to /_ah/spi/{API_OBJECT.api_method}, and not as one
# would do in the browser with /_ah/api/{path}. As we are referencing
# the api method and not the path, there is, then, an implicit
# differentiation between the http_methods that each supports. Remember
# that this does not happens in the production environment (_ah/api/) -
# you'll have to set the proper http methods in that environment.


class IntegrationTestCase(unittest.TestCase):

    """
    Base class that contains the proper setUp and tearDown methods
    that will be used by all of the other integration tests that uses
    webtest and testbed. Just inherit this class and write the tests.
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


class TestStub(IntegrationTestCase):

    """
    Sanity Test to check if we are able to even create the stubs
    """

    def test_sanity(self):
        self.assertTrue(True)


class TestExercise(IntegrationTestCase):

    """
    Tests the endpoints of Gup TrainTool API V1
    """

    def test_exercise_list_get(self):
        response = self.testapp.post_json(self.BASE_PATH + 'ExercisesList', {})
        self.assertEqual(response.status_int, 200)

    def test_exercise_post(self):
        response_error = self.testapp.post_json(
            self.BASE_PATH + 'ExercisePost',
            {"id": "random_id"}, status=400)
        response_ok = self.testapp.post_json(self.BASE_PATH + 'ExercisePost', {
            "name": "exercise_name",
            "body_part": "body_part",
        })
        self.assertEqual(response_ok.status_int, 200)
        self.assertTrue(response_ok.json['id'])
        self.assertNotEqual(response_error.status_int, 200)

    def test_exercise_post_non_ascii(self):
        response = self.testapp.post_json(self.BASE_PATH + 'ExercisePost', {
            "name": "exercise_name",
            "comment": "àçãáā ēīūŗļķņģšžč.",
        })
        self.assertEqual(response.status_int, 200)
        self.assertTrue(response.json['id'])

    def test_exercise_get(self):
        response_post_ok = self.testapp.post_json(self.BASE_PATH +
                                                  'ExercisePost', {
                                                      "name": "exercise_name",
                                                      "body_part": "body_part",
                                                  })
        response_get = self.testapp.post_json(self.BASE_PATH + 'ExerciseGet', {
            "id": response_post_ok.json['id']
        })
        response_get_fail = self.testapp.post_json(self.BASE_PATH +
                                                   'ExerciseGet',
                                                   {"id": "fail_id"},
                                                   status=400)

        self.assertEqual(response_get.status_int, 200)
        self.assertEqual(response_get.json['id'], response_post_ok.json['id'])
        self.assertNotEqual(response_get_fail.status_int, 200)

    def test_post_list(self):
        """Tests the POST of a list of exercises."""
        response = self.testapp.post_json(self.BASE_PATH +
                                          'ExercisesListPost', {
                                              "items": [
                                                  {
                                                      "name":
                                                      "ex1_name",
                                                  },
                                                  {
                                                      "name":
                                                      "ex2_name",
                                                  },
                                              ]
                                          })
        self.assertEqual(response.status_int, 200)
        self.assertEqual(len(response.json['items']), 2)
        for exercise in response.json['items']:
            self.assertTrue('id' in exercise)


class TestInterval(IntegrationTestCase):

    def test_intervals_list(self):
        response = self.testapp.post_json(self.BASE_PATH +
                                          'IntervalsList', {})
        self.assertEqual(response.status_int, 200)

    def test_interval_post(self):
        response_error = self.testapp.post_json(
            self.BASE_PATH + 'IntervalPost',
            {"id": "random_id"}, status=400)
        response_ok = self.testapp.post_json(self.BASE_PATH + 'IntervalPost', {
            "time": 20,
            "comment": "body_part",
        })
        self.assertEqual(response_ok.status_int, 200)
        self.assertTrue(response_ok.json['id'])
        self.assertNotEqual(response_error.status_int, 200)


class TestDay(IntegrationTestCase):

    def test_days_list(self):
        response = self.testapp.post_json(self.BASE_PATH +
                                          'DaysList', {})
        self.assertEqual(response.status_int, 200)

    def test_day_post(self):
        response_error = self.testapp.post_json(self.BASE_PATH + 'DayPost',
                                                {"id": "random_id"},
                                                status=400)
        response_ok = self.testapp.post_json(self.BASE_PATH + 'DayPost', {
            "name": "day_name",
            "description": "description",
            "sequency": 1
        })

        self.assertEqual(response_ok.status_int, 200)
        self.assertTrue(response_ok.json['id'])
        self.assertNotEqual(response_error.status_int, 200)

    def test_day_get(self):
        response_post = self.testapp.post_json(self.BASE_PATH + 'DayPost', {
            "name": "name of the day"
        })
        response_get = self.testapp.post_json(self.BASE_PATH + 'DayGet', {
            "id": response_post.json['id']
        })
        self.assertEqual(response_get.json['id'], response_post.json['id'])

    def test_day_exercises_get(self):
        response_post_day = self.testapp.post_json(
            self.BASE_PATH + 'DayPost', {
                "name": "day_name",
                "description": "description",
            })
        response_post_day_false = self.testapp.post_json(
            self.BASE_PATH + 'DayPost', {
                "name": "day_name",
                "description": "description",
            })
        for i in range(4):
            self.testapp.post_json(self.BASE_PATH + 'ExercisePost', {
                "name": "exercise_name",
                "sequency": i,
                "day_id": response_post_day.json['id']
            })

        response_get = self.testapp.post_json(self.BASE_PATH + 'DayGet', {
            "id": response_post_day.json['id']
        })
        response_get_false = self.testapp.post_json(
            self.BASE_PATH + 'DayGet', {
                "id": response_post_day_false.json['id']
            })
        self.assertTrue('exercises' in response_get.json)
        self.assertFalse('exercises' in response_get_false.json)

    def test_day_batch_post(self):
        response = self.testapp.post_json(self.BASE_PATH + 'DayPost', {
            "name": "dayname",
            "exercises": [
                {
                    "name": "ex1",
                },
                {
                    "name": "ex2",
                },
            ]
        })
        self.assertEqual(response.status_int, 200)
        self.assertTrue(response.json['id'])

        response_get = self.testapp.post_json(self.BASE_PATH + 'DayGet', {
            "id": response.json['id']
        })
        self.assertTrue('exercises' in response_get.json)
        self.assertTrue(len(response_get.json['exercises']) == 2)

    def test_post_list(self):
        """Tests the POST of a list of days."""
        response = self.testapp.post_json(self.BASE_PATH +
                                          'DaysListPost', {
                                              "items": [
                                                          {
                                                              "name":
                                                              "day1_nam",
                                                          },
                                                  {
                                                      "name":
                                                      "day2_nam",
                                                  },
                                              ]
                                          })
        self.assertEqual(response.status_int, 200)
        self.assertEqual(len(response.json['items']), 2)
        for exercise in response.json['items']:
            self.assertTrue('id' in exercise)


class TestWorkout(IntegrationTestCase):

    def test_workouts_list(self):
        response = self.testapp.post_json(self.BASE_PATH +
                                          'WorkoutsList', {})
        self.assertEqual(response.status_int, 200)

    def test_workout_post(self):
        response_error = self.testapp.post_json(self.BASE_PATH +
                                                'WorkoutPost',
                                                {'id': 'random_id'},
                                                status=400)
        response_ok = self.testapp.post_json(self.BASE_PATH +
                                             'WorkoutPost', {
                                                 "name": "training"
                                             })
        self.assertEqual(response_ok.status_int, 200)
        self.assertTrue(response_ok.json['id'])
        self.assertNotEqual(response_error.status_int, 200)

    def test_workout_get(self):
        response_post = self.testapp.post_json(self.BASE_PATH +
                                               'WorkoutPost', {
                                                   "name": "training"
                                               })
        response_get = self.testapp.post_json(self.BASE_PATH + 'WorkoutGet', {
                                              'id': response_post.json['id']
                                              })
        self.assertEqual(response_get.json['id'], response_post.json['id'])

    def test_workout_get_days(self):
        response_workout = self.testapp.post_json(self.BASE_PATH +
                                                  'WorkoutPost', {
                                                      "name": "training"
                                                  })

        response_day = self.testapp.post_json(self.BASE_PATH + 'DayPost', {
            "name": "day_name",
            "description": "description",
            "workout_id": response_workout.json['id']
        })

        response_get = self.testapp.post_json(self.BASE_PATH + 'WorkoutGet', {
                                              "id": response_workout.json['id']
                                              })

        self.assertEqual(response_get.status_int, 200)
        self.assertTrue('days' in response_get.json)

    def test_workout_post_batch_days(self):
        response = self.testapp.post_json(self.BASE_PATH + 'WorkoutPost', {
                                          "name": "training",
                                          "days": [
                                              {"name": "day1"}
                                          ]
                                          })

        self.assertTrue(response.status_int == 200 and 'id' in response.json)

        response_get = self.testapp.post_json(self.BASE_PATH + 'WorkoutGet', {
                                              "id": response.json['id']
                                              })

        self.assertEqual(response_get.json['id'], response.json['id'])
        self.assertTrue('days' in response_get.json)

    def test_workout_post_batch_days_exercises(self):
        res = self.testapp.post_json(self.BASE_PATH + 'WorkoutPost', {
                                     "name": "workout",
                                     "days": [
                                         {
                                             "name": "day",
                                             "exercises": [
                                                 {
                                                     "name": "exercise"
                                                 }
                                             ]
                                         }
                                     ]
                                     })

        self.assertTrue('id' in res.json)

        res_get = self.testapp.post_json(self.BASE_PATH + 'WorkoutGet', {
                                         "id": res.json['id']
                                         })

        self.assertTrue('days' in res_get.json)
        self.assertTrue('exercises' in res_get.json['days'][0])


if __name__ == '__main__':
    unittest.main()
