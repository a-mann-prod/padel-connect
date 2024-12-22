import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser

from .models import Message, Conversation
from .serializers import MessageSerializer

import logging

logger = logging.getLogger('django')
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        logger.info("connection")
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # close for AnonymousUser
        user = self.scope.get('user')
        if user == AnonymousUser():
            self.close()

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data=None, bytes_data=None):
        # parse the json data into dictionary object
        text_data_json = json.loads(text_data)

        conversation = Conversation.objects.get(id=int(self.room_name))

        message = Message.objects.create(
            user=self.scope["user"],
            content=text_data_json["message"],
            conversation=conversation,
        )

        serializer = MessageSerializer(instance=message)
        message_data = serializer.data

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "chat_message",
                "message_data": message_data
            },
        )

    # Receive message from room group
    def chat_message(self, event):
        message_data = event["message_data"]

        # Send message to WebSocket
        self.send(
            text_data=json.dumps(message_data)
        )