from rest_framework import serializers
from main_app.models import Complex

class ComplexSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Complex
        fields = '__all__'