# Generated by Django 4.2.16 on 2024-12-12 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main_app", "0033_alter_matcharchive_options_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="matcharchive",
            name="duration",
            field=models.IntegerField(default=90),
            preserve_default=False,
        ),
    ]