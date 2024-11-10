from rest_framework import viewsets
from main_app.serializers import ProfileSerializer
from main_app.models import Profile
from .generic_views import MeRelatedObjectView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, Func, Value, Value
from main_app.filters import ProfileFilter


# Créer une fonction d'annotation pour normaliser les accents
class RemoveAccents(Func):
    function = 'unaccent'  # Utilisation de la fonction unaccent de PostgreSQL

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filterset_class = ProfileFilter


    def get_queryset(self):
        queryset = Profile.objects.all()

        current_user = self.request.user
        if current_user.is_authenticated:
            queryset = queryset.exclude(user=current_user)
        
        # TODO A déplacer un jour dans ProfileFilter
        search_param = self.request.query_params.get('search', None)
        if search_param:
            normalized_search = RemoveAccents(Value(search_param)).resolve_expression(queryset.query)

            queryset = queryset.annotate(
                normalized_first_name=RemoveAccents('first_name'),
                normalized_last_name=RemoveAccents('last_name')
            ).filter(
                Q(normalized_first_name__icontains=normalized_search) | 
                Q(normalized_last_name__icontains=normalized_search)
            )

        return queryset

class MeProfileView(MeRelatedObjectView):
    model = Profile
    serializer_class = ProfileSerializer
    user_related_field = 'profile'


    def delete(self, request):
        try:
            profile = self.get_object(request.user)
            
            if profile.avatar_url:
                profile.avatar_url.delete(save=False) 
                profile.avatar_url = None
                profile.save()
                return Response({"message": "Avatar deleted."}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"message": "No avatar to delete."}, status=status.HTTP_400_BAD_REQUEST)
        
        except Profile.DoesNotExist:
            return Response({"error": "Avatar not found."}, status=status.HTTP_404_NOT_FOUND)
