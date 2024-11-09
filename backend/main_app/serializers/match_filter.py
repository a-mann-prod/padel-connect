from rest_framework import serializers
from main_app.models import MatchFilter
from main_app import mixins

class MatchFilterSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = MatchFilter
        exclude = ['user']
        read_only_fields = ['user']
