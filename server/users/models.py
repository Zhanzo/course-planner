from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(primary_key=True, max_length=70, blank=False, default='')
    token = models.CharField(max_length=30, blank=True, default='')
