import json
from django.urls import reverse
from http import HTTPStatus
from rest_framework.test import APITestCase
from server.tests.model_factories import *
from datetime import datetime


class GetUserByUsernameTests(APITestCase):
    user_info = None
    url = "get_user"

    def create_user_info(self, fname, lname):
        user = UserFactory.create(
            first_name=fname, last_name=lname, username=fname + "." + lname)
        UserInfoFactory.create(user=user, friends=[], requests=[])

    def setUp(self):
        self.user_info = UserInfoFactory.create(friends=[], requests=[])
        self.create_user_info("john", "doe")
        self.create_user_info("harry", "smith")
        self.create_user_info("naomi", "devis")

    def tearDown(self):
        User.objects.all().delete()

    def test_should_get_user_by_username(self):
        self.client.force_login(self.user_info.user)
        url = reverse(self.url, kwargs={"username": "john.doe"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        user = json.loads(response.content)
        self.assertEqual(set(user.keys()),
                         set(['user_id', 'full_name', 'statuses', 'interests',
                              'profile_picture_path', 'media', 'username', 'friends', 'requests']))
        self.assertTrue(user['user_id'])
        self.assertEqual(user['full_name'], "john doe")
        self.assertTrue(user['interests'])
        self.assertTrue(user['profile_picture_path'])
        self.assertTrue(user['profile_picture_path'].startswith(
            'static/uploads/user'))
        self.assertTrue(user['statuses'])
        self.assertTrue(user['statuses'][0]['status'])
        self.assertTrue(user['statuses'][0]['timestamp'])
        self.assertTrue(datetime.strptime(
            user['statuses'][0]['timestamp'], '%Y-%m-%dT%H:%M:%SZ'))
        self.assertTrue(user['media'])
        self.assertEqual(user['media'][0]['media_type'], 'photo')
        self.assertTrue(user['media'][0]['data_path'].startswith(
            'static/uploads/user'))

    def test_should_return_not_found_if_no_user_exists(self):
        self.client.force_login(self.user_info.user)
        url = reverse(self.url, kwargs={"username": "no.name"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND)

    def test_should_return_unauthorized_if_not_logged_in(self):
        url = reverse(self.url, kwargs={"username": "john.doe"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
