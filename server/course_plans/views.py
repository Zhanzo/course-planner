from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from course_plans.models import CoursePlan, Course
from course_plans.permissons import IsOwnerOrReadOnly
from course_plans.serializers import UserSerializer, CoursePlanSerializer, CourseSerializer


class CoursePlanList(generics.ListCreateAPIView):
    queryset = CoursePlan.objects.all()
    serializer_class = CoursePlanSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        obj = serializer.save(owner=self.request.user)
        for course in self.request.data.get('courses'):
            obj.courses.add(course["id"])


class CoursePlanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CoursePlan.objects.all()
    serializer_class = CoursePlanSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_update(self, serializer):
        obj = serializer.save(owner=self.request.user)
        obj.courses.clear()
        for course in self.request.data.get('courses'):
            obj.courses.add(course["id"])


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CurrentUser(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, form=None):
        serializer = UserSerializer(self.request.user)
        return Response(serializer.data)


class UserList(generics.ListCreateAPIView, generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
