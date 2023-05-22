from django.contrib import admin
from .models import Product, Cart, CustomerReview, Cart
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CustomerReview)