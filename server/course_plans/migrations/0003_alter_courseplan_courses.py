# Generated by Django 3.2 on 2021-05-04 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_plans', '0002_auto_20210504_1029'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseplan',
            name='courses',
            field=models.ManyToManyField(related_name='selected_courses', to='course_plans.Course'),
        ),
    ]
