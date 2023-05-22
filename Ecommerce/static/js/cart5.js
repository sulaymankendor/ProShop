$(document).ready(function() {
	let price = 0;
	for(let i = 0; i < $('.item-price').length; i++){
		price = parseFloat($('.item-price')[i].innerText) + price;
	}
	$('.grand-total-price').text(`${price.toFixed(2)}`);
	let listOfAddBtn = $('.add-btn');
	for(let i = 0; i < listOfAddBtn.length; i++){
		listOfAddBtn[i].addEventListener('click', function(){
			let counter = parseInt($('.counter')[i].innerText);
			let itemPrice = $('.item-price')[i].dataset.itemprice;
			if($('.counter')[i].dataset.itemid === this.dataset.itemid){
				$('.counter')[i].innerText = `${++counter}`;
				let itemsTotalPrice = parseFloat($('.item-price')[i].innerText) + parseFloat(itemPrice);
				$('.item-price')[i].innerText = `${itemsTotalPrice.toFixed(2)}`;
				let price = 0;
				for(let i = 0; i < $('.item-price').length; i++){
					price = parseFloat($('.item-price')[i].innerText) + price;
				}
				$('.grand-total-price').text(`${price.toFixed(2)}`);
			}

		})
	}
	let listOfSubtractBtn = $('.subtract-btn');
	for(let i = 0; i < listOfSubtractBtn.length; i++){
		listOfSubtractBtn[i].addEventListener('click', function(){
			let counter = parseInt($('.counter')[i].innerText);
			let itemPrice = $('.item-price')[i].dataset.itemprice;
			if($('.counter')[i].dataset.itemid === this.dataset.itemid){
				if($('.counter')[i].innerText === '1'){
					$('.counter')[i].innerText = '1'
				}else{
					$('.counter')[i].innerText = `${--counter}`;
					let itemsTotalPrice = parseFloat($('.item-price')[i].innerText) - parseFloat(itemPrice);
					$('.item-price')[i].innerText = `${itemsTotalPrice.toFixed(2)}`;
					let price = 0;
					for(let i = 0; i < $('.item-price').length; i++){
						price = parseFloat($('.item-price')[i].innerText) + price;
					}
					$('.grand-total-price').text(`${price.toFixed(2)}`);
				}
			}

		})
	}
})