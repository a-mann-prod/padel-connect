"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from main_app.views import ComplexViewSet, ProfileViewSet, CustomUserViewSet, MeFavoriteUsersView, MatchViewSet, MeMatchFilterView, MeProfileView, MeNotificationViewSet, MatchTeamInviteModelViewSet, MatchTeamModelViewSet, MeMatchArchiveModelViewSet, MatchInviteModelViewSet, FourPadelBookingView, FourPadelLoginView, FourPadelGoogleLoginView, FourPadelFieldView, FourPadelTournamentView, FourPadelTournamentDetailView
from chat.views import MatchMessagesView, MatchConversationView
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'complexes', ComplexViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'users', CustomUserViewSet, basename='customuser')
router.register(r'matches', MatchViewSet)
router.register(r'me/notifications', MeNotificationViewSet, basename='notification')
router.register(r'me/matches-archive', MeMatchArchiveModelViewSet, basename='me-matches-archive')

router.register(r'matches/(?P<match_pk>\d+)/teams', MatchTeamModelViewSet, basename='match-team')
router.register(r'matches/(?P<match_pk>\d+)/invitations', MatchInviteModelViewSet, basename='match-invitation')
router.register(r'matches/(?P<match_pk>\d+)/teams/(?P<team_pk>\d+)/invitations', MatchTeamInviteModelViewSet, basename='match-team-invitation')


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    path('login/', FourPadelLoginView.as_view(), name='four-padel-login'),
    path('login/google/', FourPadelGoogleLoginView.as_view(), name='four-padel-google-login'),

    path('me/match_filter/', MeMatchFilterView.as_view(), name='me-match-filter'),

    path('me/profile/', MeProfileView.as_view(), name='me-profile'),
    path('me/profile/delete_avatar/', MeProfileView.as_view(), name='delete-avatar'),

    path('me/favorite_users/', MeFavoriteUsersView.as_view(), name='me-favorite-users-list'),
    path('me/favorite_users/<int:pk>/<str:action>/', MeFavoriteUsersView.as_view(), name='me-favorite-users-modify'),

    path('matches/<int:pk>/conversation/', MatchConversationView.as_view(), name='match-conversation'),
    path('matches/<int:pk>/conversation/messages/', MatchMessagesView.as_view(), name='match-messages'),

    # External services
    path('fields/', FourPadelFieldView.as_view(), name='fields'),
    
    path('tournaments/', FourPadelTournamentView.as_view(), name='tournaments'),
    path('tournaments/<int:pk>/', FourPadelTournamentDetailView.as_view(), name='tournaments-detail'),

    path('bookings/', FourPadelBookingView.as_view(), name='book'),
    path('bookings/<int:pk>/', FourPadelBookingView.as_view(), name='book-detail'),
]


# only for developpement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
