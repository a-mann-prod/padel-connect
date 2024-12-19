from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from typing import List


def handle_exception(e: ValidationError, default_status=status.HTTP_400_BAD_REQUEST):

    if hasattr(e, 'default_detail') and hasattr(e, 'default_code'):
        return Response(
            {
                'error': {
                    'detail': e.detail,
                    'code': e.get_codes()
                }
            },
            status=default_status
        )
    else:
        return Response(
            {
                'error': {
                    'detail': str(e),
                }
            },
            status=default_status
        )
