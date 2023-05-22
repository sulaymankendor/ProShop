$(document).ready(function(){
	setTimeout(function(){
		$('.user-does-not-exist')[0].style.display = 'none';
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

	$('.username-password-input').on('keypress', function(e){
		if(e.which === 13){
			e.preventDefault()
		}
	})
	$('.login-btn').on('click', function(e){
		
		if($('.username-input').val() === '' && $('.password-input').val() === ''){
			e.preventDefault()
			alert('Enter Username and Password to login')
		}
		else if($('.username-input').val() === ''){
			e.preventDefault()
			alert('Invalid Username')
		}else if($('.password-input').val() === ''){
			e.preventDefault()
			alert('Invalid Password')
		}
	})
})