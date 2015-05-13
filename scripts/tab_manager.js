//START - TabManager
function TabManager(ace_manager){
	this.ace_manager = ace_manager;

	this.tabs = [];

	//this.initializeMapper();
}
 
TabManager.prototype.addTab = function(file){
	for(var i = 0; i < this.tabs.length; i++){
		if(this.tabs[i].getPath() === file.path)
			return;
	}

	var new_tab = new Tab(file);
	var id = this.tabs.push(new_tab) - 1;
	new_tab.id = id;

	//ading new session
	var sessionManager = this.ace_manager.getSessionManager();
	var ses_id = sessionManager.addSession(new_tab.getContent(), this.getModeFromName(new_tab.getName()));
	//sessionManager.showSession(ses_id);
	new_tab.session_id = ses_id;

	var vRender = this.ace_manager.getVirtualRenderer();
	var tabDOM = vRender.makeTab(new_tab.getName(),id);
	vRender.addTab(tabDOM);

	return id;
}


TabManager.prototype.getModeFromName = function getModeFromName(name){
	var ext = name.substr(Math.max(0, name.lastIndexOf(".")) || Infinity);
	//alert(ext);

	return this.mapper.get(ext);
}

TabManager.prototype.$getTabById = function(tab_id){
	if(tab_id < 0 || tab_id > this.tabs.length - 1)
		throw "Tab_id is out of range";

	for(var i = 0; i < this.tabs.length; i++){
		if(this.tabs[i].id === tab_id)
			return this.tabs[i];
	}

	throw "tab_id is wrong";
}

TabManager.prototype.showTab = function showTab(tab_id){
	var tab = this.$getTabById(tab_id);

	this.ace_manager.getVirtualRenderer().showTab(tab_id);
	this.ace_manager.getSessionManager().showSession(tab.session_id);
	
}

TabManager.prototype.closeTab = function closeTab(tab_id){
	var tab = this.$getTabById(tab_id);

	this.ace_manager.getVirtualRenderer().removeTab(tab_id);
	this.ace_manager.getSessionManager().deleteSession(tab.session_id);
	
}


//Mapper
TabManager.prototype.mapper = new Map();
(function(){
	var mapper = TabManager.prototype.mapper;

	mapper.set(".js", "javascript");
	mapper.set(".cpp", "c_cpp");
	mapper.set(".c", "c_cpp");
	mapper.set(".h", "c_cpp");
	mapper.set(".cs", "csharp");
	mapper.set(".css", "css");
	mapper.set(".html", "html");
	mapper.set(".htm", "html");
	mapper.set(".xhtml", "html");
	mapper.set(".json", "json");
	mapper.set(".java", "java");
	mapper.set(".md", "markdown");
	mapper.set(".markdown", "markdown");
	mapper.set(".matlab", "matlab");
	mapper.set(".py", "python");
	mapper.set(".sass", "sass");
	mapper.set(".mysql", "mysql");
	mapper.set(".sql", "sql");
	mapper.set(".txt", "text");
}())

//END - TabManager



//START - Tab
function Tab(file, id, session_id){
	this.file = file;
	this.id = id;
	this.session_id = session_id;
}

Tab.prototype.getName = function getName(){
	return this.file.name;
}

Tab.prototype.getPath = function getPath(){
	return this.file.path;
}

Tab.prototype.setFile = function setFile(file){
	this.file = file;
}

Tab.prototype.getContent = function getContent(){
	return this.file.content;
}


function File(name, path, content, sha){
	this.name = name;
	this.path = path;
	this.loaded = !content ? false : true;
	this.content = content;
	this.sha = sha;
}
//END - Tab