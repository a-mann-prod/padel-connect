from rest_framework import viewsets
from main_app.serializers import ComplexSerializer
from main_app.models.complex import Complex
from main_app import permissions

class ComplexViewSet(viewsets.ModelViewSet):
    queryset = Complex.objects.all()
    serializer_class = ComplexSerializer
    permission_classes = [permissions.IsSuperAdminOrReadOnly]