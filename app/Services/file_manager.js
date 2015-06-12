
(function(){

    angular.module('app').factory('FileManager', ['ServiceProvider', function(service){

   
    var projectFactory = service.getService('ProjectFactory', undefined);

    if(typeof(projectFactory) !== 'object')
        throw "ProjectFactory must be object";

    return{
        setAceManager: function(aceManager){
	    if(typeof(aceManager) !== 'object')
		throw "AceManager must be object";

	    this.ace_manager = aceManager;
        },
        getAceManager: function(){
    	if(typeof(this.ace_manager) !== 'object')
    		throw "AceManager isn't set";

    	return this.ace_manager;
        },
        setProjectFactory: function(factory){
        if(typeof(factory) !== 'object')
            throw "ProjectFactory must be object";

        projectFactory = factory;
        },
        getProjectFactory: function(){
        if(typeof(projectFactory) !== 'object')
            throw "ProjectFactory isn't set";

        return projectFactory;
        },
        openInEditor: function(file)
        {
            //file.type = "javascript";
            var id = this.getAceManager.getTabManager().addTab(file);
            this.getAceManager.getTabManager().showTab(id);
        },
        setVirtualRenderer: function(DOMElement){
        //DOMElement can be DOMElement but it can be it's html id
        if(typeof(DOMElement) != 'object' && typeof(DOMElement) != 'string')
            throw "DOMElement must be object or string.";

        if(typeof(DOMElement) == 'string')
            DOMElement = document.getElementById(DOMElement);

        this.virtualRenderer = new FMVirtualRenderer(this, DOMElement);
     
        },
        getVirtualRenderer: function(){
        if(typeof(this.virtualRenderer) !== 'object')
            throw "VirtualRenderer isn't set";

        return this.virtualRenderer;
        }
    };

}]);
})();


//FMVirtualRenderer - START
function FMVirtualRenderer(FileManager, DOMElement){
    this.file_manager = FileManager;
    this.dom_element = DOMElement;
}

FMVirtualRenderer.prototype.renderFolder = function(refElement, refFolder){
    if(refElement.className.match(/(?:^|\s)unexpanded(?!\S)/) )
    {
        var className = refElement.className.replace( /(?:^|\s)unexpanded(?!\S)/ , ' expanded' ); //zelimo da zamijenimo unexpanded sa expanded, jer smo kliknuli, ali ne zelimo izbrisati ostale klase
        refElement.setAttribute("class", className);  

        if(!refFolder.getContent())
        {
            //HTTP GET folderov content(samo imena fileova) na osnovu path-a + appear(refElement, refFolder)
        }
        else
        {

            if( refElement.querySelectorAll("ul").length === 0) //ako djeca nisu napravljena nikako prije, odnosno ul html element je prazan - stoji samo IME za folder, a ne njegov sadrzaj, a js objekti JESU dobavljeni
            {

                //napravi djecu na osnovu dobavljenih foldera i fajlova - dodaj clanove u html element ul
                appear(refElement, refFolder);
            }
            else
            { // postoje djeca - postoje i js objekti i html objekti - samo ih treba prikazati
                refElement.querySelector("ul").style.display = "block";
            }
        }
    }
    else
    {

        dissappear(refElement);
    }
    return false;
}