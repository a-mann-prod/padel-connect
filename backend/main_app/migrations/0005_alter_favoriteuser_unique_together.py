# Generated by Django 4.2.16 on 2024-10-19 11:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0004_alter_favoriteuser_favorite_user_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='favoriteuser',
            unique_together={('user', 'favorite_user')},
        ),
    ]
