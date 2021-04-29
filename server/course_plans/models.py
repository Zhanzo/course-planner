from django.db import models


class CoursePlan(models.Model):
    owner = models.ForeignKey('auth.User', related_name='course_plans', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True)
    course_codes = models.JSONField(null=True)
