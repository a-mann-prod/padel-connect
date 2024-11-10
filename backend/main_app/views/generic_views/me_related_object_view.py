from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class MeRelatedObjectView(APIView):
    permission_classes = [IsAuthenticated]
    model = None
    serializer_class = None
    user_related_field = None

    def get_object(self, user):
        """
        Récupère l'objet lié à l'utilisateur. Lève une erreur si le modèle ou le champ n'est pas défini.
        """
        if not self.model or not self.user_related_field:
            raise NotImplementedError("Model and user_related_field must be defined.")
        
        try:
            return getattr(user, self.user_related_field)
        except self.model.DoesNotExist:
            return None

    def get(self, request):
        obj = self.get_object(request.user)
        if obj is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(obj, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        obj = self.get_object(request.user)
        if obj is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(obj, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
