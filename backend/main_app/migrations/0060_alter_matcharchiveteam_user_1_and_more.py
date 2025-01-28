# Generated by Django 4.2.16 on 2025-01-20 07:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0059_remove_matcharchive_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="matcharchiveteam",
            name="user_1",
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name="user_1", to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name="matcharchiveteam",
            name="user_2",
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name="user_2", to=settings.AUTH_USER_MODEL),
        ),
    ]