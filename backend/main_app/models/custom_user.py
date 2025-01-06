from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from . import enums
from django.conf import settings
from cryptography.fernet import Fernet

cipher = Fernet(settings.ENCRYPTION_KEY)

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    is_onboarding_completed = models.BooleanField(default=False)
    push_token = models.CharField(max_length=255, null=True, blank=True)
    favorite_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='favorited_by', blank=True)
    language = models.CharField(max_length=10, choices=enums.Language.choices, null=True, blank=True)

    # Notifications
    is_new_match_notification_enabled = models.BooleanField(default=True)
    is_new_message_notification_enabled = models.BooleanField(default=True)

    #four_padel
    four_padel_id = models.IntegerField(unique=True, null=True)
    four_padel_token =models.TextField(null=True)
    four_padel_last_sync = models.DateTimeField(null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def set_four_padel_token(self, raw_token: str):
        """Chiffre le token avant de le stocker"""
        self.four_padel_token = cipher.encrypt(raw_token.encode()).decode()

    def get_four_padel_token(self) -> str:
        """Déchiffre et retourne le token"""
        return cipher.decrypt(self.four_padel_token.encode()).decode()

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name = 'User' 
        verbose_name_plural = 'Users'
        #app_label = 'auth'
