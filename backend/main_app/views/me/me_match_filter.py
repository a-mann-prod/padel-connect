from ..generic_views import MeRelatedObjectView
from main_app.models.match_filter import MatchFilter
from main_app.serializers import MatchFilterSerializer

class MeMatchFilterView(MeRelatedObjectView):
    model = MatchFilter
    serializer_class = MatchFilterSerializer
    user_related_field = 'match_filter'
    