import json
from django.urls import reverse
from http import HTTPStatus
from rest_framework.test import APITestCase
from server.tests.model_factories import *
from datetime import datetime


class GetAllUsersTests(APITestCase):
    user_info = None
    url = "get_users"

    def setUp(self):
        self.user_info = UserInfoFactory.create(friends=[], requests=[])
        UserInfoFactory.create_batch(size=3, friends=[], requests=[])

    def tearDown(self):
        User.objects.all().delete()

    def test_should_get_all_users(self):
        self.client.force_login(self.user_info.user)
        url = reverse(self.url)
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        data = json.loads(response.content)
        self.assertTrue(data)
        self.assertEqual(len(data), 3)
        # doesn't return logged in user in the search results
        self.assertNotIn(self.user_info.user_id, [x["user_id"] for x in data])
        user = data[0]
        self.assertEqual(set(user.keys()),
                         set(['user_id', 'full_name', 'statuses', 'interests',
                              'profile_picture_path', 'media', 'username', 'friends', 'requests']))
        self.assertTrue(user['user_id'])
        self.assertTrue(user['full_name'])
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

    def test_should_return_unauthorized_if_not_logged_in(self):
        url = reverse(self.url)
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
