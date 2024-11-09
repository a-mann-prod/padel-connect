from django.contrib import admin
from main_app.models import Complex, Match, MatchFilter, Profile, Tournament, CustomUser, Notification
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

# Register your models here.
admin.site.register(Complex)
admin.site.register(MatchFilter)
admin.site.register(Profile)
admin.site.register(Notification)


class MatchAdmin(admin.ModelAdmin):
    model = Match
    list_display = ('id', 'user', 'complex', 'is_private', 'type', 'datetime')

admin.site.register(Match, MatchAdmin)


class TournamentAdmin(admin.ModelAdmin):
    model = Tournament
    list_display = ('id', 'title', 'complex', 'datetime')

admin.site.register(Tournament, TournamentAdmin)


# Formulaire pour créer un utilisateur
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name')

# Formulaire pour modifier un utilisateur
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name')

# Admin pour gérer les utilisateurs dans l'interface d'administration
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('id', 'email', 'is_staff', 'is_active', 'is_onboarding_completed', 'language')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        ('General', {'fields': ('email', 'password', 'push_token', 'is_onboarding_completed', 'language')}),
        ('Notifications', {'fields': ('is_new_match_notification_enabled', 'is_new_message_notification_enabled')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Permissions', {'fields': ('favorite_users',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)