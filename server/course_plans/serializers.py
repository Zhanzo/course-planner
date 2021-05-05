from django.contrib.auth.models import User
from rest_framework import serializers

from course_plans.models import CoursePlan, Course


class UserSerializer(serializers.ModelSerializer):
    course_plans = serializers.PrimaryKeyRelatedField(many=True, queryset=CoursePlan.objects.all())

    class Meta:
        model = User
        fields = ['email', 'course_plans']
       

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'code', 'name', 'credits', 'semester', 'level', 'module']


class CoursePlanSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    courses = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = CoursePlan
        fields = ['id', 'owner', 'created', 'title', 'courses']
