function File (name, path, content, id){

	this.Name = name;
	if(id != undefined)
	this.Id = id;
	if(path != undefined)
	this.Path = path;
	if(content != undefined)
	this.Content = content;

	}

	File.prototype.getName = function(){
		return Name;
	}


	File.prototype.getPath = function(){
		return Path;
	}


	File.prototype.getId = function(){
		return Id;
	}


	File.prototype.getContent = function(){
		return Content;
	}


	File.prototype.setName = function(name){
		Name = name;
	}


	File.prototype.setPath = function(p){
		Path = p;
	}


	File.prototype.setId = function(id){
		Id = id;
	}


	File.prototype.setContent = function(content){
		Content = content;
	}


	File.prototype.getFileExtension = function(){
		// TODO: this;
	}


	File.prototype.setFileExtension = function(){
		// TODO: this;
	}