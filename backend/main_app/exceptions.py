from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from enum import Enum
import logging

logger = logging.getLogger('django')


class ErrorCode(Enum):
    ALREADY_INVITED = "ALREADY_INVITED"
    LEVEL_NOT_MATCH = "LEVEL_NOT_MATCH"
    MATCH_FULL = "MATCH_FULL"
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS"
    SETS_MUST_BE_IDENTICAL = "SETS_MUST_BE_IDENTICAL"
    TIE_BREAKS_MUST_BE_IDENTICAL = "TIE_BREAKS_MUST_BE_IDENTICAL"
    INVALID_SET_SCORE = "INVALID_SET_SCORE"


def handle_exception(e: ValidationError, default_status=status.HTTP_400_BAD_REQUEST):
    logger.error(e.detail)

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
