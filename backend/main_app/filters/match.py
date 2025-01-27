import django_filters
from main_app.models.match import Match
from django_filters import rest_framework as filters
from django.db.models import Q
from main_app.services.elo import get_elo_from_level

class MatchFilter(django_filters.FilterSet):
    start_datetime = filters.DateTimeFilter(field_name="datetime", lookup_expr='gte')
    end_datetime = filters.DateTimeFilter(field_name="datetime", lookup_expr='lte')

    level_min = filters.NumberFilter(method='filter_level_min')
    level_max = filters.NumberFilter(method='filter_level_max')

    class Meta:
        model = Match
        exclude = ['score_data']

    def filter_level_min(self, queryset, name, value):
        """
        Filtre les matchs avec un niveau >= level_min ou is_open_to_all_level == True.
        """
        elo_value = get_elo_from_level(value)
        return queryset.filter(Q(elo__gte=elo_value) | Q(is_open_to_all_level=True))

    def filter_level_max(self, queryset, name, value):
        """
        Filtre les matchs avec un niveau <= level_max ou is_open_to_all_level == True.
        """
        elo_value = get_elo_from_level(value)
        return queryset.filter(Q(elo__lte=elo_value) | Q(is_open_to_all_level=True))