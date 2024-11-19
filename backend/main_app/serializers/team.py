from rest_framework import serializers
from main_app.models import Team, TeamInvite
from main_app import mixins


class TeamSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    
    class Meta:
        model = Team
        fields = '__all__'


class TeamInviteSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = TeamInvite
        fields = '__all__'