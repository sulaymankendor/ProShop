from django.urls import path
from . import views
urlpatterns = [
	path('', views.home, name='home'),
	path('product-detail/<str:product_name>', views.product_detail, name='product-detail'),
	path('add-to-cart/', views.add_to_cart, name='add-to-cart'),
	path('add-review/', views.add_review, name='add-review'),
	path('get-customers-reviews/', views.get_customers_reviews, name='get-customers-reviews'),
	path('cart/', views.cart, name='cart'),
	path('sign-in/', views.sign_in, name='sign-in'),
	path('sign-up/', views.sign_up, name='sign-up'),
	path('logout-user/', views.logout_user, name='logout-user'),
	path('checkout/', views.checkout, name='checkout'),
]