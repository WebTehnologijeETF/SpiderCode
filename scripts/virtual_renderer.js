
//START - VirtualRenderer
function VirtualRenderer(ace_manager, DOMElement, theme){
	this.ace_manager = ace_manager;
	this.dom_element = DOMElement;
	this.theme = theme;

	this.render();	

	this.context_menu = this.makeContextMenu();

	this.dom_element.appendChild(this.context_menu);

}

VirtualRenderer.prototype.getContextMenu = function(){
	return this.context_menu;
}

VirtualRenderer.prototype.showContextMenu = function(x, y){
	var con = this.getContextMenu();
	alert("X:"+x + ", Y:" + y );
	con.style.visibility = "visible";
	con.style.left = x;
	con.style.top = y;
	con.style.position = "absolute";
}

VirtualRenderer.prototype.render = function(){
	var el = this.dom_element;

	var tabs = document.createElement("ul");
	//var sep = document.createElement("div");
	var editor = document.createElement("div");

	el.classList.add("acem");
	tabs.classList.add("acem", "acem-tabs");
	//sep.classList.add("acem", "acem-ribon");
	editor.classList.add("acem", "acem-editor");
	
	el.innerHTML = "";
	el.appendChild(tabs);
	//el.appendChild(sep);
	el.appendChild(editor);
 

	//including Ace moduls, these are constructors,
	var EditorRenderer = ace.require("ace/virtual_renderer").VirtualRenderer;

	var virtualRenderer;
	if(typeof this.theme === "string")
		virtualRenderer = new EditorRenderer(editor, "ace/theme/" + this.theme);
	else
		virtualRenderer = new EditorRenderer(editor, "ace/theme/tomorrow_night");


	this.editor_renderer = virtualRenderer;
	this.tabs = tabs;
	this.editor = editor;
}

VirtualRenderer.prototype.addTab = function addTab(DOMElement){
	this.tabs.appendChild(DOMElement);
}

 
VirtualRenderer.prototype.removeTab = function removeTab(tab_id){
	var tab = this.$getTabById(tab_id);
	this.tabs.removeChild(tab);
}

VirtualRenderer.prototype.showTab = function showTab(tab_id){
	for(tab in this.tabs.childNodes){
		if(this.tabs.childNodes[tab].classList){
			this.tabs.childNodes[tab].classList.remove("acem-tab-active");
		} 
	}

	var tab = this.$getTabById(tab_id);
	tab.classList.add("acem-tab-active");

}

VirtualRenderer.prototype.$getTabById = function(tab_id){
	var tab;
	var a =  this.tabs.childNodes;
	for(tab in this.tabs.childNodes){
		if(this.tabs.childNodes[tab].tab_id == tab_id){
			return this.tabs.childNodes[tab];
		} 
	}

	return null;
}
//make tab DOM element and return DOMElement, <li> element to be precise
VirtualRenderer.prototype.makeTab = function(name, tab_id){

	var el = document.createElement("li");
	el.classList.add("acem-tab");
	el.classList.add("not-selectable");
	
	var title = document.createElement("div");
	title.classList.add("acem-tab-title");
	//title.classList.add("not-selectable");
	var t_text = document.createTextNode(name);
	title.appendChild(t_text);

	el.appendChild(title);

	var carret = document.createElement("div");
	carret.innerHTML ="&#9660;";
	carret.classList.add("acem-tab-x");
	el.appendChild(carret);

	var x = document.createElement("div");
	x.innerHTML = "&#10006;";
	x.classList.add("acem-tab-x");

	el.appendChild(x);

	el.tab_id = tab_id;
	
	var t = this;

	el.addEventListener('mouseover',function(event){
		x.style.visibility = 'visible';
		carret.style.visibility = 'visible';
	}, false);


	el.addEventListener('mouseout',function(event){ 
		x.style.visibility = 'hidden';
		carret.style.visibility = 'hidden';
	}, false);

	el.addEventListener('click', function(event){
		t.ace_manager.getTabManager().showTab(tab_id);
	}, false);

	x.addEventListener('click', function(event){
		t.ace_manager.getTabManager().closeTab(tab_id);
		event.stopPropagation();
	}, false);

	carret.addEventListener('click', function(event){
		t.showCarret(event.clientX, event.clientY);

		event.stopPropagation();
	}, false);
	return el;
}

VirtualRenderer.prototype.getEditorRenderer = function(){
	return this.editor_renderer;
}

VirtualRenderer.prototype.makeContextMenu = function(){
	var el = document.createElement("div");
	el.classList.add("context-menu");

	var list = document.createElement("ul");
	list.classList.add("context-menu-list");
	el.appendChild(list);

	var save = document.createElement("li");
	save.classList.add("context-menu-item");
	save.innerHTML="Save";
	list.appendChild(save);

	var saveAs = document.createElement("li");
	saveAs.classList.add("context-menu-item");
	saveAs.innerHTML = "SaveAs...";
	list.appendChild(saveAs);

	var discardChanges = document.createElement("li");
	discardChanges.classList.add("context-menu-item");
	discardChanges.innerHTML = "Discard Changes";
	list.appendChild(discardChanges);

	return el;
}

VirtualRenderer.prototype.resize = function(width, height, left, top){
	this.dom_element.style.width = width + "px";
	this.dom_element.style.height = height + "px";
	this.dom_element.style.left = left + "px";
	this.dom_element.style.top = top + "px";

	this.tabs.style.position = "absolute";
	this.editor.style.position = "absolute";

	var tabs_height = 38;
	this.tabs.style.width = width + "px";
	this.tabs.style.height = tabs_height + "px";
	this.tabs.style.left = 0 + "px";
	this.tabs.style.top = 0 + "px";

	this.editor.style.width = width + "px";
	var pom = (height - tabs_height);
	this.editor.style.height = pom + "px";
	this.editor.style.left = 0 + "px";
	this.editor.style.top = tabs_height + "px";

	//this.onResize(true,100,100,100);

	this.editor_renderer.onResize(true);
}
//END - VirtualRenderer
