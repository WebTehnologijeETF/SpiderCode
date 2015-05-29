//DOMElement: DOMElement where AceManager would be rendered
//theme: String - OPTIONAL paramether
function AceManager(DOMElement, theme){
	
	if(typeof(ace) == 'undefined')
		throw "Ace must be defined. Please include Ace Editor";
	if(typeof(DOMElement) != 'object' && typeof(DOMElement) != 'string')
		throw "DOMElement must be object or string.";

	//including Ace moduls, these are constructors,
	var Editor = ace.require("ace/editor").Editor;

	this.SessionManager = new SessionManager(this);
	this.VirtualRenderer = new VirtualRenderer(this, DOMElement, theme);
	this.TabManager = new TabManager(this);

	this.editor = new Editor(this.VirtualRenderer.getEditorRenderer());
	this.editor.setReadOnly(true);
	//this.editor.setAutoScrollEditorIntoView(true);

	/*this.editor.setOptions({
		maxLines: Infinity
	});*/
}


//theme: string
AceManager.prototype.setTheme = function(theme){
	if(typeof theme !== "string")
		throw "Theme must be string";
	this.getEditor().setTheme("ace/theme/"+theme);
}

AceManager.prototype.getEditor = function(){
	return editor;
}


AceManager.prototype.resize = function(width, height, left, top){
	//alert("ACEM-w:" + width + ", h:" + height + ", l:" + left + ", t:" + top);
	this.getVirtualRenderer().resize(width, height, left, top);
}

AceManager.prototype.getVirtualRenderer = function(){
	return this.VirtualRenderer;
}

AceManager.prototype.getSessionManager = function(){
	return this.SessionManager;
}

AceManager.prototype.getTabManager = function(){
	return this.TabManager;
}

AceManager.prototype.getFileManager = function(){
	if(!this.file_manager)
		throw "FileManager isn't set";


	return this.file_manager;
}

AceManager.prototype.setFileManager = function(fileManager){
	if(!fileManager instanceof FileManager)
		throw "FileManager must be object";

	this.file_manager = fileManager;
}
//END - AceManager



//START - Session Manager
function SessionManager(ace_manager){
	this.sessions = [];
	this.ace_manager = ace_manager;

	this.UndoManager = ace.require("ace/undomanager").UndoManager;
	this.EditSession = ace.require("ace/edit_session").EditSession;
}

//Add new session to manager and return session ID(index)
//document : String - code that will be shown
//Mode : String - is javascript, c_cpp, ...
SessionManager.prototype.addSession = function(document, mode){

	//TODO: instead of putting it on and of array we can put new editSession on empty id
	var editSession = new this.EditSession(document, "ace/mode/" + mode);
	editSession.setUndoManager(new this.UndoManager());
	return this.sessions.push(editSession) - 1; 
}

//show session with id sent by paramether in editor 
SessionManager.prototype.showSession = function(id){
	if(id < 0 || id >= this.sessions.length)
		throw "Index out of range in sessions";

	if(!this.sessions[id])
		throw "Session with id: " + id + " is deleted";
	
	this.ace_manager.editor.setReadOnly(false);
	this.ace_manager.editor.setSession(this.sessions[id]);
}

//Same as addSession but it show Session too, calling showSession method
SessionManager.prototype.addAndShowSession = function(document, mode){
	var ses_id = this.addSession(document, mode);
	this.showSession(ses_id);

	return ses_id;
}

//Delete session with id sent by paramether 
//Other sessions still have same id
SessionManager.prototype.deleteSession = function(id){
	if(id < 0 || id > this.sessions.length)
		throw "Index out of range in sessions";

	if(!this.sessions[id])
		throw "Session with id: " + id + " already deleted";

	delete this.sessions[id];
}

SessionManager.prototype.getContent = function getContent(session_id){
	if(session_id < 0 || session_id > this.sessions.length)
		throw "Index out of range in sessions";
	
	if(!this.sessions[session_id])
		throw "Session with id: " + id + " already deleted";
	return this.sessions[session_id].getValue();
}
//END - SessionManager