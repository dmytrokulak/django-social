from django.urls import reverse
from http import HTTPStatus
from rest_framework.test import APITestCase
from server.tests.model_factories import *


class LoggedInUserFriendRequestTests(APITestCase):
    user_info = None
    friend_info = None
    url = "logged_user_friend"

    def setUp(self):
        self.user_info = UserInfoFactory.create(friends=[], requests=[])
        self.friend_info = UserInfoFactory.create(friends=[], requests=[])

    def tearDown(self):
        User.objects.all().delete()

    def test_should_crud_friend_request(self):
        # create a request
        self.client.force_login(self.user_info.user)
        url = reverse(self.url, kwargs={"id": self.friend_info.user_id})
        response = self.client.put(url)
        self.assertEqual(response.status_code, HTTPStatus.CREATED)
        friend_request = UserFriend.objects.get(sender_id=self.user_info.user_id,
                                                receiver_id=self.friend_info.user_id)
        self.assertEqual(friend_request.status, RequestStatus.PENDING)
        # accept the request
        self.client.force_login(self.friend_info.user)
        url = reverse(self.url, kwargs={"id": self.user_info.user_id})
        response = self.client.put(url)
        self.assertEqual(response.status_code, HTTPStatus.NO_CONTENT)
        friend_request = UserFriend.objects.get(sender_id=self.user_info.user_id,
                                                receiver_id=self.friend_info.user_id)
        self.assertEqual(friend_request.status, RequestStatus.ACCEPTED)
        # delete the request (remove a user from list of friends)
        url = reverse(self.url, kwargs={"id": self.user_info.user_id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, HTTPStatus.NO_CONTENT)
        friend_request = UserFriend.objects.filter(sender_id=self.user_info.user_id,
                                                   receiver_id=self.friend_info.user_id)
        self.assertFalse(friend_request.exists())

    def test_should_return_unauthorized_if_not_logged_in(self):
        url = reverse(self.url, kwargs={"id": self.friend_info.user_id})
        response = self.client.put(url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
