# Generated by Django 4.2.16 on 2024-12-07 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0030_match_is_open_to_all_level"),
    ]

    operations = [
        migrations.AlterField(
            model_name="match",
            name="level",
            field=models.FloatField(),
        ),
    ]
