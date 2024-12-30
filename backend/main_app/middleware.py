import logging
from django.utils.deprecation import MiddlewareMixin

class LogRequestMiddleware(MiddlewareMixin):
    def process_request(self, request):
        logger = logging.getLogger('django')
        logger.info(
            f"Request: {request.method} {request.path}"
        )

    def process_response(self, request, response):
        logger = logging.getLogger('django')
        user = request.user if request.user.is_authenticated else 'Anonymous'
        logger.info(
            f"Response to {user}: {request.method} {request.path} - {response.status_code}"
        )
        return response