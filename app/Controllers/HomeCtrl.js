(function(){
   

	var HomeCtrl = function($scope, service) {

    //services - begin
        var ProjectFactory = service.getService('ProjectFactory', undefined);
        var Folder = service.getService('Folder', undefined);
    //services - end

    //menu on the right - begin

        //editor
        var eDom = document.getElementById("editor");

        if(!eDom)
            throw "DOM with id=editor is missing.";

        $scope.manager = new AceManager(eDom);

        (function(){
            var code1 = `#include <iostream>
#include <cmath>

using std::cout;


class Ugao {

    double _rad;
    static const double PI;


    void Reduciraj(){ _rad = _rad - int(_rad/(2*PI))*2*PI;}
public:
    Ugao(double radijani = 0){ Postavi(radijani); }

    Ugao(int stepeni, int minute, int sekunde){ Postavi(stepeni, minute, sekunde); }

    void Postavi(double radijani){ _rad = radijani; Reduciraj(); }

    void Postavi(int stepeni, int minute, int sekunde){
        double u_stepeni = stepeni + minute/60.0 + sekunde/3600.0;
        _rad = u_stepeni / 180 * PI;

        Reduciraj();
    }

    double DajRadijane() const { return _rad; }
    void OcitajKlasicneJedinice(int &stepeni, int &minute, int &sekunde) const;

    int DajStepene() const;
    int DajMinute() const;
    int DajSekunde() const;

    void Ispisi() const;
    void IspisiKlasicno() const;

    Ugao &SaberiSa(const Ugao &u){

        _rad += u._rad;
        Reduciraj();

        return *this;
    }
    Ugao &PomnoziSa(double x){

        _rad *= x;
        Reduciraj();

        return *this;
    }

    friend Ugao ZbirUglova(const Ugao &u1, const Ugao &u2);
    friend Ugao ProduktUglaSaBrojem(const Ugao &u, double x);


};

const double Ugao::PI(3.1415926535);`;
    var code2 = `void Ugao::OcitajKlasicneJedinice(int &stepeni, int &minute, int &sekunde) const{
    double u_step = _rad / PI * 180;

    stepeni = u_step;
    minute = (u_step - stepeni) * 60;
    sekunde = (u_step -  stepeni - minute/60.) * 3600.;
}

inline int Ugao::DajStepene() const{
    return _rad / PI * 180;
}

int Ugao::DajMinute() const{
    double u_step = _rad / PI * 180;
    return (u_step - int(u_step)) * 60;
}

int Ugao::DajSekunde() const{
    int deg, min, sec;
    OcitajKlasicneJedinice(deg, min, sec);
    return sec;
}


void Ugao::Ispisi() const{
    cout << _rad;
}
void Ugao::IspisiKlasicno() const{

    int deg, min, sec;
    OcitajKlasicneJedinice(deg, min, sec);
    cout << deg << "deg " << min << "min " << sec << "sec";
    //cout << DajStepene() << "deg " << DajMinute() << "min " << DajSekunde() << " sec";
}


Ugao ZbirUglova(const Ugao &u1, const Ugao &u2){
    return {u1._rad + u2._rad};
}

Ugao ProduktUglaSaBrojem(const Ugao &u, double x){
    Ugao rez(u._rad * x);
    return rez;
}

void nl(){
    cout << std::endl;
}
int main(){

    Ugao u1(3*3.1415926), u2(1,1,1);
    u1.IspisiKlasicno(); nl();

    u1.SaberiSa(u2).PomnoziSa(2).Ispisi(); nl();
    u1.Ispisi();

    ZbirUglova(u1, u2).Ispisi();
    ProduktUglaSaBrojem(u1, 2).Ispisi();
}`;

var codejs3 = `//THIS is ineditor example
function Tab(file, id, session_id){
    this.file = file;
    this.id = id;
    this.session_id;
}

Tab.prototype.getName = function getName(){
    return this.file.name;
}`;
            var file = new File("t10 Z1-a.cpp", "/var/tp/t10 z1-a.cpp", code1, "ad212edasddd23d3")

            var file2 = new File("t10 Z1-b.cpp", "/var/tp/t10 z1-b.cpp", code2, "ad2sasa12edasddd23d3")

            var file3 = new File("t10 Z1-b.js", "/var/tp/t10 z1-b.js", codejs3, "ad2sasa12edasddd23d3")
            var tm = $scope.manager.getTabManager();     

            tm.openTab(file);     
            tm.openTab(file2);
            tm.openTab(file3);     
        }()) 
        
    //$scope.editor = ace.edit("editor");
    //$scope.editor.setTheme("ace/theme/tomorrow_night");
    //$scope.editor.getSession().setMode("ace/mode/javascript");
    
    //menu on the right - end

    //menu on the left - begin

        //dummmy dataa - ovo je glupo uradjeno, ali je samo privremeno, dok ne napravimo http gettere

        var code = "function foo(items) { var x = 5;  return x;  }";

        var Projects = [];

        for(var i = 0; i < 5; i++)
        {
            var f121 = {Name: 'Folder1.2.1', Files:[], Folders:[]};
            var f12 = {Name: 'Folder1.2', Files:[], Folders:[f121]};
            var f11 = {Name: 'Folder1.1', Files:[], Folders:[]};
            var f1 =  {Name: 'Folder1', Files: [{Name : 'file1', Value:code},{Name: 'file2', Value:code}], Folders: [f11,f12] };
            var f2 =  {Name: 'Folder2', Files: [{Name:'file1', Value:code},{Name:'file2', Value:code}],Folders:[]};
            var f3 = {Name: 'Folder3', Files: [{Name:'file1', Value:code},{Name:'file2', Value:code}],Folders:[]};

            Projects[i] = { Folders: [f1, f2, f3], 
            Files: [{Name:'file1', Value:code},{Name:'file2', Value:code}, {Name:'file3', Value:code},{Name:'file4', Value:code}], Name: 'Project'+i, Path: 'Project'+i};
        }

        $scope.openInEditor = function(file)
        {
            file.type = "javascript";
            $scope.manager.getSessionManager().addAndShowSession(file.Value, file.type);
            $scope.openedFile = file; //ovo openedFile ce poslije  biti atribut od span-a od taba 
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
                node.setAttribute("class", "folder unexpanded");  

                var c = document.createElement("span");
                c.setAttribute("class", "icon");
                c.folder = refFolder.Folders[i];
                c.addEventListener( "click", function() {
                return $scope.list(this.parentNode, this.folder);
                }, false);
                node.appendChild(c);

                var s = document.createElement("span");
                s.setAttribute("class", "link");
                s.innerHTML = refFolder.Folders[i].Name;

                // dodajemo js objekat na html objekat, kako bi znali na koji folder se referencira
                s.folder = refFolder.Folders[i];

                //dodajemo eventListener za dblclick funkciju za unutarnje foldere - jer su i oni tipa prosirive liste
                s.addEventListener( "dblclick", function() {
                //u list funkciju saljemo element <li> kojeg smo tek napravili za ovaj folder i na kojeg ce se u buducnosti kaciti sadrzaj foldera unutar b
                return $scope.list(this.parentNode, this.folder);
                }, false);
                node.appendChild(s);
                lista.appendChild(node);//na novonapravljenu listu kacimo njenu "djecu"
            }
            for(var j = 0; j < refFolder.Files.length; j++) //radimo isto za unutarnje fileove, kao za foldere, samo sto oni nisu tipa prosirive liste
            {
                var node = document.createElement("LI");
                var s = document.createElement("span");
                s.setAttribute("class", "link");
                s.innerHTML = refFolder.Files[j].Name;
                s.file = refFolder.Files[j];
                s.addEventListener( "dblclick", function() { //ovdje ce biti neka funkcija koja editoru daje file za ocitavanje
                return $scope.openInEditor(this.file);}, false);
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
                if(Projects.length != 0)
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
                        s.innerHTML = Projects[i].Name;
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