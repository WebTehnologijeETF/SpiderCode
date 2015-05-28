(function(){
    
 
    var HomeCtrl = function($scope, service) {
    //services - begin
        var ProjectFactory = service.getService('ProjectFactory', undefined);
//        var Folder = service.getService('Folder', undefined);
    //services - end
 
    //menu on the right - begin
 
        //editor
        var eDom = document.getElementById("editor");
 
        if(!eDom)
            throw "DOM with id=editor is missing.";
 
        $scope.manager = new AceManager(eDom);
 
        // dummy DATA - BEGIN

        var code111 = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML>
<HEAD>
<TITLE>Dokument s zaglavljima</TITLE>
</HEAD>
<BODY> Svi elementi dokumenta
<H1> Glavno poglavlje </H1>
<H6> Sporedno poglavlje </H6>
<P> Izmedu ovih tagova ide pasus teksta </P>
</BODY>
</HTML>`;
        var code112 = "function foo(items) {\n var x = 5; \n return x; \n}";
        var code121 = '@import url(http://fonts.googleapis.com/css?family=Gabriela); \n' +
 
                'h1{\ncolor:red;\nfont-style:italic;\nfont-weight:bold;\nfont-family:sans-serif;\nfont-size:250%;\n}\n\n'+ 
 
                'h2{\ntext-align:right;\ncolor:white;\nbackground-color:blue;\n}\n\n' +
 
                'p{\ncolor:green;\ntext-align: center;\nfont-family:sans-serif;\n}\n\n' +
 
                'p i {\ncolor:blue;\n}'+
 
                'p a {\ncolor:red;\nbackground-color:silver;\ntext-decoration:none;\n}\n\n' +
 
                'p a:hover{\ntext-decoration:underline;\n}';
 
        var file111 = new File('Zadatak 1.html', '/Web tehnologije/Tutorijal 1/Zadatak 1.html', code111, '/Web tehnologije/Tutorijal 1/Zadatak 1.html');
        var file112 = new File('Zadatak 2.js', '/Web tehnologije/Tutorijal 1/Zadatak 1.js', code112, '/Web tehnologije/Tutorijal 1/Zadatak 2.js');
 
        var file121 = new File('Zadatak 1.css',"/Web tehnologije/Tutorijal 2/Zadatak 1.css",code121, '/Web tehnologije/Tutorijal 2/Zadatak 1.css');
 
        var f11 = new Folder('Tutorijal 1','/Web tehnologije/Tutorijal 1', [file111, file112], '/Web tehnologije/Tutorijal 1');
 
        var f12 = new Folder('Tutorijal 2', '/Web tehnologije/Tutorijal 2', [file121], '/Web tehnologije/Tutorijal 2');
 
        var f1 = new Folder('Web tehnologije', '/Web tehnologije', [f11, f12], '/Web tehnologije');
 
        var code211 = '//THIS is ineditor example\nfunction Tab(file, id, session_id){\n    this.file = file;\n    this.id = id;\n    this.session_id;\n}\n\n' +
             
                'Tab.prototype.getName = function getName(){\n    return this.file.Name;\n}\n';
         
        var file211 = new File('index.html','/Moji projekti/Spidercode/index.html', code211, '/Moji projekti/Spidercode/index.html');
 
        var f21 = new Folder('Spidercode', '/Moji projekti/Spidercode', [file211], '/Moji projekti/Spidercode');
 
        var f2 = new Folder('Moji projekti', '/Moji projekti', [f21], '/Moji projekti');
 
        var Projects = [f1, f2];
  
 
 // DUMMY DATA END 
        $scope.openInEditor = function(file)
        {
            //file.type = "javascript";
            var id = $scope.manager.getTabManager().addTab(file);
            $scope.manager.getTabManager().showTab(id);
 
            $scope.openedFile = file; //ovo openedFile ce poslije  biti atribut od span-a od taba 
        }

         var getTree = function(){
            return ProjectFactory.getTree(); //ovo treba bit u mngr
        }

        var getFolderContents = function(path){
            return ProjectFactory.getFolderContents({path: path}); //ovo treba bit u mngr
        }

        var getFile = function(path){
            return ProjectFactory.getFile({path: path}); //ovo treba bit u mngr
        }

         var updateFile = function(path, content){
            return ProjectFactory.File({path: path, content: content}); //ovo treba bit u mngr
        }
        
 
        // ovo je onclick funkcija za sve elemente klase folder, liste koja se moze prosiriti
        //refElement nam je HTML objekat koji predstavlja prosirivu listu koja moze biti prosirena ili ne 
        //refFolder je javascript objekat koji ima u sebi nove foldere i fileove i cije ime i sadrzaj (ako je prosiren) prikazuje refElement
        //refElement je element klase folder koji moze biti klase unexpanded ili expanded - ako je unexpanded on ce se prosiriti, ako je expanded skupit ce se
 
        $scope.list = function(refElement, refFolder){
            if(refElement.className.match(/(?:^|\s)unexpanded(?!\S)/) )
            {
                var className = refElement.className.replace( /(?:^|\s)unexpanded(?!\S)/ , ' expanded' ); //zelimo da zamijenimo unexpanded sa expanded, jer smo kliknuli, ali ne zelimo izbrisati ostale klase
                refElement.setAttribute("class", className);  
 
                if(!refFolder.getIsLoad())
                {
                    //HTTP GET folderov content(samo imena fileova) na osnovu path-a + appear(refElement, refFolder)
                    refFolder.SetContent = getFolderContents(refFolder.getPath());

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
        };
 
        //napravi clanove liste u refElementu - prikazi sadrzaj refFolder-a, na osnovu dobavljenih podataka
        var appear = function(refElement, refFolder)
        {
            var lista = document.createElement("ul"); //lista koju ce u sebi sadrzavati refElement - to je njegov content
            var folders = refFolder.getFolders();
            for(var i = 0; i < folders.length; i++) //za svaki folder koji sadrzi u sebi pravimo li element koji je tipa prosirive liste
                                                              //ovi folderi ce biti lazy-loadani - odnosno dobavit ce se samo njihova imena i po potrebi pathovi
            {
                var node = document.createElement("LI");
                node.setAttribute("class", "folder unexpanded");  
 
                var c = document.createElement("span");
                c.setAttribute("class", "icon");
                c.folder = folders[i];
                c.addEventListener( "click", function() {
                return $scope.list(this.parentNode, this.folder);
                }, false);
                node.appendChild(c);
 
                var s = document.createElement("span");
                s.setAttribute("class", "link");
                s.innerHTML = folders[i].getName();
 
                // dodajemo js objekat na html objekat, kako bi znali na koji folder se referencira
                s.folder = folders[i];
 
                //dodajemo eventListener za dblclick funkciju za unutarnje foldere - jer su i oni tipa prosirive liste
                s.addEventListener( "dblclick", function() {
                    //u list funkciju saljemo element <li> kojeg smo tek napravili za ovaj folder i na kojeg ce se u buducnosti kaciti sadrzaj foldera unutar b
                    return $scope.list(this.parentNode, this.folder);
                }, false);
 
                node.appendChild(s);
                lista.appendChild(node);//na novonapravljenu listu kacimo njenu "djecu"
            }

            var files = refFolder.getFiles();
            for(var i = 0; i < files.length; i++) //radimo isto za unutarnje fileove, kao za foldere, samo sto oni nisu tipa prosirive liste
            {
                var node = document.createElement("LI");
                var s = document.createElement("span");
                s.setAttribute("class", "link");
                s.innerHTML = files[i].getName();
                s.file = files[i];
                 
                s.addEventListener( "dblclick", function() { //ovdje ce biti neka funkcija koja editoru daje file za ocitavanje
                    return $scope.openInEditor(this.file);
                }, false);
 
                node.appendChild(s);
                lista.appendChild(node);
            }
            refElement.appendChild(lista); //na nas folder u html-u -> refElement kacimo ul -> njegov sadrzaj
        }
 
 
        var  dissappear = function(refElement) //funkcija za sakrivanje sadrzaja foldera - u html documentu je to refElement 
        {         
            var className = refElement.className.replace( /(?:^|\s)expanded(?!\S)/g , ' unexpanded' ); //mijenjamo mu klasu sa expanded u unexpanded
            refElement.setAttribute("class", className);
            var elements = refElement.querySelectorAll(".expanded"); //dobavljamo svu njegovu djecu i unucad itd koja su tipa(klase) PROSIRENE liste 
            for(var i = 0; i < elements.length; i++)
                {
                    elements[i].querySelector("ul").style.display = "none"; //sakrivamo sadrzaj svake prosirene liste
                    className = elements[i].className.replace( /(?:^|\s)expanded(?!\S)/g , ' unexpanded' );
                    elements[i].setAttribute("class", className);   //mijenjamo tip prosiren u sakriven : expanded -> unexpanded
                }
            refElement.querySelector("ul").style.display = "none";
        }

       
        $scope.onloadfunc = function()
        {
         
            var elements = document.querySelectorAll("#projectTree"); //dobavi osnovni project tree - listu za prikaz projekata
 
            if(elements.length != 0)
            {
                var list = elements[0];
                if(Projects.length === 0)
                    Projects = getTree();
                for(var i = 0; i < Projects.length; i++) // prikazi dobavljene projekte za user-a kao prosirive liste
                {
                        var node = document.createElement("LI");
                        node.setAttribute("class", "folder unexpanded");
 
                        var c = document.createElement("span");
                        c.setAttribute("class", "icon");
                        c.folder = Projects[i];
                        c.addEventListener( "click", function() {
                        return $scope.list(this.parentNode, this.folder);
                        }, false);
                        node.appendChild(c);
 
                        var s = document.createElement("span");
                        s.setAttribute("class", "link");
                        s.innerHTML = Projects[i].getName();
                        s.folder = Projects[i];
                        s.addEventListener( "dblclick", function() {
                        return $scope.list(this.parentNode, this.folder);
                        }, false);
                        node.appendChild(s);
 
                        list.appendChild(node);
                         
                }
            }
        }
         
        //this is temporary solution
        var file_manager_resizer = {
            resize : function(width, height, left, top){
                this.dom_element = document.getElementById("menu-left");
                this.dom_element.style.width = width + "px";
                this.dom_element.style.height = height + "px";
                this.dom_element.style.left = left + "px";
                this.dom_element.style.top = top + "px";
            }
        }
 
        this.main_resizer = new ResizerHorizontal(file_manager_resizer, $scope.manager, 0.30);
         
        var res = this.main_resizer;
        var f = function(){
            //think about using for cross-browser solution: https://github.com/ryanve/verge
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth,
                y = w.innerHeight|| e.clientHeight|| g.clientHeight;
            //var viewport_width = Math.max(document.documentElement.clientWidth;
            //var viewport_height = document.documentElement.clientHeight;
             
            var a = document.getElementById("header");
            var b = a.clientHeight;
             
            res.resize(x, y-b, 0, 60);
        };
 
        window.onresize = f;
        f();
 
    //menu on the left - end
    }
 
    HomeCtrl.$inject = ['$scope', 'ServiceProvider'];
    angular.module('app').controller('HomeCtrl', HomeCtrl);
 
})();