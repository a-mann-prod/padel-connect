from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from main_app.external_services.four_padel_client import FourPadelAPIClient
from main_app.models import CustomUser
from main_app.exceptions import handle_exception

class FourPadelLoginView(APIView):
    # LOGIN
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"detail": "email and password fields required"}, status=status.HTTP_400_BAD_REQUEST)

        client = FourPadelAPIClient()

        try:
            # Connexion à 4Padel pour récupérer le token
            four_padel_user = client.login(username=email, password=password)

            # Vérifie si l'utilisateur existe localement, sinon le crée
            user, created = CustomUser.objects.get_or_create(
                four_padel_id=four_padel_user.id,
                defaults={
                    "email": four_padel_user.email
                }
            )

            # Crée un RefreshToken (via Djoser) pour le local user
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh)            
            })

        except Exception as e:
            return handle_exception(e)