(function(){
   
	angular.module('app').controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($scope, $rootScope) {
               //dummmy dataa - ovo je glupo uradjeno, ali je samo privremeno, dok ne napravimo http gettere

        $scope.Projects = [];

        for(var i = 0; i < 5; i++)
        {
            var f121 = {Name: 'Folder1.2.1', Files:[], Folders:[]};
            var f12 = {Name: 'Folder1.2', Files:[], Folders:[f121]};
            var f11 = {Name: 'Folder1.1', Files:[], Folders:[]};
            var f1 =  {Name: 'Folder1', Files: [{Name : 'file1'},{Name: 'file2'}], Folders: [f11,f12] };
            var f2 =  {Name: 'Folder2', Files: [{Name:'file1'},{Name:'file2'}],Folders:[]};
            var f3 = {Name: 'Folder3', Files: [{Name:'file1'},{Name:'file2'}],Folders:[]};

            $scope.Projects[i] = { Folders: [f1, f2, f3], 
            Files: [{Name:'file1'},{Name:'file2'}, {Name:'file3'},{Name:'file4'}], Name: 'Project'+i, Path: 'Project'+i};
        }

     

        // ovo je onclick funkcija za sve elemente klase explist, liste koja se moze prosiriti
        //refElement nam je HTML objekat koji predstavlja prosirivu listu koja moze biti prosirena ili ne 
        //refFolder je javascript objekat koji ima u sebi nove foldere i fileove i cije ime i sadrzaj (ako je prosiren) prikazuje refElement
        //refElement je element klase explist koji moze biti klase unexpanded ili expanded - ako je unexpanded on ce se prosiriti, ako je expanded skupit ce se

        $scope.list = function(refElement, refFolder){
            if(refElement.className.match(/(?:^|\s)unexpanded(?!\S)/) )
            {
                var className = refElement.className.replace( /(?:^|\s)unexpanded(?!\S)/ , ' expanded' ); //zelimo da zamijenimo unexpanded sa expanded, jer smo kliknuli, ali ne zelimo izbrisati ostale klase
                refElement.setAttribute("class", className);  

                if(refFolder.Folders === [] && refFolder.Files === [])
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
        };

        //napravi clanove liste u refElementu - prikazi sadrzaj refFolder-a, na osnovu dobavljenih podataka
        var  appear = function(refElement, refFolder)
        {
            var lista = document.createElement("ul"); //lista koju ce u sebi sadrzavati refElement - to je njegov content
            for(var i = 0; i < refFolder.Folders.length; i++) //za svaki folder koji sadrzi u sebi pravimo li element koji je tipa prosirive liste
                                                              //ovi folderi ce biti lazy-loadani - odnosno dobavit ce se samo njihova imena i po potrebi pathovi
            {
                var node = document.createElement("LI");
                node.setAttribute("class", "explist unexpanded");               
                var b = document.createElement("button");
                b.setAttribute("class", "link");
                b.innerHTML = refFolder.Folders[i].Name;

                // dodajemo js objekat na html objekat, kako bi znali na koji folder se referencira
                b.folder = refFolder.Folders[i];

                //dodajemo eventListener za onclick funkciju za unutarnje foldere - jer su i oni tipa prosirive liste
                b.addEventListener( "click", function() {
                //u list funkciju saljemo element <li> kojeg smo tek napravili za ovaj folder i na kojeg ce se u buducnosti kaciti sadrzaj foldera unutar b
                return $scope.list(this.parentNode, this.folder);
                }, false);
                node.appendChild(b);
                lista.appendChild(node);//na novonapravljenu listu kacimo njenu "djecu"
            }
            for(var j = 0; j < refFolder.Files.length; j++) //radimo isto za unutarnje fileove, kao za foldere, samo sto oni nisu tipa prosirive liste
            {
                var node = document.createElement("LI");
                var b = document.createElement("button");
                b.setAttribute("class", "link");
                b.innerHTML = refFolder.Files[j].Name;
                b.file = refFolder.Files[j];
                b.addEventListener( "click", function() { //ovdje ce biti neka funkcija koja editoru daje file za ocitavanje
                alert('Upaljeno!'); }, false);
                node.appendChild(b);
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
                if($scope.Projects.length != 0)
                for(var i = 0; i < $scope.Projects.length; i++) // prikazi dobavljene projekte za user-a kao prosirive liste
                {
                        var node = document.createElement("LI");
                        node.setAttribute("class", "explist unexpanded");               
                        var b = document.createElement("button");
                        b.setAttribute("class", "link");
                        b.innerHTML = $scope.Projects[i].Name;
                        b.folder = $scope.Projects[i];
                        b.addEventListener( "click", function() {
                        return $scope.list(this.parentNode, this.folder);
                        }, false);
                        node.appendChild(b);
                        list.appendChild(node);
                        
                }
            }
        }
    }

})();