# Generated by Django 3.1.6 on 2021-02-17 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0006_auto_20210215_2320'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photos',
            name='upload_date',
            field=models.DateTimeField(),
        ),
    ]
