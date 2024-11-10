from .models import Conversation, Match
from .serializers import MessageSerializer, ConversationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from main_app.pagination import CustomPageNumberPagination
from django.conf import settings
from main_app.permissions import IsAuthenticated


class MatchConversationView(APIView): 
    permission_classes= [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            conversation = Conversation.objects.get(match_id=pk)
            serializer = ConversationSerializer(conversation, context={'request': request})

            return Response(serializer.data, status=status.HTTP_200_OK)


        except Conversation.DoesNotExist:
            return Response({"detail": "Conversation not found."}, status=status.HTTP_404_NOT_FOUND)



# TODO Création et récupération uniquement pour les utilisateurs qui sont considérés comme joueur
class MatchMessagesView(APIView):
    permission_classes= [IsAuthenticated]

    def get(self, request, pk):

        try:
            match = Match.objects.get(pk=pk)
            conversation = match.conversation
        except Conversation.DoesNotExist:
            return Response({"detail": "Conversation not found."}, status=status.HTTP_404_NOT_FOUND)

        messages = conversation.messages.all().order_by('-created_at')  # Trier par date, du plus récent au plus ancien

        # Pagination des messages
        paginator = CustomPageNumberPagination()
        paginator.page_size = settings.REST_FRAMEWORK.get('PAGE_SIZE', 10)
        paginated_messages = paginator.paginate_queryset(messages, request)
                
        # Sérialiser les messages paginés
        serializer = MessageSerializer(paginated_messages, many=True, context={'request': request})

        return paginator.get_paginated_response(serializer.data)


    def post(self, request, pk):
        try:
            conversation = Conversation.objects.get(match_id=pk)
        except Conversation.DoesNotExist:
            return Response({"detail": "Conversation not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            # Enregistrer le message
            serializer.save(user=request.user, conversation=conversation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)