# Generated by Django 4.2.16 on 2024-12-07 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0029_team_is_ready"),
    ]

    operations = [
        migrations.AddField(
            model_name="match",
            name="is_open_to_all_level",
            field=models.BooleanField(default=False),
        ),
    ]
