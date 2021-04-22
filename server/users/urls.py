from django.urls import path
from users import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),
    path('api/users', views.user_list),
    path('api/users/<email>', views.user_detail)
]
