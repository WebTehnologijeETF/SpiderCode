if(typeof(ace) == 'undefined')
		throw "Ace must be defined. Please include Ace Editor";

//DOMElement: DOMElement
//theme: String - OPTIONAL paramether
function AceManager(DOMElement, mode, theme){
	if(typeof(ace) == 'undefined')
		throw "Ace must be defined. Please include Ace Editor";
	if(typeof(DOMElement) != 'object' && typeof(DOMElement) != 'string')
		throw "DOMElement must be object or string.";
	if(typeof(mode) !== 'string')
		throw "mode must be string";

	//including Ace moduls, these are constructors,
	var VirtualRenderer = ace.require("ace/virtual_renderer").VirtualRenderer;
	var Editor = ace.require("ace/editor").Editor;
	this.UndoManager = ace.require("ace/undomanager").UndoManager;
	this.EditSession = ace.require("ace/edit_session").EditSession;


	var virtualRenderer;
	if(typeof theme === "string")
		var virtualRenderer = new VirtualRenderer(DOMElement, "ace/theme/" + theme);
	else
		var virtualRenderer = new VirtualRenderer(DOMElement, "ace/theme/tomorrow_night");


	this.sessions = [];
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

AceManager.prototype.addSession = function(document, mode){	
	var editSession = new this.EditSession(document, "ace/mode/" + mode);
	editSession.setUndoManager(new this.UndoManager());
	return this.sessions.push(editSession); 
}


AceManager.prototype.showSession = function(index){
	if(index < 0 || index > this.sessions.length)
		throw "Index out of range in sessions";
	this.editor.setReadOnly(false);
	this.editor.setSession(this.sessions[index]);
}