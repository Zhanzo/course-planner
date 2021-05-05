from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions

from course_plans.models import CoursePlan, Course
from course_plans.permissons import IsOwnerOrReadOnly
from course_plans.serializers import UserSerializer, CoursePlanSerializer, CourseSerializer


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


class CoursePlanList(generics.ListCreateAPIView):
    queryset = CoursePlan.objects.all()
    serializer_class = CoursePlanSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        obj = serializer.save(owner=self.request.user)
        print(self.request.data)
        for course_id in self.request.data.get('courses'):
            course = Course.objects.get(id=course_id)
            obj.courses.add(course)


class CoursePlanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CoursePlan.objects.all()
    serializer_class = CoursePlanSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserList(generics.ListCreateAPIView, generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'email'
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
