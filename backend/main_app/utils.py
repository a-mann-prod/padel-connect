# main_app/utils.py

from django.conf import settings
import requests


def send_push_notification(push_token, notification):
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"bearer {settings.PUSH_NOTIF_TOKEN}"
    }
    payload = {
        "to": push_token,
        "sound": "default",
        "title": notification.title,
        "body": notification.message,
        "data": {
            "id": notification.id, # used to make notification as read
            **notification.associated_data
        },
    }
    response = requests.post(settings.PUSH_NOTIF_URL, json=payload, headers=headers)
    return response.json()
