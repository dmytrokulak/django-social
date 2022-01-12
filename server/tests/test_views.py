from django.test.testcases import TestCase
from django.urls import reverse
from http import HTTPStatus
from server.tests.model_factories import *


class ViewsTests(TestCase):
    url_login = "login"
    url_register = "register"
    url_home = "home"
    url_search = "search"
    url_user = "user_guest"
    url_swagger = "swagger_ui"
    url_chat = "chat_room"

    def setUp(self):
        self.user_info = UserInfoFactory.create(friends=[], requests=[])

    def tearDown(self):
        User.objects.all().delete()

    def test_login(self):
        response = self.client.get(reverse(self.url_login))
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertTemplateUsed(response, './auth/login.html')

    def test_login_redirected_if_authenticated(self):
        self.client.force_login(self.user_info.user)
        response = self.client.get(reverse(self.url_login))
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        self.assertRedirects(response, reverse(self.url_home))

    def test_register(self):
        response = self.client.get(reverse(self.url_register))
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertTemplateUsed(response, './auth/register.html')

    def test_register_redirected_if_authenticated(self):
        self.client.force_login(self.user_info.user)
        response = self.client.get(reverse(self.url_register))
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        self.assertRedirects(response, reverse(self.url_home))

    def test_home(self):
        self.client.force_login(self.user_info.user)
        response = self.client.get(reverse(self.url_home))
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertTemplateUsed(response, './home.html')

    def test_home_redirect_if_not_authenticated(self):
        response = self.client.get(reverse(self.url_home))
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        url = str("%s?next=%s" % (reverse(self.url_login),
                  reverse(self.url_home))).lstrip("/")
        self.assertRedirects(response, url, fetch_redirect_response=False)

    def test_search(self):
        self.client.force_login(self.user_info.user)
        response = self.client.get(reverse(self.url_search))
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertTemplateUsed(response, './search.html')

    def test_search_redirect_if_not_authenticated(self):
        response = self.client.get(reverse(self.url_search))
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        url = "%s?next=%s" % (reverse(self.url_login),
                              reverse(self.url_search))
        self.assertRedirects(response, url, fetch_redirect_response=False)

    def test_user_page(self):
        username = "user.name"
        UserInfoFactory.create(user=UserFactory.create(username=username))
        self.client.force_login(self.user_info.user)
        url = reverse(self.url_user, kwargs={"username": username})
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertTemplateUsed(response, './user.html')

    def test_user_page_redirect_if_not_authenticated(self):
        username = "user.name"
        UserInfoFactory.create(user=UserFactory.create(username=username))
        url = reverse(self.url_user, kwargs={"username": username})
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        url = "%s?next=%s" % (reverse(self.url_login), url)
        self.assertRedirects(response, url, fetch_redirect_response=False)

    def test_user_page_redirect_if_own_page(self):
        self.client.force_login(self.user_info.user)
        url = reverse(self.url_user, kwargs={
                      "username": self.user_info.user.username})
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        self.assertRedirects(response, reverse(
            self.url_home), fetch_redirect_response=False)

    def test_chat_room(self):
        username = "user.name"
        UserInfoFactory.create(user=UserFactory.create(username=username))
        self.client.force_login(self.user_info.user)
        url = reverse(self.url_chat, kwargs={"username": username})
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertTemplateUsed(response, './chat.html')

    def test_chat_redirect_if_not_authenticated(self):
        username = "user.name"
        UserInfoFactory.create(user=UserFactory.create(username=username))
        url = reverse(self.url_chat, kwargs={"username": username})
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        url = "%s?next=%s" % (reverse(self.url_login), url)
        self.assertRedirects(response, url, fetch_redirect_response=False)

    def test_swagger_redirect_if_not_authenticated(self):
        self.client.force_login(self.user_info.user)
        response = self.client.get(reverse(self.url_swagger))
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertTemplateUsed(response, 'swagger-docs.html')

    def test_swagger_redirect_if_not_authenticated(self):
        response = self.client.get(reverse(self.url_swagger))
        self.assertEqual(response.status_code, HTTPStatus.FOUND)
        url = "%s?next=%s" % (reverse(self.url_login),
                              reverse(self.url_swagger))
        self.assertRedirects(response, url, fetch_redirect_response=False)
