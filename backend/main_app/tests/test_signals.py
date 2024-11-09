from unittest.mock import patch
from main_app.models import Match, Complex, CustomUser, enums
from main_app.signals import handle_match_creation
from django.db.models.signals import post_save

import pytest

@pytest.fixture
def disable_signals():
    post_save.disconnect(handle_match_creation, sender=Match)
    yield
    post_save.connect(handle_match_creation, sender=Match)

@pytest.mark.django_db
@patch('main_app.models.Notification.objects.create')
@patch('main_app.models.MatchRequest.objects.create')
@patch('chat.models.Conversation.objects.create')
def test_handle_match_creation(mock_conversation_create, mock_match_request_create, mock_notification_create, disable_signals):

    # Creation du complex
    complex = Complex.objects.create(name="Complex A")

    # creation de l'utilisateur 
    user = CustomUser.objects.create(email="test@example.com", push_token="FAKE_TOKEN")
    profile = user.profile
    profile.is_new_match_notification_enabled = True
    profile.save()

    match_filter = user.match_filter
    match_filter.level_min = 3
    match_filter.level_max = 7
    match_filter.complex = complex
    match_filter.save()

    # Creation du match public
    match_owner = CustomUser.objects.create(email="match_owner@example.com")
    profile_owner = match_owner.profile
    profile_owner.is_new_match_notification_enabled = True
    profile_owner.save()

    # Act
    match = Match.objects.create(complex_id=1, datetime="2024-10-25T10:00:00Z", duration=60, level=5, is_private=False, type="competitive", user=match_owner)    
    handle_match_creation(Match, match, created=True)

    # Check
    mock_match_request_create.assert_called_once_with(match=match, user=match_owner, is_owner=True, status=enums.MatchRequestStatus.ACCEPTED)
    mock_conversation_create.assert_called_once_with(match=match)
    mock_notification_create.assert_called_once_with(
        title="New Match Created",
        message="A new match has been created.",
        type=enums.NotificationType.NEW_MATCH_REQUEST,
        user=user,
        match=match
    )
