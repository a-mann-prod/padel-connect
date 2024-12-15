from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from main_app.external_services.four_padel_client import FourPadelAPIClient 
from rest_framework.exceptions import ValidationError
from datetime import datetime
from main_app.permissions import IsAuthenticated


class BookingView(APIView):
    """
    View to fetch booking from an 4Padel API and expose them.
    """

    permission_classes = [IsAuthenticated]


    def get(self, request, *args, **kwargs):
        client = FourPadelAPIClient()

        date = request.query_params.get('date')

        if not date:
            raise ValidationError({"detail": "'date' parameter is required."})
        

        # Check format
        try:
            datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            raise ValidationError({"detail": "'date' parameter must be in 'YYYY-MM-DD' format"})

        try:
            data = client.get_booking_rules(date)
            return Response(data, status=status.HTTP_200_OK)
        except RuntimeError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
