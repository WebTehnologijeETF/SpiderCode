(function (){
        
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
          

}())
        