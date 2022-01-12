from django.urls import reverse
from http import HTTPStatus
from rest_framework.test import APITestCase
from server.tests.model_factories import *
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files import File
import os


class LoggedInUserMediaTests(APITestCase):
    user_info = None
    url_upload = "logged_user_media_upload"
    url_delete = "logged_user_media_delete"

    def setUp(self):
        self.user_info = UserInfoFactory.create(media=[])

    def tearDown(self):
        User.objects.all().delete()

    def test_should_crud_media(self):
        # create media
        self.client.force_login(self.user_info.user)
        url = reverse(self.url_upload, kwargs={"media_type": 'photo'})

        data = File(open('server/tests/test.png', 'rb'))
        file = SimpleUploadedFile(
            "server/tests/test.png", data.read(), content_type="image/png")
        response = self.client.post(url, data={
            "file": file
        }, format='multipart')

        self.assertEqual(response.status_code, HTTPStatus.CREATED)
        user_media = UserMedia.objects.get(user_id=self.user_info.user_id)
        file_path = 'server/static/uploads/user_%s/test.png' % self.user_info.user_id
        self.assertEqual(user_media.data, file_path)
        self.assertTrue(os.path.isfile(file_path))

        # delete the media
        url = reverse(self.url_delete, kwargs={"id": user_media.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, HTTPStatus.NO_CONTENT)
        user_media = UserMedia.objects.filter(user_id=self.user_info.user_id)
        self.assertFalse(user_media.exists())
        self.assertFalse(os.path.isfile(file_path))

    def test_should_return_unauthorized_if_not_logged_in(self):
        url = reverse(self.url_upload, kwargs={"media_type": 'photo'})
        response = self.client.post(url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
