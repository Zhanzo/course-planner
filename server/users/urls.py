from django.conf.urls import url 
from users import views 
 
urlpatterns = [ 
    url(r'^api/users$', views.user_list),
    url(r'^api/users/(?P<pk>[0-9]+)$', views.user_detail)]