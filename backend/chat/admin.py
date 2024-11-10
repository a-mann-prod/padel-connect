from django.contrib import admin
from chat.models import Conversation, Message


# Register your models here.

class ConversationAdmin(admin.ModelAdmin):
    model = Conversation
    list_display = ('id', 'match', 'last_message')
admin.site.register(Conversation, ConversationAdmin)

class MessageAdmin(admin.ModelAdmin):
    model = Message
    list_display = ('id', 'content', 'user')
admin.site.register(Message, MessageAdmin)
