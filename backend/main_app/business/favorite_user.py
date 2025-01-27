from main_app.models.custom_user import CustomUser
from rest_framework.exceptions import NotFound, ValidationError
from django.shortcuts import get_object_or_404


def toggle_favorite_user(request, user_pk, action):
    current_user = request.user

    user_to_modify = get_object_or_404(CustomUser, pk=user_pk)

    if action == 'add':
        if user_to_modify in current_user.favorite_users.all():
            raise ValidationError(detail="User is already in favorites.")

        current_user.favorite_users.add(user_to_modify)
        return user_to_modify.profile
    
    elif action == 'remove':
        if user_to_modify not in current_user.favorite_users.all():
            raise ValidationError(detail="User is not in favorites.")

        current_user.favorite_users.remove(user_to_modify)
        return 
