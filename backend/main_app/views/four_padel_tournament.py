from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status
from main_app.external_services.four_padel_client import FourPadelAPIClient
from main_app.exceptions import handle_exception
from django.shortcuts import get_object_or_404
from datetime import datetime
from main_app.models import Complex


class FourPadelTournamentView(APIView):
    def get(self, request):
        client = FourPadelAPIClient()

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

            data = client.get_tournaments(complex, date)
            return Response(data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return handle_exception(e)
        

class FourPadelTournamentDetailView(APIView):
    def get(self, request, pk):
        client = FourPadelAPIClient()

        try:
            data = client.get_tournament(pk)
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return handle_exception(e)
