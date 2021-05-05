# Generated by Django 3.2 on 2021-05-04 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_plans', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=6)),
                ('name', models.CharField(max_length=100)),
                ('credits', models.IntegerField()),
                ('semester', models.CharField(max_length=10)),
                ('level', models.CharField(max_length=3)),
                ('module', models.CharField(max_length=10)),
            ],
        ),
        migrations.RemoveField(
            model_name='courseplan',
            name='course_codes',
        ),
        migrations.AddField(
            model_name='courseplan',
            name='courses',
            field=models.ManyToManyField(to='course_plans.Course'),
        ),
    ]