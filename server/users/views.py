from django.http import JsonResponse, Http404
from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from users.models import User, CoursePlan
from users.serializers import UserSerializer, CoursePlanSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics


class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)


class CoursePlanList(generics.ListCreateAPIView):
    queryset = CoursePlan.objects.all()
    serializer_class = CoursePlanSerializer


class CoursePlanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CoursePlan.objects.all()
    serializer_class = CoursePlanSerializer


class UserList(generics.ListCreateAPIView, generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'email'
    queryset = User.objects.all()
    serializer_class = UserSerializer
