# Generated by Django 4.2.16 on 2024-10-26 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0013_remove_notification_url_notification_associated_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='associated_data',
            field=models.JSONField(default=dict, null=True),
        ),
    ]