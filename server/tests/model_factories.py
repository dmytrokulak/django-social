import factory
from factory import fuzzy
from server.models import *
from datetime import datetime


class UserFactory(factory.django.DjangoModelFactory):
    id = factory.sequence(lambda x: x)
    username = factory.LazyAttribute(lambda x: 'username' + str(x.id))
    first_name = factory.Faker('sentence', nb_words=1)
    last_name = factory.Faker('sentence', nb_words=1)
    email = factory.LazyAttribute(
        lambda x: x.first_name + "." + x.last_name + "@example.com")
    password = "pass123"

    class Meta:
        model = User


class UserStatusFactory(factory.django.DjangoModelFactory):
    status = factory.Faker('sentence', nb_words=5)
    timestamp = datetime(2021, 1, 1, 1, 0, 0, 0)

    class Meta:
        model = UserStatus


class UserMediaFactory(factory.django.DjangoModelFactory):
    type = MediaType.PHOTO
    data = 'server/static/uploads/user_1/img.png'

    class Meta:
        model = UserMedia


class UserInfoFactory(factory.django.DjangoModelFactory):
    user = factory.SubFactory(UserFactory)
    interests = factory.Faker('sentence', nb_words=5)
    profile_picture = 'server/static/uploads/user_1'
    statuses = factory.RelatedFactoryList(
        UserStatusFactory, size=5,
        user_id=factory.LazyAttribute(lambda x: x.factory_parent.user.id))
    media = factory.RelatedFactoryList(
        UserMediaFactory, size=5, user_id=factory.LazyAttribute(lambda x: x.factory_parent.user.id))
    friends = factory.RelatedFactoryList('server.tests.model_factories.UserFriendFactory', size=2,
                                         sender_id=factory.LazyAttribute(lambda x: x.factory_parent.user.id))
    requests = factory.RelatedFactoryList('server.tests.model_factories.FriendRequestFactory', size=2,
                                          receiver_id=factory.LazyAttribute(
                                              lambda x: x.factory_parent.user.id))

    class Meta:
        model = UserInfo


class UserFriendFactory(factory.django.DjangoModelFactory):
    receiver = factory.SubFactory(
        UserInfoFactory, friends=[], media=[], statuses=[], requests=[])
    status = RequestStatus.ACCEPTED

    class Meta:
        model = UserFriend


class FriendRequestFactory(factory.django.DjangoModelFactory):
    receiver = factory.SubFactory(
        UserInfoFactory, friends=[], media=[], statuses=[], requests=[])
    sender = factory.SubFactory(
        UserInfoFactory, friends=[], media=[], statuses=[], requests=[])
    status = RequestStatus.PENDING

    class Meta:
        model = UserFriend


class ChatRequestFactory(factory.django.DjangoModelFactory):
    receiver = factory.SubFactory(
        UserInfoFactory, friends=[], media=[], statuses=[], requests=[])
    sender = factory.SubFactory(
        UserInfoFactory, friends=[], media=[], statuses=[], requests=[])
    chat_room = fuzzy.FuzzyText(length=12)

    class Meta:
        model = ChatRequest
