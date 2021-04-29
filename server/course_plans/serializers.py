from rest_framework import serializers
from course_plans.models import CoursePlan
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    course_plans = serializers.PrimaryKeyRelatedField(many=True, queryset=CoursePlan.objects.all())

    class Meta:
        model = User
        fields = ['email', 'course_plans']

class CoursePlanSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')

    class Meta:
        model = CoursePlan
        fields = ['id', 'owner', 'created', 'title', 'course_codes']
