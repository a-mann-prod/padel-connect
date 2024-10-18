from rest_framework import serializers
from main_app.models import Tournament
from main_app import mixins


class TournamentSerializer(mixins.ExcludeDatesFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'