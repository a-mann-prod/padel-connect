from rest_framework import serializers
from main_app.models import Match, Complex
from main_app import mixins
from main_app.serializers import ComplexSerializer


class MatchSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    complex = ComplexSerializer(read_only=True)
    complex_id = serializers.PrimaryKeyRelatedField(
        queryset=Complex.objects.all(), source='complex', write_only=True
    )

    class Meta:
        model = Match
        fields = '__all__'

class MatchDetailSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    complex = ComplexSerializer(read_only=True)
    complex_id = serializers.PrimaryKeyRelatedField(
        queryset=Complex.objects.all(), source='complex', write_only=True
    )

    class Meta:
        model = Match
        fields = '__all__'