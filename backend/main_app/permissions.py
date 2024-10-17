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