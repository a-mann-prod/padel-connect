from django.contrib import admin
from main_app.models import Complex, FavoriteUser, Match, MatchFilter, MatchRequest, Profile, Tournament

# Register your models here.
admin.site.register(Complex)
admin.site.register(FavoriteUser)
admin.site.register(Match)
admin.site.register(MatchFilter)
admin.site.register(MatchRequest)
admin.site.register(Profile)
admin.site.register(Tournament)