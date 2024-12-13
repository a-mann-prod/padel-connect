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


    def filter_level(self, queryset, name, value):
        """
        Applique le filtre de niveau si is_open_to_all_level est False.
        """
        # On commence par filtrer les matchs ouverts à tous les niveaux
        open_to_all_queryset = queryset.filter(is_open_to_all_level=True)

        # Si le match n'est pas ouvert à tous les niveaux, appliquer le filtre de niveau
        if name == 'level_min' or name == 'level_max':
            restricted_queryset = queryset.filter(is_open_to_all_level=False)
            if 'level_min' in self.data:
                restricted_queryset = restricted_queryset.filter(level__gte=self.data.get('level_min'))
            if 'level_max' in self.data:
                restricted_queryset = restricted_queryset.filter(level__lte=self.data.get('level_max'))
        else:
            restricted_queryset = queryset

        # Combiner les deux QuerySets (ceux ouverts à tous les niveaux et ceux filtrés)
        return open_to_all_queryset | restricted_queryset