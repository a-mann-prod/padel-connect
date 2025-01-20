from django.contrib import admin
from main_app.models.complex import Complex
from main_app.models.match import Match
from main_app.models.match_filter import MatchFilter
from main_app.models.profile import Profile
from main_app.models.custom_user import CustomUser
from main_app.models.notification import Notification
from main_app.models.team import Team, TeamInvite
from main_app.models.match_archive import MatchArchive, MatchArchiveTeam
from main_app.models.score import  Score

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

# Register your models here.
admin.site.register(Complex)
admin.site.register(MatchFilter)

class NotificationAdmin(admin.ModelAdmin):
    model = Notification
    list_display = ('id', 'user', 'title', 'message', 'type', 'is_read')

admin.site.register(Notification, NotificationAdmin) 


class ProfileAdmin(admin.ModelAdmin):
    model = Profile
    list_display = ('id', 'user', 'calculate_level')

admin.site.register(Profile, ProfileAdmin) 


class MatchAdmin(admin.ModelAdmin):
    model = Match
    list_display = ('id', 'user', 'complex', 'is_private', 'is_competitive', 'datetime')

admin.site.register(Match, MatchAdmin)

class ScoreAdmin(admin.ModelAdmin):
    model = Match
    list_display = ('id', 'team_1', 'team_2')

admin.site.register(Score, ScoreAdmin)

class MatchArchiveTeamAdmin(admin.ModelAdmin):
    model = MatchArchiveTeam
    list_display = ('id', 'user_1', 'user_2')

admin.site.register(MatchArchiveTeam, MatchArchiveTeamAdmin)

class MatchArchiveAdmin(admin.ModelAdmin):
    model = MatchArchive
    list_display = ('id', 'complex', 'is_competitive', 'datetime')

admin.site.register(MatchArchive, MatchArchiveAdmin)


class TeamAdmin(admin.ModelAdmin):
    model = Team
    list_display = ('id', 'match', 'user', 'is_ready')

admin.site.register(Team, TeamAdmin)


class TeamInviteAdmin(admin.ModelAdmin):
    model = TeamInvite
    list_display = ('id', 'team', 'user', 'status')

admin.site.register(TeamInvite, TeamInviteAdmin)


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
    list_display = ('id', 'four_padel_id', 'email', 'is_staff', 'is_active', 'is_onboarding_completed', 'language')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        ('General', {'fields': ('email', 'password', 'push_token', 'is_onboarding_completed', 'language', 'four_padel_token')}),
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