$(document).ready(function(){
	let counter = 0;
	function function_name(){
		if ( counter < 5){
			for( let i = 0; i < $('.product-review-star').length; i++){
				if($('.product-review-star')[i].dataset.itemname === $('.product-card')[counter].dataset.itemname){
					if($('.product-card')[counter].dataset.numberoforangestars >= $('.product-review-star')[i].dataset.number){
						$('.product-review-star')[i].style.color = 'orange';
					}

				}
			}
			counter++
			function_name()
		}
	}
	function_name()
})