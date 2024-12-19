from rest_framework.exceptions import PermissionDenied, ValidationError
from main_app.models import Team, enums
from rest_framework.exceptions import PermissionDenied, ValidationError


def delete_avatar(profile):
    if profile.avatar_url:
        profile.avatar_url.delete(save=False) 
        profile.avatar_url = None
        profile.save()
        return 
    
    raise ValidationError(detail="No avatar to delete.")
    