function TestManager(){
	this.reset();
}

TestManager.prototype.reset = function(){
	this.id = null;
	this.name = "";
	this.language= "C++";
	this.required_compiler = "g++";
	this.preferred_compiler =  "g++";
	this.compiler_features = [];
	this.compiler_options = "-O1 -Wall -Wuninitialized -Winit-self -Wfloat-equal -Wno-sign-compare -Werror=implicit-function-declaration -Werror=vla -pedantic -lm -pass-exit-codes";
	this.compiler_options_debug = "-ggdb -lm -pass-exit-codes";
	this.compile = "true";
    this.run = "false";
    this.test = "true";
    this.debug = "true";
	this.profile = "true";
	this.test_specifications = [];
}

TestManager.prototype.addTest = function(test){
	for(var i = 0; i < this.test_specifications.length; i++)
		if(this.test_specifications[i] && this.test_specifications[i].id === test.id)
			throw "Test with this ID already exist";

	var id = this.test_specifications.push(test) - 1;
	test.id = id;

	return id;
}



function Test(){
	this.id = null;
	this.require_symbols = [ ];
	this.replace_symbols = [ ];
	this.code = "TabelarnaFunkcija tf;\r\n\r\nfor (double x = 100.0; x >= 0.0; x -= 0.1)\r\n{\r\n\ttf.DodajPar(x, 2 * x);\r\n\ttf.DodajPar(100.0 + x, 2 * (100.0 + x));\r\n\ttf.DodajPar(-100.0 + x, 2 * (-100.0 + x));\r\n}\r\n\r\ncout << fixed << setprecision(2) << tf(1.0) << endl;\r\ncout << fixed << setprecision(2) << tf(1.05) << endl;\r\ncout << fixed << setprecision(2) << tf(1.1) << endl;";
	this.global_above_main = "#include <iomanip>";
	this.global_top = "";
	this.running_params = { "timeout": 10, "vmem": 1000000, "stdin": "" };
	this.expected = [ "2.00\\n2.10\\n2.20\\n" ]; 
	this.expected_exception = false;
	this.expected_crash = false;
	this.ignore_whitespace = false;
	this.regex = false;
	this.substring = false 
}