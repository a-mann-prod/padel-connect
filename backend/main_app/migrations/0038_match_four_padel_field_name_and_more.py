# Generated by Django 4.2.16 on 2024-12-17 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0037_alter_match_four_padel_field_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="match",
            name="four_padel_field_name",
            field=models.CharField(default="test"),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="match",
            name="four_padel_field_id",
            field=models.IntegerField(),
        ),
    ]
