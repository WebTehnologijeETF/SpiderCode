//DOMElement can be DOMElement but it can be it's html id
function FileManager(DOMElement){

	if(typeof(DOMElement) != 'object' && typeof(DOMElement) != 'string')
		throw "DOMElement must be object or string.";

	if(typeof(DOMElement) == 'string')
		DOMElement = document.getElementById(DOMElement);

}

FileManager.prototype.setAceManager = function(AceManager){
	if(typeof(AceManager) !== 'object')
		throw "AceManager must be object";

	this.ace_manager = AceManager;
}

FileManager.prototype.getAceManager = function(){
	if(typeof(this.ace_manager) !== object)
		throw "AceManager isn't set";

	return this.ace_manager;
}

FileManager.prototype.openInEditor = function(file)
{
    //file.type = "javascript";
    var id = this.getAceManager.getTabManager().addTab(file);
    this.getAceManager.getTabManager().showTab(id);

    //this.openedFile = file; //ovo openedFile ce poslije  biti atribut od span-a od taba 
}

function FMVirtualRender(FileManager, DOMElement){
	this.file_manager = FileManager;
	this.dom_element = DOMElement;
}

