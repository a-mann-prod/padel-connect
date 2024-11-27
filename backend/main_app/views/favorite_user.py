from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from main_app.models import CustomUser, Profile
from main_app.serializers import ProfileSerializer
from main_app.pagination import CustomPageNumberPagination
from django.conf import settings
from main_app.business.favorite_user import toggle_favorite_user


class MeFavoriteUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """GET /me/favorite_users/ - Affiche les utilisateurs favoris de l'utilisateur connecté."""
        favorites = Profile.objects.filter(user__in=request.user.favorite_users.all())

        paginator = CustomPageNumberPagination()
        paginator.page_size = settings.REST_FRAMEWORK.get('PAGE_SIZE', 10)
        paginated_favorites = paginator.paginate_queryset(favorites, request)

        serializer = ProfileSerializer(paginated_favorites, many=True, context={'request': request})
        
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, pk, action=None):
        """POST /me/favorite_users/{id}/{action}/ - Ajoute ou retire un utilisateur des favoris."""
        if action not in ['add', 'remove']:
            return Response({"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            data = toggle_favorite_user(request, pk, action)
            if action == 'add':
                return Response(data, status=status.HTTP_201_CREATED)
            elif action == 'remove':
                return Response({"detail": "Removed from favorites."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
