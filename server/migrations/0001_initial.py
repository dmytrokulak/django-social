# Generated by Django 3.2.4 on 2021-07-17 12:51

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50, unique=True, validators=[django.core.validators.RegexValidator(code='invalid_sequence', message='Personname can only contain letters, numbers and dot symbol.', regex='^(\\w|\\.){1,}$')])),
                ('first_name', models.CharField(max_length=50)),
                ('middle_name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
                ('date_of_birth', models.DateTimeField()),
                ('gender', models.IntegerField(choices=[(0, 'Undefined'), (1, 'Male'), (2, 'Female'), (3, 'Other')])),
                ('gender_other', models.CharField(max_length=50, null=True)),
                ('marital_status', models.IntegerField(choices=[(0, 'Undefined'), (1, 'Single'), (2, 'Have Friend'), (3, 'Married'), (4, 'Not Married'), (5, 'In Search Of Friend'), (6, 'Divorced'), (7, 'Widowed')])),
                ('interests', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField(null=True)),
                ('is_current', models.BooleanField(default=False)),
                ('school_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='server.school')),
            ],
        ),
    ]
