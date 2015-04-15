
validator = new Object();
		validator.Mail = function(email){
			
			var regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]\.[a-zA-Z]{2,4}$");
			if(regex.test(email))
				return true;
			else
				return false;
		};
		validator.LoadValidators = function (){

		};
	

