from rest_framework.response import Response
from rest_framework import status


# add create ?
DETAIL_ACTIONS = ['retrieve', 'update', 'partial_update']


class CustomModelViewSet:
    def get_serializer_class(self):
        if self.action in DETAIL_ACTIONS:
            if hasattr(self, 'detail_serializer_class'):
                return self.detail_serializer_class
            
        if self.action == 'list':
            if hasattr(self, 'list_serializer_class'):
                return self.list_serializer_class

        return super(CustomModelViewSet, self).get_serializer_class()

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
    

class BlockCRUDMixin:
    block_create = True
    block_list = True
    block_retrieve = True
    block_update = True
    block_destroy = True


    """
    Mixin to block CRUD actions.
    """
    def create(self, request, *args, **kwargs):
        """
        Block creation (403 Forbidden).
        """
        if self.block_create: 
            return Response({"detail": "Creation is not allowed."}, status=status.HTTP_403_FORBIDDEN)
        return super().create(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        """
        Block detail read (403 Forbidden).
        """
        if self.block_list: 
            return Response({"detail": "Listing is not allowed."}, status=status.HTTP_403_FORBIDDEN)
        return super().list(request, *args, **kwargs)
        
    def retrieve(self, request, *args, **kwargs):
        """
        Block detail read (403 Forbidden).
        """
        if self.block_retrieve: 
            return Response({"detail": "Detail read is not allowed."}, status=status.HTTP_403_FORBIDDEN)
        return super().retrieve(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        """
        Block update (403 Forbidden).
        """
        if self.block_update: 
            return Response({"detail": "Update is not allowed."}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Block deletion (403 Forbidden).
        """
        if self.block_destroy: 
            return Response({"detail": "Deletion is not allowed."}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
    

    

class ExcludeDatesFieldsMixin:
    """
    Mixin to exclude dates fields (like 'created_at' and 'updated_at') from being updated.
    """
    exclude_fields = ['created_at', 'updated_at']

    def update(self, instance, validated_data):
        for field in self.exclude_fields:
            validated_data.pop(field, None)

        return super().update(instance, validated_data)
        