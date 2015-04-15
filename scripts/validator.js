
validator = new Object();
		validator.Mail = function(email){
			
			var regex = /^([\w-]+(\.[\w-]+)*)@(([\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			if(regex.test(email))
				return true;
			else
				return false;
		};

		validator.Phone = function(phone){

			var regex = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{3})$/;
			if(regex.test(phone))
				return true;
			else
				return false;
		}
		
	

