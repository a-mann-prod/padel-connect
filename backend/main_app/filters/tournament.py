import django_filters
from main_app.models import Tournament

class TournamentFilter(django_filters.FilterSet):
    class Meta:
        model = Tournament
        fields = '__all__'