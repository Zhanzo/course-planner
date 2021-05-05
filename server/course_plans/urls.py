from django.urls import path

from course_plans.views import CoursePlanList, CoursePlanDetail, UserList, UserDetail, CourseList

urlpatterns = [
    path('course_plans/', CoursePlanList.as_view()),
    path('course_plans/<int:pk>', CoursePlanDetail.as_view()),
    path('courses/', CourseList.as_view()),
    path('users/', UserList.as_view()),
    path('users/<email>', UserDetail.as_view()),
]
