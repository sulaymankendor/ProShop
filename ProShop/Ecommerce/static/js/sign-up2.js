$(document).ready(function() {
    setTimeout(function(){
        $('.account-exists')[0].style.display = 'none';
    }, 5000)
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


	$('.register-btn').on('click', function(e){
		if($('.username').val() === '' || $('.email-address').val() === '' || $('.create-password').val() === '' || $('.repeat-password').val() === ''){
			e.preventDefault()
			alert('invalid sign-in form')
		  }else if($('.create-password').val() !== $('.repeat-password').val()) {
		  	e.preventDefault()
		  	alert('Passwords do not match')
		  }
	})
})