from django.db import models


class Course(models.Model):
    code = models.CharField(max_length=6)
    name = models.CharField(max_length=100)
    credits = models.IntegerField()
    semester = models.CharField(max_length=10)
    level = models.CharField(max_length=3)
    module = models.CharField(max_length=10)


class CoursePlan(models.Model):
    owner = models.ForeignKey('auth.User', related_name='course_plans', on_delete=models.CASCADE)
    courses = models.ManyToManyField('course_plans.Course', related_name='selected_courses')
    title = models.CharField(max_length=100, blank=False)
    created = models.DateTimeField(auto_now_add=True)
