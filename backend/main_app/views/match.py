from rest_framework import viewsets
from main_app.serializers import MatchSerializer, MatchDetailSerializer
from main_app.models import Match
from main_app import permissions, mixins
from main_app.filters import MatchFilter

class MatchViewSet(mixins.CustomModelViewSet, viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    detail_serializer_class = MatchDetailSerializer

    filterset_class = MatchFilter
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, permissions.IsOwnerOrReadOnly]


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # def get_queryset(self):
    #     queryset = Match.objects.all()
        
    #     level_param = self.request.query_params.get('search', None)
    #     if search_param:
    #         normalized_search = RemoveAccents(Value(search_param)).resolve_expression(queryset.query)

    #         queryset = queryset.annotate(
    #             normalized_first_name=RemoveAccents('first_name'),
    #             normalized_last_name=RemoveAccents('last_name')
    #         ).filter(
    #             Q(normalized_first_name__icontains=normalized_search) | 
    #             Q(normalized_last_name__icontains=normalized_search)
    #         )

    #     return queryset

    