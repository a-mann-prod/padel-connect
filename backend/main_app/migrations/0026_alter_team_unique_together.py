# Generated by Django 4.2.16 on 2024-12-04 16:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0025_match_is_reserved"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="team",
            unique_together={("match", "user")},
        ),
    ]
