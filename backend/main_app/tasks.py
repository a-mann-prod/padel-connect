from celery import shared_task
from .utils import send_push_notification

@shared_task
def async_send_notification(push_token, instance_data):
    send_push_notification(push_token, instance_data)