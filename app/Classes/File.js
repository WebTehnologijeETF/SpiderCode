function File (name, path, content, id){

	this.Name = name;
	if(id != undefined)
		this.Id = id;
	
	if(path != undefined)
		this.Path = path;
	
	if(content != undefined)
		this.Content = content;
	
	this.type = "file";
}

	File.prototype.getName = function(){
		return this.Name;
	}


	File.prototype.getPath = function(){
		return this.Path;
	}


	File.prototype.getId = function(){
		return this.Id;
	}


	File.prototype.getContent = function(){
		return this.Content;
	}


	File.prototype.setName = function(name){
		this.Name = name;
	}


	File.prototype.setPath = function(p){
		this.Path = p;
	}


	File.prototype.setId = function(id){
		this.Id = id;
	}


	File.prototype.setContent = function(content){
		this.Content = content;
	}


	File.prototype.getFileExtension = function(){
		// TODO: this;
	}


	File.prototype.setFileExtension = function(){
		// TODO: this;
	}