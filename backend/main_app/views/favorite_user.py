from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from main_app.models import CustomUser, Profile
from main_app.serializers import ProfileSerializer
from main_app.pagination import CustomPageNumberPagination
from django.conf import settings


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
        try:
            user_to_modify = CustomUser.objects.get(pk=pk)
            if action == 'add':
                if user_to_modify in request.user.favorite_users.all():
                    return Response({"detail": "User is already in favorites."}, status=status.HTTP_400_BAD_REQUEST)
        
                request.user.favorite_users.add(user_to_modify)

                serializer = ProfileSerializer(user_to_modify.profile, context={'request': request})
                return Response(serializer.data)
            elif action == 'remove':
                if user_to_modify not in request.user.favorite_users.all():
                    return Response({"detail": "User is not in favorites."}, status=status.HTTP_400_BAD_REQUEST)

                request.user.favorite_users.remove(user_to_modify)
                return Response({"detail": "Removed from favorites."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
