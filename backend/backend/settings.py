"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.16.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import os
import environ

env = environ.Env()

def get_secret_file(key):
    path_file = env(key)
    if os.path.isfile(path_file):
        with open(path_file) as f:
            return f.read()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_secret_file("SECRET_KEY_FILE")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG", default=False)

# CORS
# Dev only 
# ALLOWED_HOSTS = ["*"] 
ALLOWED_HOSTS = env("ALLOWED_HOSTS", default=[])
# Dev only
# https://pypi.org/project/django-cors-headers/
CORS_ALLOW_ALL_ORIGINS = True 

CSRF_TRUSTED_ORIGINS = env("API_CSRF_TRUSTED_ORIGINS", default=[])


# Application definition

INSTALLED_APPS = [
    'daphne',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',

    # app
    'main_app',
    'chat',

    # 3rd party modules
    'djoser',
    'channels',
    'corsheaders',
    'django_filters'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

ASGI_APPLICATION = "backend.asgi.application"

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

REST_FRAMEWORK = {
    # Authentication
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    # Query filters
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    # Pagination
    'DEFAULT_PAGINATION_CLASS': 'main_app.pagination.CustomPageNumberPagination',
    'PAGE_SIZE': 10,  # Taille par défaut, si nécessaire
}

DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': '#/username/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': '#/activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    # check retypes
    'SET_PASSWORD_RETYPE': True,
    'SET_USERNAME_RETYPE': True,
    'SERIALIZERS': {
        'activation': 'djoser.serializers.ActivationSerializer',
        'password_reset': 'djoser.serializers.SendEmailResetSerializer',
        'password_reset_confirm': 'djoser.serializers.PasswordResetConfirmSerializer',
        'password_reset_confirm_retype': 'djoser.serializers.PasswordResetConfirmRetypeSerializer',
        'set_password': 'djoser.serializers.SetPasswordSerializer',
        'set_password_retype': 'djoser.serializers.SetPasswordRetypeSerializer',
        'set_username': 'djoser.serializers.SetUsernameSerializer',
        'set_username_retype': 'djoser.serializers.SetUsernameRetypeSerializer',
        'username_reset': 'djoser.serializers.SendEmailResetSerializer',
        'username_reset_confirm': 'djoser.serializers.UsernameResetConfirmSerializer',
        'username_reset_confirm_retype': 'djoser.serializers.UsernameResetConfirmRetypeSerializer',
        'user_create': 'main_app.serializers.CustomUserCreateSerializer',
        'user': 'main_app.serializers.CustomCurrentUserSerializer',
        'user_create_password_retype': 'djoser.serializers.UserCreatePasswordRetypeSerializer',
        'current_user': 'main_app.serializers.CustomCurrentUserSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
        'token': 'djoser.serializers.TokenSerializer',
        'token_create': 'djoser.serializers.TokenCreateSerializer',
    },
    'EMAIL': {
        'activation': 'djoser.email.ActivationEmail',
        'confirmation': 'djoser.email.ConfirmationEmail',
        'password_reset': 'djoser.email.PasswordResetEmail',
        'password_changed_confirmation': 'djoser.email.PasswordChangedConfirmationEmail',
        'username_changed_confirmation': 'djoser.email.UsernameChangedConfirmationEmail',
        'username_reset': 'djoser.email.UsernameResetEmail',
    },
    'LOGIN_FIELD': 'email',
}

SIMPLE_JWT = {
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_HEADER_TYPES': ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1), #default 5 mns
    'REFRESH_TOKEN_LIFETIME': timedelta(days=365), #default 1 day
}

AUTH_USER_MODEL = 'main_app.CustomUser'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": get_secret_file("DB_PASSWORD_FILE"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT", default=5432),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Email

# Dev only
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_PORT = env("EMAIL_PORT")
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = get_secret_file("EMAIL_HOST_PASSWORD_FILE")
EMAIL_USE_TLS = True


# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / "mediafiles"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# PUSH NOTIF TOKEN
PUSH_NOTIF_URL = 'https://exp.host/--/api/v2/push/send'
PUSH_NOTIF_TOKEN = 'YXKXlYOERAdXingopojtGHG-HGmsYWDrJzm8YvEg'