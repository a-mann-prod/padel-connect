from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from main_app.external_services.four_padel_client import FourPadelAPIClient 
from rest_framework.exceptions import ValidationError
from datetime import datetime
from main_app.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from main_app.models import Complex
from main_app.exceptions import handle_exception



class BookingView(APIView):
    """
    View to fetch booking from an 4Padel API and expose them.
    """
    permission_classes = [IsAuthenticated]


    def get(self, request, *args, **kwargs):
        user = request.user
        print(user.four_padel_id)
        client = FourPadelAPIClient(id=user.four_padel_id)

        date = request.query_params.get('date')
        complex_id = request.query_params.get('complex')

        if not date:
            return handle_exception(ValidationError(detail="'date' parameter is required") )
        
        if not complex_id:
            return handle_exception(ValidationError(detail="'complex' parameter is required") )

        # Check format
        try:
            datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            return handle_exception(ValidationError(detail="date' parameter must be in 'YYYY-MM-DD' format") )        

        complex = get_object_or_404(Complex, pk=complex_id)

        try:
            data = client.get_booking_rules(complex.four_padel_id, date)
            return Response(data, status=status.HTTP_200_OK)
        except RuntimeError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
