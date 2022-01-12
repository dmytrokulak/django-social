from django.db import models
from django.contrib.auth.models import User
import datetime


class RequestStatus(models.IntegerChoices):
    PENDING = 0
    ACCEPTED = 1


class UserInfo(models.Model):

    def upload_to(instance, filename):
        return 'server/static/uploads/user_%s/%s' % (instance.user.id, filename)

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    interests = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(
        upload_to=upload_to, null=True, blank=True)

    @property
    def full_name(self):
        return self.user.first_name + ' ' + self.user.last_name

    @property
    def profile_picture_path(self):
        return str(self.profile_picture).replace('server/', '')


class UserStatus(models.Model):
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    status = models.CharField(max_length=255, null=True, blank=True)
    timestamp = models.DateTimeField(default=datetime.datetime.now)


class UserFriend(models.Model):
    sender = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='userfriendsender')
    receiver = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='userfriendreceiver')
    status = models.IntegerField(
        choices=RequestStatus.choices, null=True)

    class Meta:
        unique_together = ('sender', 'receiver')


class MediaType(models.IntegerChoices):
    PHOTO = 0,
    VIDEO = 1


class UserMedia(models.Model):

    def upload_to(instance, filename):
        return 'server/static/uploads/user_%s/%s' % (instance.user.user_id, filename)

    data = models.ImageField(upload_to=upload_to)
    type = models.IntegerField(choices=MediaType.choices, null=True)
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)

    @property
    def data_path(self):
        return str(self.data).replace('server/', '')

    @property
    def media_type(self):
        return {
            MediaType.PHOTO: 'photo',
            MediaType.VIDEO: 'video',
        }[self.type]


class ChatRequest(models.Model):
    sender = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='chatsender')
    receiver = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='chatreceiver')
    chat_room = models.CharField(max_length=50)
