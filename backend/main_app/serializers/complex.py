from rest_framework import serializers
from main_app.models.complex import Complex
from main_app import mixins


class ComplexSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Complex
        fields = '__all__'