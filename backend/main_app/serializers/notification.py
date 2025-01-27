from rest_framework import serializers
from main_app.models.notification import Notification
from main_app import mixins

class NotificationSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Notification
        read_only_fields = ['url', 'title', 'message', 'type', 'associated_data']
        exclude = ['user']
