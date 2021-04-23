from rest_framework import serializers
from users.models import User, CoursePlan


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'token')

class CoursePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePlan
        fields = ('id', 'created', 'title', 'course_codes')
