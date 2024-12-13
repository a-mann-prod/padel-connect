from main_app.permissions import IsAuthenticated, IsOwner
from rest_framework import viewsets, status
from rest_framework.response import Response
from main_app.models import TeamInvite, enums
from main_app.serializers import MeMatchTeamInviteSerializer
from main_app import mixins
from main_app.business.match_team_invite import team_invite_request_answer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action


class MeTeamInvitateModelViewSet(mixins.ExcludeDatesFieldsMixin, mixins.BlockCRUDMixin, viewsets.ModelViewSet):
    queryset = TeamInvite.objects.all()
    serializer_class = MeMatchTeamInviteSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = TeamInvite.objects.filter(user=self.request.user, status=enums.RequestStatus.PENDING)

        return queryset
    
    @action(detail=True, methods=['post'], url_path=r'(?P<action>accept|refuse)')
    def response(self, request, pk, action=None):
        """POST /me/invitations/{id}/{action}/ - Accepte ou refuse une invitation."""
        if action not in ['accept', 'refuse']:
            return Response({"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)
        
        team_invite = get_object_or_404(TeamInvite, pk=pk)
        
        next_status = enums.RequestStatus.ACCEPTED if action == 'accept' else enums.RequestStatus.REFUSED

        try:
            team_invite_request_answer(request, team_invite, action, next_status)
            if action == 'accept':
                return Response({"detail": "Team invitation has been accepted."}, status=status.HTTP_200_OK)

            elif action == 'refuse':
                return Response({"detail": "Team invitation has been refused."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
