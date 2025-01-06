from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
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

        try:
            if not email or not password:
                raise ValidationError(detail="'email' and 'password' parameters are required")

            client = FourPadelAPIClient()

            # Connexion à 4Padel pour récupérer le token
            four_padel_user = client.login(username=email, password=password)

            # Vérifie si l'utilisateur existe localement, sinon le crée
            user, created = CustomUser.objects.get_or_create(
                four_padel_id=four_padel_user.id,
                defaults={
                    "email": four_padel_user.email
                }
            )
            user.set_four_padel_token(four_padel_user.token)
            user.save()


            # Crée un RefreshToken (via Djoser) pour le local user
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh)            
            })

        except Exception as e:
            return handle_exception(e)


class FourPadelGoogleLoginView(APIView):
    def post(self, request, *args, **kwargs):
        google_token = request.data.get("google_token")

        if not google_token:
            return Response({"detail": "google_token param is required"}, status=status.HTTP_400_BAD_REQUEST)

        client = FourPadelAPIClient()

        try:
            # Connexion à 4Padel pour récupérer le token
            four_padel_user = client.google_login(google_token=google_token)

            # Vérifie si l'utilisateur existe localement, sinon le crée
            user, created = CustomUser.objects.get_or_create(
                four_padel_id=four_padel_user.id,
                defaults={
                    "email": four_padel_user.email
                }
            )
            user.set_four_padel_token(four_padel_user.token)
            user.save()

            # Crée un RefreshToken (via Djoser) pour le local user
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh)            
            })

        except Exception as e:
            return handle_exception(e)
