from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsSuperAdminOrReadOnly(BasePermission):
    """
    Permission which allowed superadmins to do everything
    Others are in read only
    """
    def has_permission(self, request, view):
        # SAFE_METHODS includes GET, OPTIONS and HEAD (read only))
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_superuser
    
class IsAuthenticated(BasePermission):
    """
    Permission which allowed authenticated users to CRUD
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated
    
class IsAuthenticatedOrReadOnly(BasePermission):
    """
    Permission which allowed authenticated users to CRUD
    Others are in read only
    """
    def has_permission(self, request, view):
        # SAFE_METHODS includes GET, OPTIONS and HEAD (read only))
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated
    
class IsOwner(BasePermission):
    """
    Permission which allowed owner to CRUD their own ressource 
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
    
    
class IsOwnerOrReadOnly(BasePermission):
    """
    Permission which allowed owner to CRUD their own ressource 
    Others are in read only
    """

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS includes GET, OPTIONS and HEAD (read only))
        if request.method in SAFE_METHODS:
            return True
        
        return obj.user == request.user

