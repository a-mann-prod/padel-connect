from rest_framework.response import Response
from rest_framework import status

class BlockCreateDestroyMixin:
    """
    Mixin to block create and destroy actions.
    """
    def create(self, request, *args, **kwargs):
        """
        Block creation (403 Forbidden).
        """
        return Response({"detail": "Creation is not allowed."}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        """
        Block deletion (403 Forbidden).
        """
        return Response({"detail": "Deletion is not allowed."}, status=status.HTTP_403_FORBIDDEN)


class ExcludeDatesFieldsMixin:
    """
    Mixin to exclude dates fields (like 'created_at' and 'updated_at') from being updated.
    """
    exclude_fields = ['created_at', 'updated_at']

    def update(self, instance, validated_data):
        for field in self.exclude_fields:
            validated_data.pop(field, None)

        return super().update(instance, validated_data)