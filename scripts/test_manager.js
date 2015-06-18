function Task(){
	this.reset();
}

Task.prototype.reset = function(){
	this.id = 1;
	this.name = "";
	this.language= "C++";
	this.required_compiler = "g++";
	this.preferred_compiler =  "g++";
	this.compiler_features = [];
	this.compiler_options = "-O1 -Wall -Wuninitialized -Winit-self -Wfloat-equal -Wno-sign-compare -Werror=implicit-function-declaration -Werror=vla -pedantic -lm -pass-exit-codes";
	this.compiler_options_debug = "-ggdb -lm -pass-exit-codes";
	this.compile = "true";
    this.run = "false";
    this.running_params = { "timeout": 10, "vmem": 1000000, "stdin": "" };
    this.test = "true";
    this.debug = "true";
	this.profile = "true";
	this.test_specifications = [];
}

Task.prototype.addTest = function(test){
	for(var i = 0; i < this.test_specifications.length; i++)
		if(this.test_specifications[i] && this.test_specifications[i].id === test.id)
			throw "Test with this ID already exist";

	var id = this.test_specifications.push(test) - 1;
	test.id = id;

	return id;
}

Task.prototype.removeTest = function(test){
	for(var i = 0; i < this.test_specifications.length; i++)
		if(this.test_specifications[i] && this.test_specifications[i].id == test){
			this.test_specifications.splice(i,1);
			return;
		} 
			
	throw "Test with this ID doesn't exist";
}
 
Task.prototype.showTest = function(test,test_id,req_sim, exp_sim, code, gam, gt, exc, iws, reg, sub){
	if(typeof(test) != "Object"){
		var nasao = false
		for(var i = 0; i < this.test_specifications.length; i++)
			if(this.test_specifications[i] && this.test_specifications[i].id == test){
				test = this.test_specifications[i];
				nasao = true;
				break;
			}
		if(nasao === false)
			throw "Test s tim ID-em ne postoji";
	}
	
	document.getElementById(test_id).innerHTML = test.id;
	document.getElementById(req_sim).value = test.require_symbols[0] || "";
	document.getElementById(exp_sim).value = test.expected[0] || "";
	document.getElementById(code).env.editor.setValue(test.code || "", 1);
	document.getElementById(gam).env.editor.setValue(test.global_above_main || "", 1);
	document.getElementById(gt).env.editor.setValue(test.global_top || "", 1);
	document.getElementById(exc).checked = test.expected_exception || false;
	document.getElementById(iws).checked = test.ignore_whitespace || false;
	document.getElementById(reg).checked = test.regex || false;
	document.getElementById(sub).checked = test.substring || false;
}

 
Task.prototype.saveTest = function(test,test_id,req_sim, exp_sim, code, gam, gt, exc, iws, reg, sub){
	if(typeof(test) != "Object"){
		var nasao = false
		for(var i = 0; i < this.test_specifications.length; i++)
			if(this.test_specifications[i] && this.test_specifications[i].id == test){
				test = this.test_specifications[i];
				nasao = true;
				break;
			}
		if(nasao === false)
			throw "Test s tim ID-em ne postoji";
	}
	
	if(!test.require_symbols[0]){
		test.require_symbols.push("");
	}
	test.require_symbols[0] = document.getElementById(req_sim).value || "";

	if(!test.expected[0]){
		test.expected.push("");
	}
	test.expected[0] = document.getElementById(exp_sim).value || "";
	
	test.code = document.getElementById(code).env.editor.getValue();
	test.global_above_main = document.getElementById(gam).env.editor.getValue();
	test.global_top = document.getElementById(gt).env.editor.getValue();
	test.expected_exception = document.getElementById(exc).checked;
	test.ignore_whitespace = document.getElementById(iws).checked;
	test.regex = document.getElementById(reg).checked ;
	test.substring = document.getElementById(sub).checked;
}

Task.prototype.resetFields = function(test_id,req_sim, exp_sim, code, gam, gt, exc, iws, reg, sub){
	
	document.getElementById(test_id).innerHTML = "<em>odaberite test lijevo</em>";
	document.getElementById(req_sim).value = "";
	document.getElementById(exp_sim).value = "";
	document.getElementById(code).env.editor.setValue("", -1);
	document.getElementById(gam).env.editor.setValue("", -1);
	document.getElementById(gt).env.editor.setValue("", 1);
	document.getElementById(exc).checked = false;
	document.getElementById(iws).checked = false;
	document.getElementById(reg).checked = false;
	document.getElementById(sub).checked = false;
}

Task.prototype.getTests = function(){
	return this.test_specifications;
}
function Test(){
	this.id = null;
	this.require_symbols = [ ];
	this.replace_symbols = [ ];
	this.code = "";
	this.global_above_main = "";
	this.global_top = "";
	this.running_params = { "timeout": 10, "vmem": 1000000, "stdin": "" };
	this.expected = [""]; 
	this.expected_exception = false;
	this.expected_crash = false;
	this.ignore_whitespace = false;
	this.regex = false;
	this.substring = false 
}