from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
	image = models.ImageField(upload_to='images', max_length=1000)
	name = models.CharField(max_length=100)
	price = models.DecimalField(max_digits=7, decimal_places=2)
	description = models.TextField()
	number_of_orange_stars = models.IntegerField(default=0)

class Cart(models.Model):
	customer = models.ForeignKey(User, on_delete=models.CASCADE, default='1')
	image = models.ImageField(upload_to='cart-item-images', max_length=1000)
	name = models.CharField(max_length=100)
	price = models.DecimalField(max_digits=7, decimal_places=2)
	session_id = models.CharField(max_length=200)

class CustomerReview(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	number_of_orange_stars = models.IntegerField()
	review_title = models.CharField(max_length=1000)
	review = models.TextField(max_length=5000)
	date_and_time = models.DateTimeField(auto_now=True)
	product_name = models.CharField(max_length=1000)

	class Meta:
		ordering = ["-id"]