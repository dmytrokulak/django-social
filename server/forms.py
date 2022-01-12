from django import forms
from .models import *
from django.contrib.auth.models import User


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    password2 = forms.CharField(widget=forms.PasswordInput())

    def clean(self):
        cleaned_data = super().clean()
        pwd1 = cleaned_data.get("password")
        pwd2 = cleaned_data.get("password2")

        if pwd1 and pwd2 and pwd1 != pwd2:
            self.add_error('password2', "Password do not match")

    class Meta:
        model = User
        fields = {'username', 'email', 'password', 'password2'}


class UserInfoForm(forms.ModelForm):
    first_name = forms.CharField(max_length=50, required=True)
    last_name = forms.CharField(max_length=50, required=True)
    profile_picture = forms.FileField()

    class Meta:
        model = UserInfo
        fields = {'first_name', 'last_name', 'interests', 'profile_picture'}

    def __init__(self, *args, **kwargs):
        super(UserInfoForm, self).__init__(*args, **kwargs)
        self.fields['profile_picture'].required = False
