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
}

Folder.prototype.getName = function(){
	return this.Name;
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

Folder.prototype.getFolders = function(){
	var folders = [];

	for(var item in this.getContent()){
		if(item.type == "folder")
			folders.push(item);
	}

	return folders;
}

Folder.prototype.getFiles = function(){
	var files = [];

	for(var item in this.getContent()){
		if(item.type  && item.type == "file")
			files.push(item);
	}

	return files;
}