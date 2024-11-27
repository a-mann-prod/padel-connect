from main_app.models import CustomUser
from rest_framework.exceptions import NotFound, ValidationError
from main_app.serializers import ProfileSerializer


def toggle_favorite_user(request, user_pk, action):
    current_user = request.user
    user_to_modify = CustomUser.objects.get(pk=user_pk)

    try:
        user_to_modify = CustomUser.objects.get(pk=user_pk)
    except CustomUser.DoesNotExist:
        raise NotFound("User not found.")


    if action == 'add':
        if user_to_modify in current_user.favorite_users.all():
            raise ValidationError("User is already in favorites.")

        current_user.favorite_users.add(user_to_modify)
        serializer = ProfileSerializer(user_to_modify.profile, context={'request': request})
        return serializer.data
    
    elif action == 'remove':
        if user_to_modify not in current_user.favorite_users.all():
            raise ValidationError("User is not in favorites.")

        current_user.favorite_users.remove(user_to_modify)
        return 
