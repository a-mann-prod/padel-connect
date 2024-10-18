from rest_framework import serializers
from main_app.models import FavoriteUser
from main_app import mixins

class FavoriteUserSerializer(mixins.ExcludeDatesFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FavoriteUser
        exclude = ['user']