# Generated by Django 4.2.16 on 2024-12-27 15:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0041_alter_notification_type"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="complex",
            options={"ordering": ["id"], "verbose_name": "Complex", "verbose_name_plural": "Complexes"},
        ),
        migrations.AlterModelOptions(
            name="match",
            options={"ordering": ["id"], "verbose_name": "Match", "verbose_name_plural": "Matches"},
        ),
        migrations.AlterModelOptions(
            name="profile",
            options={"ordering": ["id"], "verbose_name": "Profile", "verbose_name_plural": "Profiles"},
        ),
    ]
