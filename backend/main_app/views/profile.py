from rest_framework import viewsets
from main_app.serializers import ProfileSerializer
from main_app.models.profile import Profile

from main_app.filters import ProfileFilter

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filterset_class = ProfileFilter

    def get_queryset(self):
        queryset = Profile.objects.all().filter(
            user__is_staff=False, 
            user__is_active=True, 
            user__is_onboarding_completed=True
        )
        ids_param = self.request.query_params.get('ids')

        if ids_param:
            return queryset

        current_user = self.request.user
        if current_user.is_authenticated:
            return queryset.exclude(user=current_user)
        
        return queryset
