if(typeof(ace) == 'undefined')
		throw "Ace must be defined. Please include Ace Editor";

//DOMElement: DOMElement
//theme: String - OPTIONAL paramether
function AceManager(DOMElement, theme){
	if(typeof(ace) == 'undefined')
		throw "Ace must be defined. Please include Ace Editor";
	if(typeof(DOMElement) != 'object' && typeof(DOMElement) != 'string')
		throw "DOMElement must be object or string.";

	//including Ace moduls, these are constructors,
	var VirtualRenderer = ace.require("ace/virtual_renderer").VirtualRenderer;
	var Editor = ace.require("ace/editor").Editor;

	var virtualRenderer;
	if(typeof theme === "string")
		var virtualRenderer = new VirtualRenderer(DOMElement, "ace/theme/" + theme);
	else
		var virtualRenderer = new VirtualRenderer(DOMElement, "ace/theme/tomorrow_night");


	this.SessionManager = new SessionManager(this);

	this.editor = new Editor(virtualRenderer);
	this.editor.setReadOnly(true);
}


//theme: string
AceManager.prototype.setTheme = function(theme){
	if(typeof theme !== "string")
		throw "Theme must be string";
	this.editor.setTheme("ace/theme/"+theme);
}


AceManager.prototype.editor = function(){
	return editor;
}


//Session Manager
function SessionManager(ace_manager){
	this.sessions = [];
	this.ace_manager = ace_manager;

	this.UndoManager = ace.require("ace/undomanager").UndoManager;
	this.EditSession = ace.require("ace/edit_session").EditSession;
}

//Add new session to manager and return session ID(index)
SessionManager.prototype.addSession = function(document, mode){	
	var editSession = new this.EditSession(document, "ace/mode/" + mode);
	editSession.setUndoManager(new this.UndoManager());
	return this.sessions.push(editSession); 
}


//show session with id sent by paramether in editor 
SessionManager.prototype.showSession = function(id){
	if(id < 0 || id > this.sessions.length)
		throw "Index out of range in sessions";

	if(!this.sessions[id])
		throw "Session with id: " + id + " is deleted";
	
	this.ace_manager.editor.setReadOnly(false);
	this.ace_manager.editor.setSession(this.sessions[id]);
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
