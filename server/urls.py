from django.urls import include, path
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from . import api, views


class RestAPIUrls:
    urlpatterns = [
        path('me/info/',
             api.logged_user_info, name='logged_user_info'),
        path('me/status', api.logged_user_status_update,
             name='logged_user_status_update'),
        path('me/interests', api.logged_user_interests_update,
             name='logged_user_interests_update'),
        path('me/avatar', api.logged_user_profile_picture_update,
             name='logged_user_profile_picture_update'),
        path('me/media/<int:id>', api.logged_user_media_delete,
             name='logged_user_media_delete'),
        path('me/media/<str:media_type>', api.logged_user_media_upload,
             name='logged_user_media_upload'),
        path('me/friend/<int:id>', api.logged_user_friend,
             name='logged_user_friend'),
        path('me/chat/',
             api.logged_user_chats, name='logged_user_chats'),
        path('me/chat/<int:user_id>', api.logged_user_chat_add,
             name='logged_user_chat_add'),
        path('users/', api.get_users, name='get_users'),
        path('users/<str:username>', api.get_user, name='get_user'),
    ]


class ViewUrls:
    urlpatterns = [
        path('register/', views.register, name='register'),
        path('login/', views.user_login, name='login'),
        path('logout/', views.user_logout, name='logout'),
        path('register-complete/', login_required(login_url="../login/")
             (views.register_complete), name='complete_registration'),
        path('search/', login_required(login_url="../login/")
             (views.users_search), name='search'),
        path('users/<str:username>', login_required(login_url="../login/")
             (views.user_guest), name='user_guest'),
        path('users/<str:username>/chat/', login_required(login_url="../../../login/")
             (views.chat_room), name='chat_room'),
        path('', login_required(login_url="../login/")
             (views.user_home), name='home'),
    ]


class SwaggerUrls:
    urlpatterns = [
        path('apischema/', get_schema_view(
            title='Social Network API',
            url='/api/',
            urlconf=RestAPIUrls), name='openapi-schema'),
        path('swaggerdocs/', login_required(login_url="../login/")(TemplateView.as_view(
            template_name='swagger-docs.html',
            extra_context={'schema_url': 'openapi-schema'}
        )), name='swagger_ui'),
    ]


urlpatterns = [
    path('api/', include(RestAPIUrls)),
    path('', include(ViewUrls)),
    path('', include(SwaggerUrls)),
]
