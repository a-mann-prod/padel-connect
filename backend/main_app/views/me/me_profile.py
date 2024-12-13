from main_app.serializers import ProfileSerializer
from main_app.models import Profile
from main_app.views.generic_views import MeRelatedObjectView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from main_app.business.me_profile import delete_avatar


class MeProfileView(MeRelatedObjectView):
    model = Profile
    serializer_class = ProfileSerializer
    user_related_field = 'profile'
    

    def delete(self, request):
        profile = get_object_or_404(request.user)

        try:
            delete_avatar(profile)
            return Response({"message": "Avatar deleted."}, status=status.HTTP_204_NO_CONTENT)        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
