from django.db import models


# Create your models here.
class User(models.Model):
    email = models.TextField(primary_key=True, blank=False, default='')
    token = models.TextField(blank=True, default='')

class CoursePlan(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    course_codes = models.JSONField(null=True)
