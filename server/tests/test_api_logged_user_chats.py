import json
from django.urls import reverse
from http import HTTPStatus
from rest_framework.test import APITestCase
from server.tests.model_factories import *


class GetLoggedInUserChatTests(APITestCase):
    user_info = None
    chat_request = None
    url = "logged_user_chats"

    def setUp(self):
        self.user_info = UserInfoFactory.create()
        self.chat_request = ChatRequestFactory.create(receiver=self.user_info)

    def tearDown(self):
        User.objects.all().delete()

    def test_should_return_chat_requests(self):
        self.client.force_login(self.user_info.user)
        url = reverse(self.url)
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        data = json.loads(response.content)
        self.assertTrue(data)
        item = data[0]
        self.assertEqual(set(item.keys()), set(['id', 'username']))
        self.assertTrue(item['id'])
        self.assertTrue(item['username'])

    def test_should_return_unauthorized_if_not_logged_in(self):
        url = reverse(self.url)
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
