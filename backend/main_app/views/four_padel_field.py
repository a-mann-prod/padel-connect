from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from main_app.external_services.four_padel_client import FourPadelAPIClient 
from rest_framework.exceptions import ValidationError
from datetime import datetime
from main_app.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from main_app.models.complex import Complex
from main_app.exceptions import handle_exception
from rest_framework.exceptions import AuthenticationFailed


class FourPadelFieldView(APIView):
    """
    View to fetch fields from an 4Padel API and expose them.
    """
    permission_classes = [IsAuthenticated]

    # List all available fields
    def get(self, request, *args, **kwargs):
        user = request.user
        client = FourPadelAPIClient(user=user)

        date = request.query_params.get('date')
        complex_id = request.query_params.get('complex')

        try:
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

            data = client.get_fields(complex.four_padel_id, date)
            return Response(data, status=status.HTTP_200_OK)
        except AuthenticationFailed as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return handle_exception(e)
