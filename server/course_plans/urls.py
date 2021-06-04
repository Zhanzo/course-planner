from django.urls import path

from course_plans.views import CoursePlanList, CoursePlanDetail, UserList, UserDetail, CourseList, CurrentUser

urlpatterns = [
    path('course_plans/', CoursePlanList.as_view()),
    path('course_plans/<int:pk>', CoursePlanDetail.as_view()),
    path('courses/', CourseList.as_view()),
    path('current_user/', CurrentUser.as_view()),
    path('users/', UserList.as_view()),
    path('users/<int:pk>', UserDetail.as_view()),
]
