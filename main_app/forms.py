from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm
from main_app.models import Author, Review


class EmailUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = Author
        fields = ('username', 'email', 'password1', 'password2')


class ReviewForm(ModelForm):
    class Meta:
        model = Review
        fields = ('title', 'rating', 'review',)