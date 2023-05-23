from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .models import Product, CustomerReview, Cart
import json
from django.http import JsonResponse
from random import random
from django.contrib.auth.models import User

def _delete_items(request):
	if request.user.is_authenticated == False:
		for item in Cart.objects.all():
			if item.session_id != request.session.session_key and item.session_id != '':
				item.delete()

def add_review(request):
	data = json.loads(request.body)
	number_of_orange_stars = data.get('numberOfOrangeStars')
	review_title = data.get('reviewTitle')
	review = data.get('review')
	product_name = data.get('productName')
	reviews = CustomerReview.objects.all()
	list_of_users = []
	list_of_product_name = []
	for user_review in reviews:
		list_of_users.append(user_review.user)
		list_of_product_name.append(user_review.product_name)
	if request.user in list_of_users:
		if CustomerReview.objects.filter(user=request.user).filter(product_name=product_name).count() == 0:
			CustomerReview.objects.create(user=request.user, number_of_orange_stars=number_of_orange_stars, review_title=review_title, review=review, product_name=product_name)
		else:
			CustomerReview.objects.filter(user=request.user).filter(product_name=product_name).update(user=request.user, number_of_orange_stars=number_of_orange_stars, review_title=review_title, review=review, product_name=product_name)
	else:
		CustomerReview.objects.create(user=request.user, number_of_orange_stars=number_of_orange_stars, review_title=review_title, review=review, product_name=product_name)
	reviews = list(CustomerReview.objects.all().values())
	Product.objects.filter(name=product_name).update(number_of_orange_stars=number_of_orange_stars)
	return JsonResponse(reviews, safe=False)

def product_detail(request, product_name):
	_delete_items(request)
	product = Product.objects.filter(name=product_name)
	reviews = CustomerReview.objects.filter(product_name=product_name).order_by('-number_of_orange_stars')
	users_review_list = []
	number_of_cart_items = []
	current_user_has_review = None
	for user in reviews:
		users_review_list.append(user.user.username)
	if request.user.username in users_review_list:
		current_user_has_review = True
	else:
		current_user_has_review = False
	best_rating_number_of_orange_star = 0
	for review in CustomerReview.objects.filter(product_name=product_name):
		if best_rating_number_of_orange_star < review.number_of_orange_stars:
			best_rating_number_of_orange_star = review.number_of_orange_stars
	number_of_best_rating = CustomerReview.objects.filter(product_name=product_name).filter(number_of_orange_stars=best_rating_number_of_orange_star).count()
	item_in_cart = False
	for item in Cart.objects.all():
		if request.user.is_authenticated:
			if product_name == item.name and item.customer == request.user and item.session_id == '':
				item_in_cart = True
		else:
			if product_name == item.name and item.session_id == request.session.session_key:
				item_in_cart = True

	if request.user.is_authenticated:
		for item in Cart.objects.filter(customer=request.user):
			if item.session_id == '':
				number_of_cart_items.append(item)
		number_of_cart_items = len(number_of_cart_items)
	else:
		number_of_cart_items = Cart.objects.filter(session_id=request.session.session_key).count()
	context = {'product': product, 'product_name': product_name, 'reviews': reviews, 'current_user_has_review': current_user_has_review,
	'best_rating_number_of_orange_star': best_rating_number_of_orange_star, 
	'number_of_best_rating': number_of_best_rating,'item_in_cart': item_in_cart, 'number_of_cart_items': number_of_cart_items}
	return render(request, 'ecommerce_app/product-detail.html', context)

def home(request):
	_delete_items(request)
	products = Product.objects.all()
	number_of_cart_items = []
	if request.method == 'POST':
		search = request.POST.get('search')
		products = Product.objects.filter(name__icontains=search)
	selected_products = Product.objects.filter(id__gt=2)
	customer_review = CustomerReview.objects.all()
	if request.user.is_authenticated:
		for item in Cart.objects.filter(customer=request.user):
			if item.session_id == '':
				number_of_cart_items.append(item)
		number_of_cart_items = len(number_of_cart_items)
	else:
		number_of_cart_items = Cart.objects.filter(session_id=request.session.session_key).count()
	context = {'products': products, 
	'selected_products': selected_products, 'number_of_cart_items': number_of_cart_items}
	return render(request, 'ecommerce_app/home.html', context)

def get_customers_reviews(request):
	customers_reviews = list(CustomerReview.objects.all().values())
	return JsonResponse(customers_reviews, safe=False)

def add_to_cart(request):
	data = json.loads(request.body)
	product_id = data.get('cartItemId')
	item_to_add_to_cart = Product.objects.get(id=product_id)
	if request.user.is_authenticated == False:
		if request.session.session_key == None:
			request.session.create()
			Cart.objects.create(image=item_to_add_to_cart.image, name=item_to_add_to_cart.name, price=item_to_add_to_cart.price, session_id=request.session.session_key)
		else:
			Cart.objects.create(image=item_to_add_to_cart.image, name=item_to_add_to_cart.name, price=item_to_add_to_cart.price, session_id=request.session.session_key)
	else:
		Cart.objects.create(customer = request.user, image=item_to_add_to_cart.image, name=item_to_add_to_cart.name, price=item_to_add_to_cart.price)
	return JsonResponse('sdj', safe=False)

def cart(request):
	_delete_items(request)
	number_of_cart_items = 0
	cart_items = []	
	number_of_cart_items = []
	if request.user.is_authenticated:
		for item in Cart.objects.filter(customer=request.user):
			if item.session_id == '':
				cart_items.append(item)
	else:
		cart_items = Cart.objects.filter(session_id=request.session.session_key)

	item_id = request.POST.get('delete-item')
	if request.method == 'POST':
		try:
			if request.user.is_authenticated:
				if Cart.objects.get(id=item_id) in cart_items:
					index_of_item_to_delete = cart_items.index(Cart.objects.get(id=item_id))
					item_to_delete = Cart.objects.get(id=item_id).delete()
					cart_items.remove(index_of_item_to_delete)
			else:
				Cart.objects.filter(id=item_id).delete()

		except:
			return redirect('cart')
	if request.user.is_authenticated:
		for item in Cart.objects.filter(customer=request.user):
			if item.session_id == '':
				number_of_cart_items.append(item)
		number_of_cart_items = len(number_of_cart_items)
	else:
		number_of_cart_items = Cart.objects.filter(session_id=request.session.session_key).count()
	context = {'cart_items': cart_items, 'number_of_cart_items': number_of_cart_items}
	return render(request, 'ecommerce_app/cart.html', context)

def sign_in(request):
	user_not_available = False
	if request.method == 'POST':
		username = request.POST.get('username')
		password = request.POST.get('password')
		user = authenticate(request, username=username, password=password)
		if user is not None:
			login(request, user)
			return redirect('home')
		else:
			user_not_available = True
	context = {'user_not_available': user_not_available}
	return render(request, 'ecommerce_app/sign-in.html', context)

def sign_up(request):
	account_exist = False
	if request.method == 'POST':
		username = request.POST.get('username')
		email = request.POST.get('email')
		password = request.POST.get('password')
		confirm_password = request.POST.get('confirm-password')
		user = authenticate(username=username, password=password)
		if User.objects.filter(username=username).count() == 0 and User.objects.filter(email=email).count() == 0 and user == None:
			User.objects.create_user(username, email, password)
			try:
				login(request, user)
			except:
				return redirect('sign-in')
			return redirect('home')
		else:
			account_exist = True
	context = {'account_exist': account_exist}
	return render(request, 'ecommerce_app/sign-up.html', context)

def logout_user(request):
	logout(request)
	return redirect('home')

def checkout(request):
	return render(request, 'ecommerce_app/checkout.html')