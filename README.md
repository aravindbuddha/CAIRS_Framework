# CAIRS Framework

* <a href="#init-framework">Init-Framework</a>
* <a href="#browser-environment-properties">Browser-environment-properties</a>
* <a href="#check-if-plugin-is-installed">Check-if-plugin-is-installed</a>
	* Some-plugin-names
* <a href="#check-if-browser-have-the-minimun-requirement-for-running-ria-apps">Check-if-browser-have-the-minimun-requirement-for-running-RIA-apps</a>
* <a href="#cookies-handling">Cookies-handling</a>
	* <a href="#create-cookie-with-a-given-value">Create cookie with a given value</a>
	* <a href="#create-cookie-with-a-given-key">Create cookie with a given key</a>
	* <a href="#get-cookie-value-with-a-given-name">Get cookie value with a given name</a>
	* <a href="#get-key-value-from-a-cookie">Get key value from a cookie</a>
* <a href="#code-injection">Code-Injection</a>
* <a href="#convert-json-to-xml">Convert-JSON-to-XML</a>
* <a href="#xml-serialization">XML-Serialization</a>
* <a href="#check-if-variable-is-an-array">Check-if-variable-is-an-Array</a>
* <a href="#check-if-variable-is-a-number">Check-if-variable-is-a-Number</a>
* <a href="#convert-javascript-number-to-currency-format">Convert-Javascript-number-to-currency-format</a>
* <a href="#convert-currency-string-to-a-javascript-float-number">Convert-currency-string-to-a-Javascript-Float-number</a>
* <a href="#implemented-foreach-statement">Implemented-forEach-statement-on-top-level-window-object</a>
* <a href="#class-creation">Class-creation</a>
	* testing
	* result
* <a href="#implemented-object-inheritance">Implemented-Object-Inheritance</a>
	* testing
	* result
* <a href="#inheriting-object-and-appending-to-a-pre-created-namespace">Inheriting-Object-and-Appending-to-a-pre-created-NameSpace</a>
	* testing
	* result
* <a href="#creating-keyboard-shortcuts">Creating-Keyboard-Shortcuts</a>
* <a href="#cairs-editor">CAIRS Editor</a>
 	* <a href="#render-editor">Render editor</a>
 	* <a href="#set-editor-content">Set editor content</a>
 	* <a href="#get-editor-content">Get editor content</a>
* <a href="#encoder">Encoder</a>
* <a href="#Dropdown">Dropdown</a>
* <a href="#utils">Utils</a>
	* <a href="#us-states">US States</a>

===============

## Init Framework
<a href="#cairs-framework">page top</a>

	window.onload = function (e)
	{
		CAIRS.init();
	}


## Browser environment properties
<a href="#cairs-framework">page top</a>

        alert( CAIRS.Browser.name ); // Chrome
        alert( CAIRS.Browser.onLine ); // is the browser online?
        alert( CAIRS.Browser.cookieEnabled ); // is the browser able to generate cookies?
        alert( CAIRS.Browser.version ); // browser version
        alert( CAIRS.Browser.OS ); // Operational system
        alert( CAIRS.Browser.plugins ); // [], a list of available browser's plugins

## Check if plugin is installed
<a href="#cairs-framework">page top</a>

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


## Check if browser have the minimun requirement for running RIA apps
<a href="#cairs-framework">page top</a>

        CAIRS.checkBrowserStuff();
        
        //=== Note, this method is automatically called when you call CAIRS.init();
		
		
## Cookies handling
<a href="#cairs-framework">page top</a>

The CAIRS framework provides one object named "cookie" on the top level namespace of the framework. With this object you can create and get cookies with/from a given value or a key.

Acessing the cookie object
	
	CAIRS.cookie

### Create cookie with a given value
<a href="#cairs-framework">page top</a>

	/**
		@parameters:
			1 - cookie name -> string
			2 - cookie value -> string
			3 - duration (in days) -> integer or decimal
		
		@return - boolean -> true / false
	*/
	var duration = 360; // in days
	CAIRS.cookie.set( "cookie name", "cookie value", duration );

### Create cookie with a given key
<a href="#cairs-framework">page top</a>


	/**
		@parameters:
			1 - cookie name -> string
			2 - key name -> string
			3 - key value -> string
			4 - duration (in days) -> integer or decimal
		
		@return - boolean -> true / false
	*/
	var duration = 360; // in days
	CAIRS.cookie.setByKey( "cookie name", "key name", "key value", duration )



### Get cookie value with a given name
<a href="#cairs-framework">page top</a>


	/**
		@parameters:
			1 - cookie name -> string
		
		@return - string value OR false if cookie does not exist
	*/
	
	CAIRS.cookie.get( "cookie name" );

### Get key value from a cookie
<a href="#cairs-framework">page top</a>
        
	/**
		@parameters:
			1 - cookie name -> string
			2 - key name -> string
		
		@return - string value OR false if cookie or key does not exist
	*/
	
	CAIRS.cookie.getByKey( "cookie name", "key_name" );

## Code Injection
<a href="#cairs-framework">page top</a>

        // injects controller/FlexPaperComponent.js
        CAIRS.loadScript("controller/FlexPaperComponent", function()
        {
        	// after code injected, call the component FlexPaperComponent
        	FlexPaperComponent.callFlexPaper({ ... });
        });


## Convert JSON to XML
<a href="#cairs-framework">page top</a>

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
        

## XML Serialization
<a href="#cairs-framework">page top</a>

        CAIRS.xml.serialize( CAIRS.xml.fromJSON( json_menu ) );
        
        XXXXX====   RESULT -> XML STRING  ==== XXXXX
        
        '<menu><item id="recarregagrid" text="reload" img="atualizar.png" imgdis="atualizar.png">
        <item id="file_sep_0" text="select all" img="select_all.gif" imgdis="select_all.gif"/></item>
        <item id="file_sep_1" type="separator"/>
        <item id="selecionartodos" text="select all" img="select_all.gif" imgdis="select_all.gif"/>
        <item id="file_sep_2" type="separator"/>
        <item id="excluir" text="delete selected" img="excluir.png" imgdis="excluir.png"/></menu>'
        

## Check if variable is an Array
<a href="#cairs-framework">page top</a>

        var test = [];
        CAIRS.isArray( test ); // true
        

## Check if variable is an Object literal
<a href="#cairs-framework">page top</a>

        var test = {};
        CAIRS.isObject( test ); // true
        
        
## Check if variable is a Number
<a href="#cairs-framework">page top</a>

        var test = 2;
        CAIRS.isNumber( test ); // true

## Convert Javascript number to currency format
<a href="#cairs-framework">page top</a>

	console.log( CAIRS.toCurrency(10000000) ); // 10,000,000.00


## Convert currency string to a Javascript Float number
<a href="#cairs-framework">page top</a>
	
	/**
		@function parseFloat - Convert currency string to a Javascript Float number
		
		@parameter currency - string or number for converting to javascript float type
			mandatory
		
		@parameter places - places after decimal, default: 2
			not mandatory
		
		@scope CAIRS.parseFloat(currency, places);
	*/
	
	console.log( CAIRS.parseFloat("10,000,000.00") ); // 10000.00
	
	console.log( CAIRS.parseFloat("10,000,000.00", 3) ); // 10000.000
	
	console.log( CAIRS.parseFloat("10,000,000.00", 1) ); // 10000.0
        
## Implemented forEach statement
<a href="#cairs-framework">page top</a>

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



## Class creation
<a href="#cairs-framework">page top</a>
	
	
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



## Implemented Object Inheritance
<a href="#cairs-framework">page top</a>

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
        

## Inheriting Object and Appending to a pre created NameSpace
<a href="#cairs-framework">page top</a>
	
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


## Creating Keyboard Shortcuts
<a href="#cairs-framework">page top</a>

	CAIRS.createShortcut("Ctrl+F11", function()
	{
		/* example: open the help window now */
		alert("Ctrl+F11 on keyboard");
	});
				
	CAIRS.createShortcut("Ctrl+Shift+A", function()
	{
		/* example: Sellect all elements of a grid now */
		alert("Ctrl+Shift+A on keyboard");
	});
	
## CAIRS Editor
<a href="#cairs-framework">page top</a>

The CAIRS editor is a TinyMCE wrapper. Built on top of CAIRS framework, it provides methods 3 methods

### Render editor

	var formData = [{
		type: "settings",
		labelWidth: 130,
		inputWidth: 170
		, position: "label-left"
	}, {
		type: "input",
		label: "Full Name",
		value: "Kaapori Lumikaastra"
	}, {
		type: "input",
		label: "Email",
		value: "kaapori.lumi@gmail.com"
	}, {
		type: "container",
		name: "myEditor",
		label: "My Editor",
		inputWidth: 330,
		inputHeight: 339
	},  {
		type: "container",
		name: "myEditor2",
		label: "My Editor 2",
		inputWidth: 330,
		inputHeight: 339
	},  {
		type: "container",
		name: "myEditor3",
		label: "My Editor 3",
		inputWidth: 330,
		inputHeight: 339
	}];
	myForm = new dhtmlXForm("myForm", formData);
	
	
	CAIRS.editor.render({
		uid : 'example1'
		,dhtmlxContainer : myForm.getContainer("myEditor")
		,tinyMCEConfiguration : {
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_resizing : true	
		}
		,width : 330
		,height : 200
	});
	

	
	


### Set editor content

	// example 1 - set content from a html div content
	CAIRS.editor.set({
		uid : 'example1'
		,content : document.getElementById("content_test").innerHTML
	});
	
	
	// example 2 - set content from a js string
	CAIRS.editor.set({
		uid : 'example2'
		,content : "Applicant(s) have ' \ \n \r  completed [insert hours] o"
	});
	
	// example 3 - set content from database by an ajax call
	dhtmlxAjax.get("read_datatabase.php",function(loader)
	{
		try
		{	
			var json = JSON.parse( loader.xmlDoc.responseText );
			if( json.status == "success" )	
			{
	
				CAIRS.editor.set({
					uid : 'example3'
					,content : json.content
				});
			}
			else
			{
				dhtmlx.message( {type : "error", text : json.response} );
			}
		}
		catch(e)
		{
			dhtmlx.message( {type : "error", text : "Fatal error on server side: "+loader.xmlDoc.responseText } );
		}
	});

### Get editor content

	CAIRS.editor.get('example3')

It returns encoded value using the encodeURIComponent function



## Encoder
<a href="#cairs-framework">page top</a>



## Dropdown
<a href="#cairs-framework">page top</a>



## Utils
<a href="#cairs-framework">page top</a>

### US States
