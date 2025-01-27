# Generated by Django 4.2.16 on 2025-01-15 16:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0052_complex_four_padel_latitude_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Score",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("sets_team_1", models.JSONField(default=list)),
                ("sets_team_2", models.JSONField(default=list)),
                ("tie_breaks_team_1", models.JSONField(blank=True, default=list, null=True)),
                ("tie_breaks_team_2", models.JSONField(blank=True, default=list, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("match", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="score", to="main_app.match")),
                ("team_1", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="score_team_1", to="main_app.team")),
                ("team_2", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="score_team_2", to="main_app.team")),
            ],
        ),
    ]
