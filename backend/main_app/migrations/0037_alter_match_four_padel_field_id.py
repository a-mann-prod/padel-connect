# Generated by Django 4.2.16 on 2024-12-17 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0036_match_four_padel_field_id_match_is_decisive_point_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="match",
            name="four_padel_field_id",
            field=models.CharField(),
        ),
    ]
