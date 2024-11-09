from main_app.serializers import CustomUserSerializer
from .models import Conversation, Message
from rest_framework import serializers


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        exclude = ['conversation']
        read_only_fields = ['user']



class ConversationSerializer(serializers.ModelSerializer):    
    last_message = MessageSerializer(read_only=True)

    class Meta:
        model = Conversation
        exclude = ['match']
