from django.http import JsonResponse, Http404
from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from users.models import User
from users.serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

class UserList(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        users_serializer = UserSerializer(users, many=True)
        return Response(users_serializer.data)
    def post(self, request, format=None):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
    def delete(self, request, format=None):
        count = User.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'DELETE'])
def user_list(request):
    # GET list of users, POST a new user, DELETE all users
    if request.method == 'GET':
        users = User.objects.all()
        email = request.query_params.get('email', None)
        # if email is not None:
        users_serializer = UserSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        print(user_data)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        count = User.objects.all().delete()
        return JsonResponse({'message': '{} Users were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)

class UserDetail(APIView):
    def get_object(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise Http404
    def get(self, request, email, format=None):
        user = self.get_object(email)
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)
    def put(self, request, email, format=None):
        user = self.get_object(email)
        user_serializer = UserSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, email, format=None):
        user = self.get_object(email)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, email):
    # find user by email
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        user_serializer = UserSerializer(user)
        return JsonResponse(user_serializer.data)
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return JsonResponse({'message': 'User was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
