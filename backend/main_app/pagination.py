from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPageNumberPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next_page': self.get_next_page_number(),
            'previous_page': self.get_previous_page_number(),
            'results': data,
        })

    def get_next_page_number(self):
        if self.page.has_next():
            return self.page.next_page_number()
        return None

    def get_previous_page_number(self):
        if self.page.has_previous():
            return self.page.previous_page_number()
        return None
