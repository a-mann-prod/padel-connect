# Generated by Django 4.2.16 on 2024-11-01 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0014_alter_notification_associated_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='notification',
            name='associated_data',
            field=models.JSONField(blank=True, default=dict, null=True),
        ),
    ]