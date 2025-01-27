from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from main_app.models.notification import Notification
from main_app.serializers import NotificationSerializer
from main_app import permissions
from main_app import mixins
from main_app.exceptions import handle_exception
from rest_framework.exceptions import ValidationError

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

    @action(detail=False, methods=['post'], url_path='mark_as_read')
    def mark_as_read(self, request):
        """POST /me/notifications/mark_as_read/"""
        # Récupérer la liste des IDs à marquer comme lues
        notification_ids = request.data.get('ids', [])

        if not notification_ids:
            return handle_exception(ValidationError(detail="'ids' parameter is required"))        

        notifications = Notification.objects.filter(id__in=notification_ids, user=request.user, is_read=False)

        if not notifications.exists():
            return Response(0, status=status.HTTP_200_OK)

        updated_count = notifications.update(is_read=True)

        return Response(updated_count, status=status.HTTP_200_OK)
