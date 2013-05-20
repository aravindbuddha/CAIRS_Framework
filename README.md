CAIRS Framework
===============

Init Framework

        CAIRS.init();


Browser environment properties

        alert( CAIRS.Browser.name ); // Chrome
        alert( CAIRS.Browser.onLine ); // is the browser online?
        alert( CAIRS.Browser.cookieEnabled ); // is the browser able to generate cookies?
        alert( CAIRS.Browser.version ); // browser version
        alert( CAIRS.Browser.OS ); // Operational system
        alert( CAIRS.Browser.plugins ); // [], a list of available browser's plugins

Check if plugin is installed

        CAIRS.Browser.isPlugin( "Chrome PDF Viewer" ); // true/false
        
Some plugin names

        Shockwave Flash
        Chrome Remote Desktop Viewer
        Native Client
        Chrome PDF Viewer
        Adobe Acrobat 
        Winamp Application Detector
        Google Earth Plugin
        Google Update
        Java(TM) Platform SE 6 U38
        Facebook Video Calling Plugin
        Shockwave Flash
        Java Deployment Toolkit 6.0.380.5
        Unknow plugin


Check if browser have the minimun requirement for running RIA apps

        CAIRS.checkBrowserStuff();
        
        //=== Note, this method is automatically called when you call CAIRS.init();

Code Injection

        // injects controller/FlexPaperComponent.js
        CAIRS.loadScript("controller/FlexPaperComponent", function()
        {
        	// after code injected, call the component FlexPaperComponent
        	FlexPaperComponent.callFlexPaper({ ... });
        });


Convert JSON to XML

        var json_menu = { menu: [
                { item : { id: "recarregagrid", text : "reload", img : "atualizar.png", imgdis : "atualizar.png"}, child : [
                        { item : { id: "select_all", text : "select all", img : "select_all.gif", imgdis : "select_all.gif"} }
                ] }
                ,{ item : { id: "file_sep_1", type : "separator"} }
                ,{ item : { id: "selecionartodos", text : "select all", img : "select_all.gif", imgdis : "select_all.gif"} }
                ,{ item : { id: "file_sep_2", type : "separator"} }
                ,{ item : { id: "excluir", text : "delete selected", img : "excluir.png", imgdis : "excluir.png"} }
         ] }
        
        CAIRS.xml.fromJSON( json_menu );
        
        XXXXX====   RESULT -> XML DOCUMENT  ==== XXXXX
        
        <menu>
                <item id="recarregagrid" text="reload" img="atualizar.png" imgdis="atualizar.png">
                        <item id="select_all" text="select all" img="select_all.gif" imgdis="select_all.gif"/>
                </item>
                <item id="file_sep_1" type="separator"/>
                <item id="selecionartodos" text="select all" img="select_all.gif" imgdis="select_all.gif"/>
                <item id="file_sep_2" type="separator"/>
                <item id="excluir" text="delete selected" img="excluir.png" imgdis="excluir.png"/>
        </menu>
        

XML Serialization

        CAIRS.xml.serialize( CAIRS.xml.fromJSON( json_menu ) );
        
        XXXXX====   RESULT -> XML STRING  ==== XXXXX
        
        '<menu><item id="recarregagrid" text="reload" img="atualizar.png" imgdis="atualizar.png">
        <item id="file_sep_0" text="select all" img="select_all.gif" imgdis="select_all.gif"/></item>
        <item id="file_sep_1" type="separator"/>
        <item id="selecionartodos" text="select all" img="select_all.gif" imgdis="select_all.gif"/>
        <item id="file_sep_2" type="separator"/>
        <item id="excluir" text="delete selected" img="excluir.png" imgdis="excluir.png"/></menu>'
        

Check if variable is an Array

        var test = [];
        CAIRS.isArray( test ); // true
        

Check if variable is an Object literal

        var test = {};
        CAIRS.isObject( test ); // true
        
        
Check if variable is a Number

        var test = 2;
        CAIRS.isNumber( test ); // true
        
        
Implemented forEach statement

        var myArray = [1, 2, 3, 4, "James"];
        myArray.forEach( function(element, array_index, array_object)
        {
                alert(element);
                // 1
                // 2
                // 3
                // 4
                // James
        });
        
        
Implemented Object Inheriterance

        //  CAIRS.ext( parentClass, Class, nameSpace);
        
        var myClassName = CAIRS.ext( CAIRS, {
                myClassName : {
                        method : function(){
                                console.log("child ok");
                        }
                        ,property : "string property"
                }
        });
				
        console.log("-------------------- Inheriting Object's test -----------------");
        console.log("-parent class's method testing> ");
        myClassName.test();
        console.log("-child class's method testing> ");
        myClassName.method();
        console.log("-------------------------- end test ---------------------------");
        console.log("---------------------------------------------------------------");
        
        /*
        -------------------- Inheriting Object's test -----------------
        -parent class's method testing>
        parent ok
        -child class's method testing>
        child ok
        -------------------------- end test ---------------------------
        */
