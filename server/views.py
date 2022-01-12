from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import *
from .forms import *
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from http import HTTPStatus
from django.db.models import Q
import uuid


def chat_room(request, username):
    """Renders a new chat room or connects to an existing one.
    """
    multi_chat = False

    user_me = UserInfo.objects.filter(user__username=request.user.username)[0]
    user_info = UserInfo.objects.filter(user__username=username)[0]
    requests = ChatRequest.objects.filter(sender=user_info,
                                          receiver=user_me)

    if requests.count() == 0:
        room_no = uuid.uuid4().hex
        chat_request = ChatRequest.objects.create(sender=user_me,
                                                  receiver=user_info,
                                                  chat_room=room_no)
        chat_request.save()
        chat_id = chat_request.id
        qs = UserFriend.objects.filter(
            (Q(receiver=user_me) | Q(sender=user_me)) & Q(status=1)
            & ~(Q(receiver=user_info) | Q(sender=user_info)))
        user_friends = [q.sender if q.receiver ==
                        user_info else q.receiver for q in qs]
        return render(request, './chat.html', {'room_name': room_no,
                                               'user_me': request.user.username,
                                               'user_friends': user_friends,
                                               'multi_chat': multi_chat,
                                               'chat_id': chat_id})
    else:
        chat_room = requests[0].chat_room
        chat_id = requests[0].id
        requests = ChatRequest.objects.filter(chat_room=chat_room)
        multi_chat = requests.count() > 1
        chat_log = ''
        if multi_chat:
            users = set(
                sum([(r.sender.user.username, r.receiver.user.username) for r in requests], ()))
            chat_log = ', '.join(users) + ' are in the chat'
        print('chat_log_value ' + chat_log)
        return render(request, './chat.html', {'room_name': chat_room,
                                               'user_me': request.user.username,
                                               'multi_chat': multi_chat,
                                               'chat_id': chat_id,
                                               'chat_log_value': chat_log})


def user_guest(request, username):
    """Shows a readonly page of a user's profile.
    """
    if(username == request.user.username):
        return HttpResponseRedirect('../')
    return render(request, './user.html', {"user_name": username})


def users_search(request):
    return render(request, './search.html')


def user_home(request):
    return render(request, './home.html')


def user_logout(request):
    logout(request)
    return HttpResponseRedirect('../login')


def user_login(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('../')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                if not user.first_name and not user.last_name:
                    return HttpResponseRedirect('../register-complete/')
                else:
                    return HttpResponseRedirect('../')
            else:
                return render(request, './auth/login.html', {'error_text': 'Account disabled'}, status=HTTPStatus.FORBIDDEN)
        else:
            return render(request, './auth/login.html', {'error_text': 'Wrong credentials'}, status=HTTPStatus.FORBIDDEN)
    else:
        return render(request, './auth/login.html')


def register(request):
    """Creates a new user in the system.
    """
    if request.user.is_authenticated:
        return HttpResponseRedirect('../')
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            login(request, user)
            return HttpResponseRedirect('../register-complete/')
    else:
        user_form = UserForm()

    return render(request, './auth/register.html', {'user_form': user_form})


def register_complete(request):
    """Completes user profile by saving UserInfo fields.
    """
    if UserInfo.objects.filter(user__username=request.user.username):
        return HttpResponseRedirect('../')
    if request.method == 'POST':
        form = UserInfoForm(request.POST, request.FILES)
        if form.is_valid():
            user = User.objects.get(id=request.user.id)
            user.first_name = request.POST['first_name']
            user.last_name = request.POST['last_name']
            user.save()
            user_profile = UserInfo.objects.create(user=user)
            user_profile.save()
            form = UserInfoForm(request.POST, request.FILES,
                                instance=user_profile)
            form.save()
            return HttpResponseRedirect('../')
    else:
        form = UserInfoForm()

    return render(request, './auth/register-complete.html', {'user_form': form, 'hide_nav': True})
