CAIRS Framework
===============

Init Framework

        CAIRS.init();


Browser handling

        alert( CAIRS.Browser.name ); // Chrome
        alert( CAIRS.Browser.onLine ); // is the browser online?
        alert( CAIRS.Browser.cookieEnabled ); // is the browser able to generate cookies?
        alert( CAIRS.Browser.version ); // browser version
        alert( CAIRS.Browser.OS ); // Operational system
        alert( CAIRS.Browser.plugins ); // [], a list of available browser's plugins
        

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


Check if plugin is installed

        CAIRS.Browser.isPlugin( "Chrome PDF Viewer" ); // true/false
        
Plugin name examples

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
