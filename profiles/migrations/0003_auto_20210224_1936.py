# Generated by Django 3.1.6 on 2021-02-24 19:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_auto_20210221_2242'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userprofile',
            options={'ordering': ['user']},
        ),
    ]
