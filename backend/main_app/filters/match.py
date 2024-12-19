import django_filters
from main_app.models import Match
from django_filters import rest_framework as filters
from django.db.models import Q

class MatchFilter(django_filters.FilterSet):
    start_datetime = filters.DateTimeFilter(field_name="datetime", lookup_expr='gte')
    end_datetime = filters.DateTimeFilter(field_name="datetime", lookup_expr='lte')

    level_min = filters.NumberFilter(method='filter_level_min')
    level_max = filters.NumberFilter(method='filter_level_max')

    class Meta:
        model = Match
        fields = '__all__'

    def filter_level_min(self, queryset, name, value):
        """
        Filtre les matchs avec un niveau >= level_min ou is_open_to_all_level == True.
        """
        return queryset.filter(Q(level__gte=value) | Q(is_open_to_all_level=True))

    def filter_level_max(self, queryset, name, value):
        """
        Filtre les matchs avec un niveau <= level_max ou is_open_to_all_level == True.
        """
        return queryset.filter(Q(level__lte=value) | Q(is_open_to_all_level=True))