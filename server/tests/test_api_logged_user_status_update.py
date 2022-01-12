from django.urls import reverse
from http import HTTPStatus
from rest_framework.test import APITestCase
from server.tests.model_factories import *
import datetime


class PostLoggedInUserStatusUpdateTests(APITestCase):
    user_info = None
    url = "logged_user_status_update"
    status = "hello world"

    def setUp(self):
        self.user_info = UserInfoFactory.create()

    def tearDown(self):
        User.objects.all().delete()

    def test_should_update_user_status(self):
        # initial assert: no status in db
        query = UserStatus.objects.filter(status=self.status)
        self.assertFalse(query.exists())
        # send request
        self.client.force_login(self.user_info.user)
        url = reverse(self.url)
        response = self.client.post(url, data={
            "status": self.status
        }, format='json')
        # assert after request sent
        self.assertEqual(response.status_code, HTTPStatus.CREATED)
        query = UserStatus.objects.filter(status=self.status)
        self.assertTrue(query.exists())
        self.assertEqual(query[0].status, self.status)
        self.assertEqual(type(query[0].timestamp), datetime.datetime)

    def test_should_return_unauthorized_if_not_logged_in(self):
        url = reverse(self.url)
        response = self.client.post(url, data={
            "status": self.status
        }, format='json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
