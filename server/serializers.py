from rest_framework import serializers
from .models import *
from django.db.models import Q


class UserMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserMedia
        fields = ['id', 'data_path', 'media_type']


class UserFriendSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source="user.username")

    class Meta:
        model = UserInfo
        fields = ['user_id', 'username', 'profile_picture_path', 'full_name']


class UserStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserStatus
        fields = ['status', 'timestamp']


class UserInfoSerializer(serializers.ModelSerializer):

    media = UserMediaSerializer(
        source="usermedia_set", many=True, read_only=True)
    username = serializers.CharField(read_only=True, source="user.username")
    friends = serializers.SerializerMethodField()
    requests = serializers.SerializerMethodField()
    statuses = serializers.SerializerMethodField()

    class Meta:
        model = UserInfo
        fields = ['user_id', 'full_name', 'statuses', 'interests',
                  'profile_picture_path', 'media', 'username', 'friends', 'requests']

    def get_statuses(self, obj):
        qs = UserStatus.objects.filter(
            user=obj.user_id).order_by('-timestamp')
        if qs:
            return UserStatusSerializer(qs, many=True).data
        else:
            return []

    def get_friends(self, obj):
        qs = UserFriend.objects.filter(Q(sender=obj.user_id) | Q(
            receiver=obj.user_id), status=RequestStatus.ACCEPTED)
        res = [q.sender if q.receiver.user_id ==
               obj.user_id else q.receiver for q in qs]
        return UserFriendSerializer(res, many=True).data

    def get_requests(self, obj):
        qs = UserFriend.objects.filter(
            receiver=obj.user_id, status=RequestStatus.PENDING)
        return UserFriendSerializer([q.sender for q in qs], many=True).data


class ChatRequestSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        read_only=True, source="sender.user.username")

    class Meta:
        model = ChatRequest
        fields = ['id', 'username']
