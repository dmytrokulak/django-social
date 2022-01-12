import json
from django.urls import reverse
from http import HTTPStatus
from rest_framework.test import APITestCase
from server.tests.model_factories import *
from datetime import datetime


class GetLoggedInUserInfoTests(APITestCase):
    user_info = None
    url = "logged_user_info"

    def setUp(self):
        self.user_info = UserInfoFactory.create()

    def tearDown(self):
        User.objects.all().delete()

    def test_should_return_user_details(self):
        self.client.force_login(self.user_info.user)
        url = reverse(self.url)
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        data = json.loads(response.content)
        self.assertEqual(set(data.keys()),
                         set(['user_id', 'full_name', 'statuses', 'interests',
                              'profile_picture_path', 'media', 'username', 'friends', 'requests']))
        self.assertEqual(data['user_id'], self.user_info.user_id)
        self.assertEqual(data['full_name'], self.user_info.full_name)
        self.assertTrue(data['interests'])
        self.assertTrue(data['profile_picture_path'])
        self.assertTrue(data['profile_picture_path'].startswith(
            'static/uploads/user'))
        self.assertTrue(data['statuses'])
        self.assertTrue(data['statuses'][0]['status'])
        self.assertTrue(data['statuses'][0]['timestamp'])
        self.assertTrue(datetime.strptime(
            data['statuses'][0]['timestamp'], '%Y-%m-%dT%H:%M:%SZ'))
        self.assertTrue(data['media'])
        self.assertEqual(data['media'][0]['media_type'], 'photo')
        self.assertTrue(data['media'][0]['data_path'].startswith(
            'static/uploads/user'))
        self.assertTrue(data['friends'])
        self.assertTrue(data['friends'][0]['username'])
        self.assertTrue(data['friends'][0]['profile_picture_path'])
        self.assertTrue(data['friends'][0]['full_name'])
        self.assertTrue(data['requests'])
        self.assertTrue(data['requests'][0]['username'])
        self.assertTrue(data['requests'][0]['profile_picture_path'])
        self.assertTrue(data['requests'][0]['full_name'])

    def test_should_return_unauthorized_if_not_logged_in(self):
        url = reverse(self.url)
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
