from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from main_app.models import Notification
from main_app.serializers import NotificationSerializer
from main_app import permissions
from main_app import mixins

class MeNotificationViewSet(mixins.BlockCRUDMixin, viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsOwner]

    block_list = False


    def get_queryset(self):
        """Retrieve only notifications for the authenticated user."""
        return Notification.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='unread_count')
    def unread_count(self, request):
        """GET /me/notifications/unread_count/"""
        count = Notification.objects.filter(user=request.user, is_read=False).count()
        return Response(count, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='read_all')
    def read_all(self, request):
        """POST /me/notifications/read_all/"""
        updated_count = Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
        if updated_count > 0:
            return Response({"detail": "All notifications marked as read."}, status=status.HTTP_200_OK)
        return Response({"detail": "No unread notifications."}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='mark_as_read')
    def mark_as_read(self, request, pk=None):
        """POST /me/notifications/{id}/"""
        try:
            notification = Notification.objects.get(pk=pk, user=request.user)
        except Notification.DoesNotExist:
            return Response({"detail": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)

        if notification.is_read:
            return Response({"detail": "Notification already marked as read."}, status=status.HTTP_400_BAD_REQUEST)

        notification.is_read = True
        notification.save()
        return Response({"detail": "Notification marked as read."}, status=status.HTTP_200_OK)
