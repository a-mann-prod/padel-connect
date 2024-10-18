from rest_framework import serializers
from main_app.models import MatchRequest
from main_app import mixins


class MatchRequestSerializer(mixins.ExcludeDatesFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MatchRequest
        exclude = ['user']