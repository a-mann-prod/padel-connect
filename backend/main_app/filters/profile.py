import django_filters
from main_app.models import Profile
from django_filters import rest_framework as filters
from django.db.models import Q, Func, Value

# Créer une fonction d'annotation pour normaliser les accents
class RemoveAccents(Func):
    function = 'unaccent'

class ProfileFilter(django_filters.FilterSet):
    ids = filters.BaseInFilter(field_name='id', lookup_expr='in')
    search = filters.CharFilter(method='filter_search', label="Search in profiles")
    
    class Meta:
        model = Profile
        exclude = ['avatar_url']

    def filter_search(self, queryset, name, value):
        # Utilisation de la fonction RemoveAccents pour normaliser la recherche
        normalized_search = RemoveAccents(Value(value)).resolve_expression(queryset.query)

        return queryset.annotate(
            normalized_first_name=RemoveAccents('first_name'),
            normalized_last_name=RemoveAccents('last_name')
        ).filter(
            Q(normalized_first_name__icontains=normalized_search) |
            Q(normalized_last_name__icontains=normalized_search)
        )