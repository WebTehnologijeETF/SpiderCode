//START - TabManager
function TabManager(ace_manager){
	this.ace_manager = ace_manager;

	this.tabs = [];
	this.current_tab = null;
	//this.initializeMapper();
}
 
TabManager.prototype.addTab = function(file){
	for(var i = 0; i < this.tabs.length; i++){
		if(this.tabs[i] && this.tabs[i].getPath() === file.getPath())
			return this.tabs[i].id;
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


TabManager.prototype.showTab = function showTab(tab_id){
	var tab = this.$getTabById(tab_id);

	this.ace_manager.getVirtualRenderer().showTab(tab_id);
	this.ace_manager.getSessionManager().showSession(tab.session_id);
	
	this.current_tab = tab_id;
}

TabManager.prototype.closeTab = function closeTab(tab_id){
	var tab = this.$getTabById(tab_id);
	for(var i = 0; i < this.tabs.length; i++){
		if(this.tabs[i] === tab){
			delete this.tabs[i];
		} 
	}

	this.ace_manager.getVirtualRenderer().removeTab(tab_id);
	this.ace_manager.getSessionManager().deleteSession(tab.session_id);

	//Otvaranje nekog file-a
	if(this.current_tab === tab_id){
		var next_tab_id = null;
		for(var i = 0; i < this.tabs.length; i++){
			if(this.tabs[i]){
				next_tab_id = this.tabs[i].id;
				break;
			}
		}
			
		if(next_tab_id)
			this.showTab(next_tab_id);
		else
			this.ace_manager.getSessionManager().showBlankSession();
	}
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
		if(this.tabs[i] && this.tabs[i].id === tab_id)
			return this.tabs[i];
	}

	throw "tab_id is wrong";
}

TabManager.prototype.saveTab = function saveTab(tab_id){
	var tab = this.$getTabById(tab_id);

	//alert("tab");
	var newContent = this.ace_manager.getSessionManager().getContent(tab.getSessionId());
	this.ace_manager.getFileManager().updateFile(tab.getPath(), newContent);
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
	return this.file.getName();
}

Tab.prototype.getPath = function getPath(){
	return this.file.getPath();
}

Tab.prototype.setFile = function setFile(file){
	this.file = file;
}

Tab.prototype.getContent = function getContent(){
	return this.file.getContent();
}

Tab.prototype.getSessionId = function getSessionId(){
	return this.session_id;
}
//END - Tab