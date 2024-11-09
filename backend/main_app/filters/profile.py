import django_filters
from main_app.models import Profile
from django_filters import rest_framework as filters

class ProfileFilter(django_filters.FilterSet):
    ids = filters.BaseInFilter(field_name='id', lookup_expr='in')
    
    class Meta:
        model = Profile
        exclude = ['avatar_url']