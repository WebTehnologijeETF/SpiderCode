(function(){
    
 
   var HomeCtrl = function($scope, fileManager, $http) {
    //services - begin
        $scope.ProjectFactory = fileManager.getProjectFactory();

       // alert(typeof(JSZip)); 
        //alert(JSZip);
        var eDom = document.getElementById("editor");
 
        if(!eDom)
            throw "DOM with id=editor is missing.";

        fileManager.setVirtualRenderer(eDom);

        $scope.fileVirtualRenderer = fileManager.getVirtualRenderer();
 
 
        $scope.manager = new AceManager(eDom);
//Povezivanje jednog s drugim, jer ako bi ubacivali u kontroler od jednog onda bi se postavljalo pitanje koka ili jaje
        $scope.manager.setFileManager(fileManager);
        fileManager.setAceManager($scope.manager);

         //services - end

        var testBtn = document.createElement("li");
        testBtn.classList.add("acem-tab");
        testBtn.classList.add("not-selectable");
        
        var title = document.createElement("div");
        title.classList.add("acem-tab-title");
        //title.classList.add("not-selectable");
        var t_text = document.createTextNode("Build & Test");
        title.appendChild(t_text);

        testBtn.appendChild(title);

        testBtn.style.backgroundColor = "rgb(136, 21, 136)";
        testBtn.style.color = "white";
        testBtn.style.float = "right"; 

        testBtn.addEventListener('click', function(e){
            var panel = document.getElementById("test-panel");
            panel.style.left = "30%";

        }, false);
        $scope.manager.getVirtualRenderer().addTab(testBtn);
        document.getElementById("test-x-btn").addEventListener('click', function(e){
            var panel = document.getElementById("test-panel");
            panel.style.left = "100%";

        }, false);
        $scope.task = new Task();
        $scope.task.addTest(new Test());
        $scope.task.addTest(new Test());
        $scope.taskTab = 1;
        var codeEditor = ace.edit("codeEditor");
        codeEditor.setTheme("ace/theme/tomorrow_night");
        codeEditor.getSession().setMode("ace/mode/c_cpp");
        codeEditor.resize(true);

        var gamEditor = ace.edit("gamEditor");
        gamEditor.setTheme("ace/theme/tomorrow_night");
        gamEditor.getSession().setMode("ace/mode/c_cpp");
        gamEditor.resize(true);

        var gtEditor = ace.edit("gtEditor");
        gtEditor.setTheme("ace/theme/tomorrow_night");
        gtEditor.getSession().setMode("ace/mode/c_cpp");
        gtEditor.resize(true)

        var curTest = null;
        var refreshTestList = function(){
            var list = document.getElementById("tests-list-list");
            list.innerHTML ="";
            var tests = $scope.task.getTests();
            for(var i = 0; i < tests.length; i++){
                if(tests[i]){
                    var el =document.createElement("li");
                    el.id = tests[i].id;
                    el.innerHTML = "Test " + el.id;
                    list.appendChild(el);

                    el.addEventListener('click', function(e){
                        $scope.task.showTest(e.target.id, "test-id", "req-sim", "exp-sim", "codeEditor", "gamEditor", "gtEditor", 
                            "excCB", "iwsCB", "regCB", "subCB");
                        curTest = e.target.id;
                    }, false);
                }       
            }
        } 

        refreshTestList();

        var startTestBtn = document.getElementById("tests-start");
        startTestBtn.addEventListener('click', function(){
            $scope.instance = null;
                
            var json = JSON.stringify($scope.task);
            //alert(json);

            var zip = new JSZip();
            var task = new JSZip();
            //alert($scope.manager.getEditor().getSession().getValue());

            zip.file("zad.cpp",$scope.manager.getEditor().getSession().getValue());
            var a = zip.generate({type:"blob"}); 
            task.file("task.json", json);

            var fd = new FormData();
            fd.append('program_data', a);
            var taskData = task.file("task.json").asUint8Array();

            var f = new Blob([json], {type: "text/json"});
            fd.append('task_data', f);
            $http({
                url: "http://php-vljubovic.rhcloud.com/bs/submit.php",
                method: "POST",
                data: fd, 
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                withCredentials : false
            }).
            success(function(data, status, headers, config) {
                $scope.instance = data.instance;
                alert("Uspjelo!!!: "+ data);

                alert(data);
            }).
            error(function(data, status, headers, config) {
                alert("Error se desio: " +  status);
                alert(status);
            });
        },false);
        document.getElementById('tests-rm').addEventListener('click', function(){
            if(!curTest){
                alert("Please select test first");
            } else {
                $scope.task.removeTest(curTest);
                refreshTestList();
                $scope.task.resetFields("test-id", "req-sim", "exp-sim", "codeEditor", "gamEditor", "gtEditor", 
                            "excCB", "iwsCB", "regCB", "subCB");
                curTest=null;
            }
        },false);

        document.getElementById('tests-save').addEventListener('click', function(){
            if(!curTest){
                alert("Please select test first");
            } else {
                $scope.task.saveTest(curTest, "test-id", "req-sim", "exp-sim", "codeEditor", "gamEditor", "gtEditor", 
                            "excCB", "iwsCB", "regCB", "subCB");
            }
        },false);

        document.getElementById('tests-add').addEventListener('click',function(){
            var id = $scope.task.addTest(new Test());
            $scope.task.showTest(id,"test-id", "req-sim", "exp-sim", "codeEditor", "gamEditor", "gtEditor", 
                            "excCB", "iwsCB", "regCB", "subCB");
            curTest = id;
            refreshTestList();
        }, false)

        document.getElementById('tests-check').addEventListener('click', function(){
            if(!$scope.instance){
                alert("Please first run build & test");
                return;
            }
            
            $http({
                url:"http://php-vljubovic.rhcloud.com/bs/check_status.php?instance="+$scope.instance,
                method: "GET", 
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                withCredentials : false

            }).success(function(data, status, headers, config) {
                alert("Uspio check status!!!");

                var area = document.getElementById("tests-results");
                area.value = data;

            }).
            error(function(data, status, headers, config) {
                alert("Error se desio: " +  status);
               
            });

            
        }, false);
        // dummy DATA - BEGIN

       
 
 // DUMMY DATA END 
        $scope.openInEditor = function(file)
        {
            //file.type = "javascript";
            var id = $scope.manager.getTabManager().addTab(file);
            $scope.manager.getTabManager().showTab(id);
 
            $scope.openedFile = file; //ovo openedFile ce poslije  biti atribut od span-a od taba 
        }

       
        var updateFile = function(path, content){
            return $scope.ProjectFactory.updateFile({path: path, content: content}); //ovo treba bit u mngr
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
                    $scope.ProjectFactory.registerGetFolderContentsObserverCallback(appear);
                    //HTTP GET folderov content(samo imena fileova) na osnovu path-a + appear(refElement, refFolder)
                    $scope.ProjectFactory.getFolderContents({refFolder: refFolder, refElement: refElement});
                    refFolder.setIsLoad(true);

                }
                else
                {
 
                    if( refElement.querySelectorAll("ul").length === 0) //ako djeca nisu napravljena nikako prije, odnosno ul html element je prazan - stoji samo IME za folder, a ne njegov sadrzaj, a js objekti JESU dobavljeni
                    {
 
                        //napravi djecu na osnovu dobavljenih foldera i fajlova - dodaj clanove u html element ul
                        appear({refElement: refElement, refFolder: refFolder});
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
        var appear = function($params)
        {
            var refElement = $params.refElement;
            var refFolder = $params.refFolder;

            var lista = document.createElement("ul"); //lista koju ce u sebi sadrzavati refElement - to je njegov content
            var folders = refFolder.getFolders();
            for(var i = 0; i < folders.length; i++) //za svaki folder koji sadrzi u sebi pravimo li element koji je tipa prosirive liste
                                                              //ovi folderi ce biti lazy-loadani - odnosno dobavit ce se samo njihova imena i po potrebi pathovi
            {
                var node = document.createElement("LI");
                node.setAttribute("class", "folder not-selectable unexpanded");  
 
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

     $scope.Projects = [];
      
       
        $scope.onloadfunc = function()
        {
             $scope.Projects = $scope.ProjectFactory.getProjects();
         
                if($scope.Projects.length === 0)
                {

                    $scope.ProjectFactory.registerGetTreeObserverCallback(showProjects); 
                    $scope.ProjectFactory.getTree($scope.Projects);
                }
                else
                    showProjects();
        };

        var showProjects = function(){

            //alert('I am at showProjects!');

            $scope.Projects = $scope.ProjectFactory.getProjects();


            var elements = document.querySelectorAll("#projectTree"); //dobavi osnovni project tree - listu za prikaz projekata
 
            if(elements.length != 0)
            {
                   var list = elements[0];

                   for(var i = 0; i < $scope.Projects.length; i++) // prikazi dobavljene projekte za user-a kao prosirive liste

                    {
                        var node = document.createElement("LI");
                        node.setAttribute("class", "folder not-selectable unexpanded");
 
                        var c = document.createElement("span");
                        c.setAttribute("class", "icon");
                        c.folder = $scope.Projects[i];
                        c.addEventListener( "click", function() {
                        return $scope.list(this.parentNode, this.folder);
                        }, false);
                        node.appendChild(c);
 
                        var s = document.createElement("span");
                        s.setAttribute("class", "link");
                        s.innerHTML = $scope.Projects[i].getName();
                        s.folder = $scope.Projects[i];
                        s.addEventListener( "dblclick", function() {
                        return $scope.list(this.parentNode, this.folder);
                        }, false);
                        node.appendChild(s);
 
                        list.appendChild(node);
                         
                    }
            }
            };
        
         
        //this is temporary solution
        var file_manager_resizer = {
            resize : function(width, height, left, top){
                this.dom_element = document.getElementById("menu-left");
                if(!this.dom_element)
                    return;
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
 
    }
 
    HomeCtrl.$inject = ['$scope', 'FileManager', '$http'];
    angular.module('app').controller('HomeCtrl', HomeCtrl);
 
})();