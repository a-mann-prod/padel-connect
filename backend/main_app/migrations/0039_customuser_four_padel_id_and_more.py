# Generated by Django 4.2.16 on 2024-12-18 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0038_match_four_padel_field_name_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="four_padel_id",
            field=models.IntegerField(null=True, unique=True),
        ),
        migrations.AddField(
            model_name="customuser",
            name="four_padel_last_sync",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
