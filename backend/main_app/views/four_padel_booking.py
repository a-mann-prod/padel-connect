from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from main_app.external_services.four_padel_client import FourPadelAPIClient 
from rest_framework.exceptions import ValidationError
from main_app.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from main_app.models import Match
from main_app.exceptions import handle_exception


class FourPadelBookingView(APIView):
    """
    View to fetch booking from an 4Padel API and expose them.
    """
    permission_classes = [IsAuthenticated]

    # Detail of booking
    def get(self, request, pk=None, **kwargs):
        client = FourPadelAPIClient()

        try: 
            data = client.get_book_detail(pk)
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return handle_exception(e)
        
        
    # Create a reservation    
    def put(self, request, *args, **kwargs):
        user = request.user
        client = FourPadelAPIClient(user=user)

        match_id = request.data.get('match')
        
        if not match_id:
            return handle_exception(ValidationError(detail="'match' parameter is required") )    

        match = get_object_or_404(Match, pk=match_id)

        try:
            data = client.book_field(match)
            match.four_padel_booking_id = data['id']
            match.save()
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return handle_exception(e)
