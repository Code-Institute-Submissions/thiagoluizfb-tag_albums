# Generated by Django 3.1.6 on 2021-02-15 22:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0002_auto_20210215_2220'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='photos',
            options={'ordering': ['upload_date']},
        ),
        migrations.AlterModelOptions(
            name='tags',
            options={'ordering': ['tag_name']},
        ),
    ]