# Generated by Django 3.2.4 on 2021-07-24 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0008_auto_20210719_2131'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usermedia',
            name='date_time',
        ),
        migrations.RemoveField(
            model_name='usermedia',
            name='description',
        ),
        migrations.RemoveField(
            model_name='usermedia',
            name='mime_type',
        ),
        migrations.AddField(
            model_name='usermedia',
            name='type',
            field=models.IntegerField(choices=[(0, 'Photo'), (1, 'Videao')], null=True),
        ),
    ]
