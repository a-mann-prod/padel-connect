from rest_framework import serializers
from main_app.models import Profile
from main_app import mixins

class ProfileSerializer(mixins.ExcludeDatesFieldsMixin, serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Profile
        exclude = ['user']
