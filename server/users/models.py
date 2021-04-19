from django.db import models


# Create your models here.
class User(models.Model):
    email = models.TextField(primary_key=True, blank=False, default='')
    token = models.TextField(blank=True, default='')
