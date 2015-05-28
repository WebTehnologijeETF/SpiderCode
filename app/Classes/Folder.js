function Folder (name, path, content, id){

	this.Name = name;

	if(id != undefined)
		this.Id = id;
	if(path != undefined)
		this.Path = path;
	if(content != undefined)
		this.Content = content;
    else 
    	this.Content = [];

    this.type = "folder";
    this.IsLoad = false;
}

Folder.prototype.getName = function(){
	return this.Name;
}

Folder.prototype.getIsLoad = function(){
	return this.IsLoad;
}

Folder.prototype.getPath = function(){
	return this.Path;
}

Folder.prototype.getId = function(){
	return this.Id;
}

Folder.prototype.getContent = function(){
	return this.Content;
}

Folder.prototype.setName = function(name){
	this.Name = name;
}

Folder.prototype.setPath = function(p){
	this.Path = p;
}

Folder.prototype.setId = function(id){
	this.Id = id;
}

Folder.prototype.setContent = function(content){
	this.Content = content;
}


Folder.prototype.setIsLoad = function(isLoad){
	this.IsLoad = isLoad;
}

Folder.prototype.getFolders = function(){
	var folders = [];

	var cont = this.getContent();
	for(var item in cont){
		if(cont[item].type == "folder")
			folders.push(cont[item]);
	}

	return folders;
}

Folder.prototype.getFiles = function(){
	var files = [];

	var cont = this.getContent();
	for(var item in cont){
		if(cont[item].type == "file")
			files.push(cont[item]);
	}

	return files;
}