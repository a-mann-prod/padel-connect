from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# namespace='CELERY' means all celery-related configs must start with CELERY_
app.config_from_object('django.conf:settings', namespace='CELERY')

# Automatically discover tasks in your apps
app.autodiscover_tasks()