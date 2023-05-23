$(document).ready(function() {
	function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
    }
    }
    return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

	$('.add-to-cart-btn').on('click', function(){
		const data = {cartItemId: $('.product-info-div2')[0].dataset.productid};
		fetch('/add-to-cart/', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		    'X-CSRFToken': csrftoken,
		  },
		  body: JSON.stringify(data),
		})
		  .then((response) => response.json())
		  .then((data) => {
		    console.log('Success:', data);
		    location.replace('/cart/')
		  })
		  .catch((error) => {
		    console.error('Error:', error);
		  });
	})
	let reviewTextarea = document.getElementsByClassName('review-textarea')
	reviewTextarea[0].addEventListener('change', function(){
		let numberOfCharacters = $('.review-textarea').val().length;
		$('.number-of-text').text(`${numberOfCharacters}`);
	})
	let star1 = document.getElementsByClassName('star1');
	let firstStar = star1[0].dataset.number;
	let clicked = 'not clicked';
	let count = 0;
	$('.star1').on('click', function(){
		let starColor = star1[0].dataset.color;
		clicked = 'clicked';
		count = 1; 
		if($('.star1').css('color') === 'rgb(0, 0, 0)'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number <= firstStar){
					$('.stars')[i].style.color = 'orange';	
				}
			}
		}else{
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number > firstStar){
					$('.stars')[i].style.color = 'black';
				}
			}
		}
	})
	$('.star1').mousemove(function(){
		star1[0].style.color = 'orange';
	})
	$('.star1').mouseleave(function(){
		if(clicked === 'clicked'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number >= count){
					$('.stars')[i].style.color = 'black';
				}
			}
		}else if(clicked === 'not clicked'){
			star1[0].style.color = 'black';

		}else{
			star1[0].style.color = 'orange';
		}
	})


	let star2 = document.getElementsByClassName('star2')
	let secondStar = star2[0].dataset.number;
	$('.star2').on('click', function(){
		clicked = 'clicked';
		count = 2; 
		if($('.star2').css('color') === 'rgb(0, 0, 0)'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number <= secondStar){
					$('.stars')[i].style.color = 'orange';
				}
			}
		}else{
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number > secondStar){
					$('.stars')[i].style.color = 'black';
				}
			}
		}
	})
	$('.star2').mousemove(function(){
		for(let i = 0; i < $('.stars').length; i++){
			if($('.stars')[i].dataset.number <= secondStar){
				$('.stars')[i].style.color = 'orange';
			}
		}
	})

	$('.star2').mouseleave(function(){
		if(clicked === 'clicked'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number >= count){
					$('.stars')[i].style.color = 'black';
				}
			}
		}else if(clicked === 'not clicked'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number <= secondStar){
					$('.stars')[i].style.color = 'black';
				}
			}

		}
	})

	let star3 = document.getElementsByClassName('star3')
	let thirdStar = star3[0].dataset.number;
	$('.star3').on('click', function(){
		clicked = 'clicked';
		count = 3; 
		if($('.star3').css('color') === 'rgb(0, 0, 0)'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number <= thirdStar){
					$('.stars')[i].style.color = 'orange';
				}
			}
		}else{
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number > thirdStar){
					$('.stars')[i].style.color = 'black';
				}
			}
		}
	})
	$('.star3').mousemove(function(){
		for(let i = 0; i < $('.stars').length; i++){
			if($('.stars')[i].dataset.number <= thirdStar){
				$('.stars')[i].style.color = 'orange';
			}
		}
	})

	$('.star3').mouseleave(function(){
		if(clicked === 'clicked'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number >= count){
					$('.stars')[i].style.color = 'black';
				}
			}
		}else if(clicked === 'not clicked'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number <= thirdStar){
					$('.stars')[i].style.color = 'black';
				}
			}

		}
	})
	let star4 = document.getElementsByClassName('star4')
	let fourthStar = star4[0].dataset.number;
	$('.star4').on('click', function(){
		clicked = 'clicked';
		count = 4; 
		if($('.star4').css('color') === 'rgb(0, 0, 0)'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number <= fourthStar){
					$('.stars')[i].style.color = 'orange';
				}
			}
		}else{
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number > fourthStar){
					$('.stars')[i].style.color = 'black';
				}
			}

		}
	})
	$('.star4').mousemove(function(){
		for(let i = 0; i < $('.stars').length; i++){
			if($('.stars')[i].dataset.number <= fourthStar){
				$('.stars')[i].style.color = 'orange';
			}
		}
	})

	$('.star4').mouseleave(function(){
		if(clicked === 'clicked'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number >= count){
					$('.stars')[i].style.color = 'black';
				}
			}
		}else if(clicked === 'not clicked'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number <= fourthStar){
					$('.stars')[i].style.color = 'black';
				}
			}

		}
		
	})
	let star5 = document.getElementsByClassName('star5')
	let fifthStar = star5[0].dataset.number;
	$('.star5').on('click', function(){
		clicked = 'clicked';
		count = 5; 
		if($('.star5').css('color') === 'rgb(0, 0, 0)'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number <= fifthStar){
					$('.stars')[i].style.color = 'orange';
				}
			}
		}else{
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number > fifthStar){
					$('.stars')[i].style.color = 'black';
				}
			}
		}
	})
	$('.star5').mousemove(function(){
		for(let i = 0; i < $('.stars').length; i++){
			if($('.stars')[i].dataset.number <= fifthStar){
				$('.stars')[i].style.color = 'orange';
			}
		}
	})

	$('.star5').mouseleave(function(){
		if(clicked === 'clicked'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number >= count){
					$('.stars')[i].style.color = 'black';
				}
			}
		}else if(clicked === 'not clicked'){
			for(let i = 0; i < $('.stars').length; i++){
				if($('.stars')[i].dataset.number <= fifthStar){
					$('.stars')[i].style.color = 'black';
				}
			}
		}
	})
	$('.review-title').on('keypress', function(e){
		if(e.which === 13){
			e.preventDefault()
		}
	})
	$('.submit-review').on('click', function(e){
		e.preventDefault();
		let title = $('.review-title').val();
		let description = $('.review-textarea').val();
		let productName = $('.item-name').text()
		const data = {numberOfOrangeStars: count, reviewTitle: title, review: description, productName: productName};
		if(count === 0){
			alert('Rate the product')
		}
		else if(title === ''){
			alert('Write a review title.')
		}else if(description === ''){
			alert('Write a review description.')
		}else{
			fetch('/add-review/', {
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			    'X-CSRFToken': csrftoken,
			  },
			  body: JSON.stringify(data),
			})

			  .then((response) => response.json())
			  .then((data) => {
			  	console.log(data)
			  	for(let i = 0; i < $('.stars').length; i++){
			  		$('.stars')[i].style.color = 'black';
			  	}
			  	count = 0;
			  	$('.review-title').val('')
			  	$('.review-textarea').val('')
				location.reload()  
			  })
			  .catch((error) => {
			    console.error('Error:', error);
			  });
			}
	})
	let listOfnumberOfOrangeStars = [];
	for(let i = 0; i < $('.customer-ratings').length; i++){
		listOfnumberOfOrangeStars.push({id: $('.customer-ratings')[i].dataset.id, numberOfOrangeStars: $('.customer-ratings')[i].dataset.numberOfOrangeStars})

	}
	let counter = 0;
	function function_name(listOfnumberOfOrangeStars) {
		if(counter < $('.customer-ratings').length){
			for(let i = 0; i < $('.review-stars').length; i++){
				if(parseInt($('.review-stars')[i].dataset.id) === parseInt(listOfnumberOfOrangeStars[counter].id)){
					if(parseInt($('.review-stars')[i].dataset.number) <= parseInt(listOfnumberOfOrangeStars[counter].numberOfOrangeStars)){
						$('.review-stars')[i].style.color = 'orange';
					}	
				}
		 	}
			counter++
			function_name(listOfnumberOfOrangeStars)
		}
	}
	function_name(listOfnumberOfOrangeStars)
	$('.no-review').text($('.item-name').text())
	for (let i = 0; i < $('.best-review-star').length; i++) {
		if (parseInt($('.best-review-star')[i].dataset.number) <= parseInt($('.best-customer-ratings')[0].dataset.bestRatingNumberOfOrangeStar)){
			$('.best-review-star')[i].style.color = 'orange';
		}
	}
})