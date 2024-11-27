import django_filters
from main_app.models import Match
from django_filters import rest_framework as filters

class MatchFilter(django_filters.FilterSet):
    start_datetime = filters.DateTimeFilter(field_name="datetime", lookup_expr='gte')
    end_datetime = filters.DateTimeFilter(field_name="datetime", lookup_expr='lte')

    level_min = filters.NumberFilter(field_name="level", lookup_expr='gte')
    level_max = filters.NumberFilter(field_name="level", lookup_expr='lte')

    class Meta:
        model = Match
        fields = '__all__'