from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from .serializers import *
from django.db.models import Q
from functools import reduce
import operator
import os


@api_view(['GET'])
def logged_user_info(request):
    """Returns user info for logged in user.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_info = UserInfo.objects.get(user__username=request.user.username)
    serializer = UserInfoSerializer(user_info)
    return JsonResponse(serializer.data)


@api_view(['POST'])
def logged_user_status_update(request):
    """Saves new user status for logged in user.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_info = UserInfo.objects.get(user__username=request.user.username)
    user_status = UserStatus.objects.create(user=user_info,
                                            status=request.data['status'])
    user_status.save()
    return JsonResponse(UserStatusSerializer(user_status).data, status=status.HTTP_201_CREATED)


@api_view(['PATCH'])
def logged_user_interests_update(request):
    """Updates interests field for logged in user.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_info = UserInfo.objects.get(user__username=request.user.username)
    user_info.interests = request.data['interests']
    user_info.save()
    return HttpResponse(status=status.HTTP_200_OK)


@api_view(['PATCH'])
def logged_user_profile_picture_update(request):
    """Updates profile picture for logged in user.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_info = UserInfo.objects.get(user__username=request.user.username)
    user_info.profile_picture = request.data['file']
    user_info.save()
    return HttpResponse(status=status.HTTP_200_OK)


@api_view(['POST'])
def logged_user_media_upload(request, media_type):
    """Uploads a media file for logged in user.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_info = UserInfo.objects.get(user__username=request.user.username)
    choice = MediaType.PHOTO if media_type == 'photo' else MediaType.VIDEO
    user_media = UserMedia.objects.create(data=request.data['file'],
                                          type=choice,
                                          user=user_info)
    user_media.save()
    serializer = UserMediaSerializer(user_media)
    return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def logged_user_media_delete(request, id):
    """Deletes a media file by id for logged in user.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_media = UserMedia.objects.get(id=id)
    file_path = str(user_media.data.url).lstrip("/")
    user_media.delete()
    os.remove(file_path)
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_users(request):
    """Returns a list of all users in the system except the logged in user.
    Filters by a query string parameter 'filter' if specified. 
    Filter applies to first name, last name or username.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_info = []
    filters = request.GET.get('filters', None)
    if not filters:
        user_info = UserInfo.objects.filter(
            ~Q(user__username=request.user.username))
    else:
        q_first_name = reduce(
            operator.or_, (Q(user__first_name__icontains=x) for x in filters.split()))
        q_last_name = reduce(
            operator.or_, (Q(user__last_name__icontains=x) for x in filters.split()))
        q_name = reduce(operator.or_, (q_first_name, q_last_name))
        q_not_me = ~Q(user__username=request.user.username)
        user_info = UserInfo.objects.filter(q_not_me, q_name)
    serializer = UserInfoSerializer(user_info, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def get_user(request, username):
    """Returns a single user by username or 404 error.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_info = UserInfo.objects.filter(user__username=username)
    if not user_info:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    serializer = UserInfoSerializer(user_info[0])
    return JsonResponse(serializer.data)


@api_view(['PUT', 'DELETE'])
def logged_user_friend(request, id):
    """PUT: creates a user request if new, accepts a request if previously created.
    DELETE: removes a user from the list of friends.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    if request.method == 'PUT':
        user_info = UserInfo.objects.get(user__username=request.user.username)
        friend_info = UserInfo.objects.get(user_id=id)
        friend_request = UserFriend.objects.filter(sender=friend_info,
                                                   receiver=user_info,
                                                   status=0)
        if friend_request:
            friend_request = friend_request[0]
            friend_request.status = 1
            friend_request.save()
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else:
            friend_request = UserFriend.objects.create(sender=user_info,
                                                       receiver=friend_info,
                                                       status=0)
            friend_request.save()
            return HttpResponse(status=status.HTTP_201_CREATED)
    if request.method == 'DELETE':
        user_info = UserInfo.objects.get(user__username=request.user.username)
        friend_info = UserInfo.objects.get(user_id=id)
        friend_request = UserFriend.objects.filter((Q(sender=user_info) & Q(receiver=friend_info)) |
                                                   (Q(sender=friend_info)
                                                    & Q(receiver=user_info))
                                                   )[0]
        friend_request.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def logged_user_chats(request):
    """Returns a list of active chat requests for the logged in user.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_info = UserInfo.objects.get(user__username=request.user.username)
    chat_request = ChatRequest.objects.filter(receiver=user_info)
    if chat_request:
        return JsonResponse(ChatRequestSerializer(chat_request, many=True).data, safe=False)
    else:
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def logged_user_chat_add(request, user_id):
    """Creates a chart request from logged in user to the given user.
    """
    if not request.user or not request.user.is_authenticated:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    user_info = UserInfo.objects.get(user__username=request.user.username)
    friend_info = UserInfo.objects.filter(user_id=user_id)[0]
    chat_request = ChatRequest.objects.create(sender=user_info,
                                              receiver=friend_info,
                                              chat_room=request.data['chat_room'])
    chat_request.save()
    return HttpResponse(status=status.HTTP_201_CREATED)
