CAIRS Framework
===============

==# Init Framework

        CAIRS.init();


==# Browser environment properties

        alert( CAIRS.Browser.name ); // Chrome
        alert( CAIRS.Browser.onLine ); // is the browser online?
        alert( CAIRS.Browser.cookieEnabled ); // is the browser able to generate cookies?
        alert( CAIRS.Browser.version ); // browser version
        alert( CAIRS.Browser.OS ); // Operational system
        alert( CAIRS.Browser.plugins ); // [], a list of available browser's plugins

==# Check if plugin is installed

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


==# Check if browser have the minimun requirement for running RIA apps

        CAIRS.checkBrowserStuff();
        
        //=== Note, this method is automatically called when you call CAIRS.init();

==# Code Injection

        // injects controller/FlexPaperComponent.js
        CAIRS.loadScript("controller/FlexPaperComponent", function()
        {
        	// after code injected, call the component FlexPaperComponent
        	FlexPaperComponent.callFlexPaper({ ... });
        });


==# Convert JSON to XML

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
        

==# XML Serialization

        CAIRS.xml.serialize( CAIRS.xml.fromJSON( json_menu ) );
        
        XXXXX====   RESULT -> XML STRING  ==== XXXXX
        
        '<menu><item id="recarregagrid" text="reload" img="atualizar.png" imgdis="atualizar.png">
        <item id="file_sep_0" text="select all" img="select_all.gif" imgdis="select_all.gif"/></item>
        <item id="file_sep_1" type="separator"/>
        <item id="selecionartodos" text="select all" img="select_all.gif" imgdis="select_all.gif"/>
        <item id="file_sep_2" type="separator"/>
        <item id="excluir" text="delete selected" img="excluir.png" imgdis="excluir.png"/></menu>'
        

==# Check if variable is an Array

        var test = [];
        CAIRS.isArray( test ); // true
        

==# Check if variable is an Object literal

        var test = {};
        CAIRS.isObject( test ); // true
        
        
==# Check if variable is a Number

        var test = 2;
        CAIRS.isNumber( test ); // true

==# Convert Javascript number to currency format

	console.log( CAIRS.toCurrency(10000000) ); // 10,000,000.00
        
==# Implemented forEach statement

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



==# Class creation
	
	
	/**
	
		@function ext -  check if the current browser is able to run AJAX applications
		
		@parameter parentClass - An Object Literal Class which will be the inherited class, OR, null
			if null, NO Parent Class will be inherited when creating your Class
			mandatory
		
		@parameter objClass - An Object Literal notation of your Class
			mandatory
		
		@parameter nameSpaceName - string value holding the namespace path where the created 
			Class will be appended as top level, OR false, OR undefined
			not mandory - default: The created object will be appended on the top level of window object
		
		@return object
	
	*/
	//  CAIRS.ext( parentClass, Class, nameSpace);
	//  CAIRS.ext( null, {} ) EQUAL  CAIRS.ext( null, {}, false) ;

	
	/* Class name */
	var myClassName = CAIRS.ext( null, {
		myClassName : {  /* Class name again */
		
			/* your methods and properties here */
			
			method : function(){
				console.log("method ok");
			}
			
			,property : "string property"
		}
	}  );
	
Testing
			
	console.log("-acessing class's method> ");
	myClassName.method();
	
Result

	-acessing class's method>
	method ok 



==# Implemented Object Inheritance

        //  CAIRS.ext( parentClass, Class, nameSpace);
        
        
        /** 
        	Create the class myClassName inheriting the CAIRS Framework's class  
        */
        var myClassName = CAIRS.ext( CAIRS, {
                myClassName : {
                        method : function(){
                                console.log("child ok");
                        }
                        ,property : "string property"
                }
        });
        

Testing

	console.log("-------------------- Inheriting Object's test -----------------");
	console.log("-parent class's method testing> ");
        myClassName.test();
        console.log("-child class's method testing> ");
        myClassName.method();
        console.log("-------------------------- end test ---------------------------");
        console.log("---------------------------------------------------------------");

Result

        -------------------- Inheriting Object's test -----------------
        -parent class's method testing>
        parent ok
        -child class's method testing>
        child ok
        -------------------------- end test ---------------------------
        

==# Inheriting Object and Appending to a pre created NameSpace
	
	/* 
		Create namespace person - it will be appended on the window object
	*/
	var person = person || {};
	
	
	/* 
		append a new level  characteristics to the 'person' top level namespace
	*/
	person.characteristics = person.characteristics || { 
		eyes_number : 2
		,nose_number : 1
		,arms_number : 2
	};
	
	
	/* 
		Create the class head inheriting the CAIRS Framework's class AND 
		append it to the top level given 'person.characteristics' namespace  
	*/
	var head = CAIRS.ext(CAIRS, {
		head : {
			speak : function(){
				console.log(">I'm speaking<");
			}
			,eyes_color : "blue"	
		}
	}, "person.characteristics");
	
Testing

	console.log("------ Inheriting Object and Appending to a NameSpace 1 -------");
	console.log("-given namespace>");
	console.log("person.characteristics");
	console.log("-Total namespace levels>");
	console.log("3");
	console.log("-testing property from second level's namespace> ");
	console.log( "My >"+ person.characteristics.eyes_number +"< eyes are closed");
	console.log("-testing property from top level's namespace(new object appended)> ");
	console.log( "my eye's color is: >" + person.characteristics.head.eyes_color + "<" );
	console.log("-testing method from top level's namespace(new object appended)> ");
		person.characteristics.head.speak();
	console.log("-testing inherited method from Parent Class> ");
		person.characteristics.head.test();

Result
		
	------ Inheriting Object and Appending to a NameSpace 1 -------
	-given namespace>
	person.characteristics
	-Total namespace levels>
	3
	-testing property from second level's namespace>
	My >2< eyes are closed
	-testing property from top level's namespace(new object appended)>
	my eye's color is: >blue<
	-testing method from top level's namespace(new object appended)>
	>I'm speaking<
	-testing inherited method from Parent Class>
	parent ok
