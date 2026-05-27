from django.urls import path
from . import views

urlpatterns = [ path('',views.home, name='home'),
               path('farmer/register/',views.Farmer_Register,),
               path('farmer/login/',views.Farmer_Login,),
              ] 