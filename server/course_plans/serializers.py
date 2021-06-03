from django.contrib.auth.models import User
from rest_framework import serializers

from course_plans.models import CoursePlan, Course


class UserSerializer(serializers.ModelSerializer):
    course_plans = serializers.PrimaryKeyRelatedField(many=True, queryset=CoursePlan.objects.all())

    class Meta:
        model = User
        fields = ['id', 'email', 'course_plans']
       

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'code', 'name', 'credits', 'semester', 'level', 'period', 'module']


class CoursePlanSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')
    courses = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = CoursePlan
        fields = ['id', 'owner', 'created', 'title', 'courses']
