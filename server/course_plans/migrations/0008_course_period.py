# Generated by Django 3.2 on 2021-05-19 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_plans', '0007_alter_course_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='period',
            field=models.CharField(default='1', max_length=3),
            preserve_default=False,
        ),
    ]
