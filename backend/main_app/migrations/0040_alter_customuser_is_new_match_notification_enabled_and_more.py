# Generated by Django 4.2.16 on 2024-12-19 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0039_customuser_four_padel_id_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="is_new_match_notification_enabled",
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name="customuser",
            name="is_new_message_notification_enabled",
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name="notification",
            name="type",
            field=models.CharField(
                choices=[
                    ("NEW_MESSAGE", "New Message"),
                    ("NEW_MATCH", "New Match"),
                    ("NEW_MATCH_INVITATION", "New Match Invitation"),
                    ("MATCH_REQUEST_RESPONSE_ACCEPTED", "Match Request Response Accepted"),
                    ("MATCH_REQUEST_RESPONSE_REFUSED", "Match Request Response Refused"),
                ],
                max_length=50,
            ),
        ),
    ]
