from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [ path('',views.home, name='home'),
               #farmer Apis
               path('farmer/register/',views.Farmer_Register,),
               path('farmer/login/',views.Farmer_Login,),
               #add product 
               path('farmer/add-product/',views.add_product,),
               #fetch product farmer
               path('farmer/get-products/',views.get_products,),
               #farmer product by id
                path('farmer/products/<int:farmer_id>/',views.farmer_products_byId,),
                #get All Farmers
                path('farmer/all-farmers/',views.get_allFarmers,),
                #fetch order of logged in farmer
                path('farmer/orders/<int:farmer_id>/',views.Farmer_order_byId,),
                path('farmer/orders/dashboard-stats/<int:farmer_id>/',views.Farmer_dashboard_stats,),
                path('farmer/orders/view-order/<int:item_id>/',views.view_order_byId,),
                path('farmer/orders/update-status/<int:order_id>/',views.update_order_status,),
                path('farmer/product/delete/<int:product_id>/',views.delete_product),



               # User Registration and Login
               path('user/register/',views.User_Registration,),
               path('user/login/',views.User_login,),

               #Create Order
               path('order/create/',views.Create_Order,),
               path('order/upi-order/',views.Create_UPI_Order,),
               # fetch product of logged in user
               path('user/products/<int:user_id>/',views.User_order_byId,),
              ] 



 





