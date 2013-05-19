CAIRS Framework
===============


CAIRS.init();


alert( CAIRS.Browser.name ); // Chrome
alert( CAIRS.Browser.onLine ); // is the browser online?
alert( CAIRS.Browser.cookieEnabled ); // is the browser able to generate cookies?
alert( CAIRS.Browser.version ); // browser version
alert( CAIRS.Browser.OS ); // Operational system
alert( CAIRS.Browser.plugins ); // [], a list of available browser's plugins

/**
        @function loadScript -  load script - code injection - on demand JavaScript loading files
        @param {string}    url - the url of a given JavaScript file which will be loaded
        @param {function}    callback -     function  callback which will be executed after the JavaScript file 100% loaded
*/
CAIRS.loadScript("controller/FlexPaperComponent", function() // injects controller/FlexPaperComponent.js
{
            // after code injected, call the component FlexPaperComponent           
            FlexPaperComponent.callFlexPaper(
            {
                //uid : file.name // mandatory
                icons_path : 'icons/32px/' // mandatory
                ,application_url : self.configuration[ uid ].application_url // mandatory
                ,application_path : self.configuration[ uid ].application_path // mandatory
                ,pdf_name : file.name // mandatory
                ,split_mode : splitMode // not mandatory
                ,magnification : self.configuration[ uid ].magnification  // not mandatory, default 1.1
            });   
});
