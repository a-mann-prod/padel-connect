from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token
from channels.middleware import BaseMiddleware

import jwt
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from asgiref.sync import sync_to_async
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger('django')

@sync_to_async
def get_user_from_jwt(token):
    try:
        # Valid token
        UntypedToken(token)
        # Decode token to get payload info
        decoded_data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_data.get("user_id")
        user_model = get_user_model()

        return user_model.objects.get(id=user_id)
    except (InvalidToken, TokenError, user_model.DoesNotExist):
        return AnonymousUser()


# HEADER BASED
class TokenAuthMiddleware(BaseMiddleware):

    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        scope['user'] = AnonymousUser()

        if b'sec-websocket-protocol' in headers:
            token_name, token_key = headers[b'sec-websocket-protocol'].decode().replace(",", " ").split()
            if token_name == settings.SIMPLE_JWT['AUTH_HEADER_TYPES'][0]:
                logger.info("User authenticated")
                scope['user'] = await get_user_from_jwt(token_key)
        return await super().__call__(scope, receive, send)


# QUERYPARAM BASED
# class TokenAuthMiddleware(BaseMiddleware):

#     def __init__(self, inner):
#         self.inner = inner

#     async def __call__(self, scope, receive, send):
#         query_string = scope.get('query_string').decode()
#         token_key = None
#         token_query_string = f"{settings.SIMPLE_JWT['AUTH_HEADER_TYPES'][0]}="
#         if token_query_string in query_string:
#             token_key = query_string.split(token_query_string)[1]
#             scope['user'] = await get_user_from_jwt(token_key)
#         else:
#             scope['user'] = AnonymousUser()
#         print(f"User assigned in middleware: {scope['user']}")  # Log pour vérifier
#         return await super().__call__(scope, receive, send)