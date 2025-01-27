# Generated by Django 4.2.16 on 2025-01-20 10:38

from django.db import migrations, models
import main_app.models.match_archive

class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0069_remove_score_sets_team_1_remove_score_sets_team_2_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="matcharchive",
            name="score",
        ),
        migrations.RemoveField(
            model_name="score",
            name="sets",
        ),
        migrations.RemoveField(
            model_name="score",
            name="tie_breaks",
        ),
        migrations.AddField(
            model_name="matcharchive",
            name="score_data",
            field=models.JSONField(default=main_app.models.match_archive.default_score_data),
        )
    ]
