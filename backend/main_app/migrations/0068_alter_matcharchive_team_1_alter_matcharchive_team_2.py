# Generated by Django 4.2.16 on 2025-01-20 08:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0067_alter_matcharchive_team_1_alter_matcharchive_team_2"),
    ]

    operations = [
        migrations.AlterField(
            model_name="matcharchive",
            name="team_1",
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="team_1", to="main_app.matcharchiveteam"),
        ),
        migrations.AlterField(
            model_name="matcharchive",
            name="team_2",
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="team_2", to="main_app.matcharchiveteam"),
        ),
    ]
