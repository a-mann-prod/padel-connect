from rest_framework.exceptions import ValidationError


def delete_avatar(profile):
    if profile.avatar_url:
        profile.avatar_url.delete(save=False) 
        profile.avatar_url = None
        profile.save()
        return 
    
    raise ValidationError(detail="No avatar to delete.")
    