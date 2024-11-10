from rest_framework import serializers
from main_app.models import Tournament
from main_app import mixins
from . import ComplexSerializer


class TournamentSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    complex = ComplexSerializer(read_only=True)

    class Meta:
        model = Tournament
        fields = '__all__'

class TournamentDetailSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    complex = ComplexSerializer(read_only=True)

    class Meta:
        model = Tournament
        fields = '__all__'