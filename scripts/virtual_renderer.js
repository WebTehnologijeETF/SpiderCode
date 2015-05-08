
//START - VirtualRenderer
function VirtualRenderer(ace_manager, DOMElement, theme){
	this.ace_manager = ace_manager;
	this.dom_element = DOMElement;
	this.theme = theme;

	this.render();	
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

	tabs.appendChild(this.makeTab());
	tabs.appendChild(this.makeTab());
}


//make tab DOM element and return DOMElement, <li> element to be precise
VirtualRenderer.prototype.makeTab = function(tab){
	var el = document.createElement("li");
	el.classList.add("acem-tab");

	var title = document.createElement("div");
	title.classList.add("acem-tab-title");
	var t_text = document.createTextNode("Luka.txt");
	title.appendChild(t_text);

	el.appendChild(title);

	var x = document.createElement("div");
	x.innerHTML = "x";
	x.classList.add("acem-tab-x");

	el.appendChild(x);

	el.addEventListener('mouseover',function(){
		x.style.visibility = 'visible';
	}, false);


	el.addEventListener('mouseout',function(){
		x.style.visibility = 'hidden';
	}, false);

	return el;
}

VirtualRenderer.prototype.getEditorRenderer = function(){
	return this.editor_renderer;
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
}
//END - VirtualRenderer
