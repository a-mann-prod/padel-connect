# Generated by Django 4.2.16 on 2025-01-09 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0044_alter_profile_options_customuser_four_padel_token_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="match",
            name="four_padel_reservation_id",
            field=models.IntegerField(null=True),
        ),
    ]