from django.urls import path
from users import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),
    path('api/course_plans', views.CoursePlanList.as_view()),
    path('api/course_plans/<int:pk>', views.CoursePlanDetail.as_view()),
    path('api/users', views.UserList.as_view()),
    path('api/users/<email>', views.UserDetail.as_view())
]
