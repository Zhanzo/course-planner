from django.urls import path, include
from course_plans.views import CoursePlanList, CoursePlanDetail, UserList, UserDetail

urlpatterns = [
    path('course_plans/', CoursePlanList.as_view()),
    path('course_plans/<int:pk>', CoursePlanDetail.as_view()),
    path('users/', UserList.as_view()),
    path('users/<email>', UserDetail.as_view()),
]
