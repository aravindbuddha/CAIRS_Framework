var CAIRS = {
	
	windowWidth : 0,
	windowHeight : 0,
	
	/** 
		@function loadScript -  load javascript files - code injection
		@param {string}	url - the url of a given javascript file which will be loaded
		@param {function}	callback - 	function  callback which will be executed after the javascript file 100% loaded
	*/
	loadScript : function (url, callback)
	{
		url = url + ".js";
		var script = document.createElement('script')
		script.type = 'text/javascript';
	
		if (script.readyState)
		{  //IE
			script.onreadystatechange = function()
			{
				if (script.readyState == 'loaded' ||
				script.readyState == 'complete')
				{
					script.onreadystatechange = null;
					callback();
				}
			};
		}
		else
		{  //Others
			script.onload = function(){
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
    }
	/* load javascript files - code injection */
	

	/**
		@function loadScript -  load script - code injection
		@param {string}	url - the url of a given javascript file which will be loaded
		@param {function}	callback - 	function  callback which will be executed after the javascript file 100% loaded
	*/
	,lScript : function (url, callback)
	{
		var script = document.createElement('script')
		script.type = 'text/javascript';
	
		if (script.readyState)
		{  //IE
			script.onreadystatechange = function()
			{
				if (script.readyState == 'loaded' ||
				script.readyState == 'complete')
				{
					script.onreadystatechange = null;
					callback();
				}
			};
		}
		else
		{  //Others
			script.onload = function(){
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
    }	
	/* load script - code injection */
	
	
	,getMousePosition : function(e, cordinate) {
		
		//console.log("mouse");
		
		var isIE = document.all ? true : false;
		var _x;
		var _y;
		if (!isIE) {
			_x = e.pageX - 200;
			_y = e.pageY - 150;
		}
		if (isIE) {
			_x = (e.clientX + document.documentElement.scrollLeft + document.body.scrollLeft) - 200;
			_y = (e.clientY + document.documentElement.scrollTop + document.body.scrollTop) + 150;
		}
		
		if( cordinate == "y" )
		{
			//console.log(cordinate + ": " + _y);
			return _y;
		}
		else
		{
			//console.log(cordinate + ": " + _x);
			return _x;
		}
	}
	
	
	,getElementPosition : function(x, cordinate)
	{
		//console.log("element");
		
		var o = document.getElementById(x);
		var l =o.offsetLeft; 
		var t = o.offsetTop;
		while (o=o.offsetParent)
			l += o.offsetLeft;
		o = document.getElementById(x);
		while (o=o.offsetParent)
			t += o.offsetTop;
		if( cordinate == "y" )
		{
			//console.log(cordinate + ": " + _y);
			return t - 150;
		}
		else
		{
			//console.log(cordinate + ": " + _x);
			return l - 200;
		}
		
	}
	
	
	,getPagePosition : function( cordinate, width, height )
	{
		var self = this, l = 0, t = 0, d = document, w = window;
		if( !window.pageYOffset )
		{
			if( !( document.documentElement.scrollTop == 0 ) )
			{
				t = d.documentElement.scrollTop;
				l = d.documentElement.clientWidth;
			}
			else
			{
				t = d.body.scrollTop;
				l = document.body.clientWidth;
			}
		}
		else
		{
			t = w.pageYOffset;
			l = w.innerWidth;
			
		}

		l = (l / 2) - (width / 2);
		
		if(window.innerHeight)
		{
			t = t + (window.innerHeight / 2) - (height / 2);
		}
		else
		{
			t = t + (document.body.clientHeight / 2) - (height / 2);
		}
		
		if( cordinate == "y" )
		{
			return t;
		}
		else
		{
			return l;
		}
	}
	
	/**
		@object Browser -  performs Browser and OS identifying
		
		@property Browser.name
		@property Browser.version
		@property Browser.OS
			
			usable properties
				Browser.name
				Browser.version
				Browser.OS
	*/
	,Browser : {
		/* quirksmode.org */
		init: function () {
			this.name = this.searchString(this.dataBrowser) || "An unknown browser";
			this.onLine = (navigator.onLine) || "Unknow connection status";
			this.cookieEnabled = (navigator.cookieEnabled) || "Unknow cookies permission";
			
			this.plugins = (navigator.plugins) || "Unknow plugins";
			
			
			
			/*
			
			navigator.geolocation = [object Geolocation]
			navigator.onLine = true
			navigator.cookieEnabled = true
			navigator.vendorSub = 
			navigator.vendor = Google Inc.
			navigator.productSub = 20030107
			navigator.product = Gecko
			navigator.mimeTypes = [object MimeTypeArray]
			navigator.plugins = [object PluginArray]
			navigator.platform = Win32
			navigator.userAgent = Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31
			navigator.language = pt-BR
			navigator.appVersion = 5.0 (Windows NT 6.2) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31
			navigator.appName = Netscape
			navigator.appCodeName = Mozilla
			navigator.doNotTrack = null
			navigator.javaEnabled = function javaEnabled() { [native code] }
			navigator.getStorageUpdates = function getStorageUpdates() { [native code] }
			navigator.registerProtocolHandler = function registerProtocolHandler() { [native code] }
			navigator.webkitGetGamepads = function webkitGetGamepads() { [native code] }
			navigator.webkitGetUserMedia = function webkitGetUserMedia() { [native code] }
			
			*/
			
			this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		}
		,isPlugin : function(which_plugin)
		{
			(typeof which_plugin === 'undefined') ? which_plugin = "notspecified" : "";
			for(var plugin in CAIRS.Browser.plugins)
			{
				(typeof CAIRS.Browser.plugins[plugin].name === 'undefined') ? CAIRS.Browser.plugins[plugin].name = "Unknow plugin" : "";
				var regex = new RegExp( ""+which_plugin.toString()+"", "g" );
				if(CAIRS.Browser.plugins[plugin].name.match( regex ))
					return true;
			}
			return false;
		}
		,dataBrowser: 
		[
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : 
		[
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
			},
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]
	}
	
	/**
		@function getAndSetWindowDimension -  get the current window width and height and set the public properties CAIRS.windowWidth and CAIRS.windowHeight
	*/
	,getAndSetWindowDimension : function()
	{
		var self = this, d = document, w = window;
		// w3c
		if(w.innerWidth)
		{
			self.windowWidth = w.innerWidth;
			self.windowHeight = w.innerHeight;
		}
		else
		{ // old IEs
			if( !( d.documentElement.scrollTop == 0 ) )
			{
				self.windowWidth = d.documentElement.clientWidth;
				self.windowHeight = d.documentElement.clientHeight;
			}
			else
			{
				self.windowWidth = d.body.clientWidth;
				self.windowHeight = d.body.clientHeight;
			}
		}
	}
	
	/**
		@function checkBrowserStuff -  check if the current browser is able to run AJAX applications
		@return {boolean} - true / false
	*/
	,checkBrowserStuff : function()
	{
		var self = this;
		self.Browser.init(); // init browser handler, mandatory, first
		self.getAndSetWindowDimension(); // mandatory, second
		
		var AJAX_avaliable = false;
		var XML_parsing_avaliable = false;
		
		if(self.Browser.name === 'Explorer')
		{
			//Try Parse an XML Document - used by ajax calls
			try
			{
				new ActiveXObject("Microsoft.XMLHTTP");
				//return true;
				//alert("success - AJAX Calls - Microsoft.XMLHTTP");
				AJAX_avaliable = true;
			} 
			catch(e)
			{
				//IE7+
				if( (new Number(self.Browser.version)) >= 7 )
				{
					try
					{
						new XMLHttpRequest();
						//return true;
						//alert("success - AJAX Calls - XMLHttpRequest");
						AJAX_avaliable = true;
					}
					catch(e)
					{
						self.showDirections("MSXML");
						//return false;
					}
				}
				else
				{
					self.showDirections("MSXML");
					//return false;
				}
			}
			//Try Parse an XML String
			try
			{
				new ActiveXObject("Microsoft.XMLDOM");
				//return true;
				//alert("success - XML string parser - Microsoft.XMLDOM");
				XML_parsing_avaliable = true;
			}
			catch(e)
			{
				if( (AJAX_avaliable) && (! XML_parsing_avaliable))
				{ // ie with no complements enabled
					self.showDirections("COMPONENTS_DISABLED");
				}
				else
				{
					self.showDirections("MSXML");
				}
				
				//return false;
			}
		}
		
		//alert(self.Browser.plugins);
	}
	
	,showDirections : function(m)
	{
		var self = this, template = '', div_wrapper, div_splash;
		div_wrapper = document.createElement("DIV");
		div_wrapper.setAttribute("style", '-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; filter: alpha(opacity=50);');
		div_wrapper.style.width = "100%";
		div_wrapper.style.height = "100%";
		div_wrapper.style.position = "fixed";
		div_wrapper.style.top = "0";
		div_wrapper.style.left = "0";
		div_wrapper.style.zIndex = "999888";
		div_wrapper.style.backgroundColor = "#000000";
		div_wrapper.style.opacity = "0.5";
		
		div_splash = document.createElement("DIV");
		div_splash.setAttribute("style", 'font-size:14px;padding-top:295px;padding-right:50px;padding-left:8px;color:#333333;line-height:18px;font-family:arial;');
		div_splash.style.width = "442px";
		div_splash.style.height = "80px";
		div_splash.style.position = "fixed";
		//div_splash.style.margin = "auto";
		div_splash.style.top = ((self.windowHeight / 2) - 183) + "px";
		div_splash.style.left = ((self.windowWidth / 2) - 250) + "px";
		div_splash.style.zIndex = "999999";
		//div_splash.style.backgroundColor = "#ffffff";
		div_splash.style.backgroundImage = "url(http://cairs.web2solutions.com.br/CAIRS_Framework/imgs/splash.png)";
		div_splash.style.backgroundRepeat = "no-repeat";
		div_splash.style.opacity = "1";
		div_splash.style.textAlign = "left";
		
		
		if(m === "MSXML")
		{
			template = template + '<b>Your browser is out of date</b> <br>';
			template = template + 'Your computer does not have a necessary component installed <br>';
			template = template + '<b>Please click <a target="_blank" style="color:#003399;" href="http://www.microsoft.com/en-us/download/details.aspx?id=19662" title="download">here</a> to install the component or use Firefox or Google Chrome</b>';
		}
		else if(m === "COMPONENTS_DISABLED")
		{
			template = template + 'You are running Internet Explorer under <b>"no add-ons"</b> mode, <br>';
			template = template + 'or ActiveXs are disabled <br>';
			template = template + 'Close your browser and open the Internet Explorer again by reaching:<br><b>Start menu -> All Programs -> Internet Explorer</b>';
		}
		
		div_splash.innerHTML = template;
		
		try{
			document.body.appendChild(div_wrapper);
			document.body.appendChild(div_splash);
		}
		catch(e)
		{
			document.getElementsByTagName('body')[0].appendChild(div_wrapper);
			document.getElementsByTagName('body')[0].appendChild(div_splash);
		}
		
		
	}
	
	,exposeForEach : function()
	{
		// Production steps of ECMA-262, Edition 5, 15.4.4.18
		// Reference: http://es5.github.com/#x15.4.4.18
		if ( !Array.prototype.forEach ) {
		 
		  Array.prototype.forEach = function forEach( callback, thisArg ) {
		 
			var T, k;
		 
			if ( this == null ) {
			  throw new TypeError( "this is null or not defined" );
			}
		 
			// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
			var O = Object(this);
		 
			// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
			// 3. Let len be ToUint32(lenValue).
			var len = O.length >>> 0; // Hack to convert O.length to a UInt32
		 
			// 4. If IsCallable(callback) is false, throw a TypeError exception.
			// See: http://es5.github.com/#x9.11
			if ( {}.toString.call(callback) !== "[object Function]" ) {
			  throw new TypeError( callback + " is not a function" );
			}
		 
			// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
			if ( thisArg ) {
			  T = thisArg;
			}
		 
			// 6. Let k be 0
			k = 0;
		 
			// 7. Repeat, while k < len
			while( k < len ) {
		 
			  var kValue;
		 
			  // a. Let Pk be ToString(k).
			  //   This is implicit for LHS operands of the in operator
			  // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
			  //   This step can be combined with c
			  // c. If kPresent is true, then
			  if ( Object.prototype.hasOwnProperty.call(O, k) ) {
		 
				// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
				kValue = O[ k ];
		 
				// ii. Call the Call internal method of callback with T as the this value and
				// argument list containing kValue, k, and O.
				callback.call( T, kValue, k, O );
			  }
			  // d. Increase k by 1.
			  k++;
			}
			// 8. return undefined
		  };
		}	
		
	}
	
	,isArray : function(what)
	{
		 return Object.prototype.toString.call(what) === '[object Array]';	
	}
	
	,isObject : function(what)
	{
		return ((typeof what == "object") && (what !== null));
	}
	
	,isNumber : function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	,toCurrency : function(num) {

		   x = 0;
		
		   if(num<0) {
			  num = Math.abs(num);
			  x = 1;
		   }
		   if(isNaN(num)) num = "0";
			  cents = Math.floor((num*100+0.5)%100);
		
		   num = Math.floor((num*100+0.5)/100).toString();
		
		   if(cents < 10) cents = "0" + cents;
			  for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
				 num = num.substring(0,num.length-(4*i+3))+','
					   +num.substring(num.length-(4*i+3));
		   ret = num + '.' + cents;
		   if (x == 1) ret = ' - ' + ret;return ret;
		
	}
	
	/**
		@function parseFloat - Convert currency string to a Javascript Float number
		
		@parameter currency - string or number for converting to javascript float type
			mandatory
		
		@parameter places - places after decimal, default: 2
			not mandatory
		
		@scope CAIRS.parseFloat(currency, places);
	*/
	,parseFloat : function(currency, places)
	{
	  	(typeof places === 'undefined') ? places = 2 : "";
	   	currency = currency.replace(",","");
	   	return parseFloat(currency).toFixed(places);
	}
	
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
	,ext : function(parentClass, objClass, nameSpaceName)
	{
		var self = this, ob;
		
		(typeof nameSpaceName === 'undefined') ? nameSpaceName = false : "";
		
		for( var className in objClass )
		{
			if(nameSpaceName)
			{
				var first_level = true;
				var last_level = '';
				nameSpaceName.split(".").forEach( function(level, index, array)
				{
					if(first_level)
					{
						window[level] = window[level] || {};
						
						//console.log(window[level]);
						//ob = window[level][className];
						last_level = window[level];
						first_level = false;

					}
					else
					{
						//console.log(last_level);
						last_level[ level ] =  last_level[ level ] || {};
						//console.log(last_level[ level ]);
						last_level = last_level[ level ];
					}
				});
				//console.log(last_level);
				//console.log(className);
				
				( (parentClass) && parentClass != null) ? last_level[className] = Object.create( parentClass ) : last_level[className] = {};
				
				ob = last_level[className];
				for( var item in objClass[className] )
				{
					last_level[className][item] = last_level[item] || {}
					
					last_level[className][item] = objClass[className][item];
					
					
					
					ob[item] = last_level[className][item];
				}
				//console.log(className);
				//console.log( root.NameSpace.usingNameSpace );
			}
			else
			{
				
				( (parentClass) && parentClass != null) ? window[className] = Object.create( parentClass ) : window[className] = {};
				
				
				ob = window[className];
				for( var item in objClass[className] )
				{
					ob[item] = objClass[className][item];
				}
			}
			
		}
		
		return ob;	
	}
	
	//,utils : {
		
		// CAIRS.utils.shortcut.add(strAtalho, fnCallback);
		,shortcut : {
			'all_shortcuts': {},
			'add': function (shortcut_combination, callback, opt) {
				var default_options = {
					'type': 'keydown',
					'propagate': false,
					'disable_in_input': true,
					'target': document,
					'keycode': false
				}
				if (!opt) opt = default_options;
				else {
					for (var dfo in default_options) {
						if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
					}
				}
		
				var ele = opt.target
				if (typeof opt.target == 'string') ele = document.getElementById(opt.target);
				var ths = this;
				shortcut_combination = shortcut_combination.toLowerCase();
		
				//The function to be called at keypress
				var func = function (e) {
					e = e || window.event;
		
					if (opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
						var element;
						if (e.target) element = e.target;
						else if (e.srcElement) element = e.srcElement;
						if (element.nodeType == 3) element = element.parentNode;
		
						if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
					}
		
					//Find Which key is pressed
					if (e.keyCode) code = e.keyCode;
					else if (e.which) code = e.which;
					var character = String.fromCharCode(code).toLowerCase();
		
					if (code == 188) character = ","; //If the user presses , when the type is onkeydown
					if (code == 190) character = "."; //If the user presses , when the type is onkeydown
		
					var keys = shortcut_combination.split("+");
					//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
					var kp = 0;
		
					//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
					var shift_nums = {
						"`": "~","1": "!","2": "@","3": "#","4": "$","5": "%","6": "^","7": "&","8": "*","9": "(","0": ")"
						,"-": "_","=": "+",";": ":","'": "\"",",": "<",".": ">","/": "?","\\": "|"
					}
					//Special Keys - and their codes
					var special_keys = {
						'esc': 27,'escape': 27,'tab': 9,'space': 32,'return': 13,'enter': 13,'backspace': 8,
						'scrolllock': 145,'scroll_lock': 145,'scroll': 145,'capslock': 20,'caps_lock': 20,'caps': 20,'numlock': 144,'num_lock': 144,'num': 144,
						'pause': 19,'break': 19,
						'insert': 45,'home': 36,'delete': 46,'end': 35,
						'pageup': 33,'page_up': 33,'pu': 33,
						'pagedown': 34,'page_down': 34,'pd': 34,
						'left': 37,'up': 38,'right': 39,'down': 40,
						'f1': 112,'f2': 113,'f3': 114,'f4': 115,'f5': 116,'f6': 117,'f7': 118,'f8': 119,'f9': 120,'f10': 121,'f11': 122,'f12': 123
					}
		
					var modifiers = {
						shift: {
							wanted: false,
							pressed: false
						},
						ctrl: {
							wanted: false,
							pressed: false
						},
						alt: {
							wanted: false,
							pressed: false
						},
						meta: {
							wanted: false,
							pressed: false
						} //Meta is Mac specific
					};
		
					if (e.ctrlKey) modifiers.ctrl.pressed = true;
					if (e.shiftKey) modifiers.shift.pressed = true;
					if (e.altKey) modifiers.alt.pressed = true;
					if (e.metaKey) modifiers.meta.pressed = true;
		
					for (var i = 0; k = keys[i], i < keys.length; i++) {
						//Modifiers
						if (k == 'ctrl' || k == 'control') {
							kp++;
							modifiers.ctrl.wanted = true;
		
						} else if (k == 'shift') {
							kp++;
							modifiers.shift.wanted = true;
		
						} else if (k == 'alt') {
							kp++;
							modifiers.alt.wanted = true;
						} else if (k == 'meta') {
							kp++;
							modifiers.meta.wanted = true;
						} else if (k.length > 1) { //If it is a special key
							if (special_keys[k] == code) kp++;
		
						} else if (opt['keycode']) {
							if (opt['keycode'] == code) kp++;
		
						} else { //The special keys did not match
							if (character == k) kp++;
							else {
								if (shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
									character = shift_nums[character];
									if (character == k) kp++;
								}
							}
						}
					}
		
					if (kp == keys.length &&
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
						callback(e);
		
						if (!opt['propagate']) { //Stop the event
							//e.cancelBubble is supported by IE - this will kill the bubbling process.
							e.cancelBubble = true;
							e.returnValue = false;
		
							//e.stopPropagation works in Firefox.
							if (e.stopPropagation) {
								e.stopPropagation();
								e.preventDefault();
							}
							return false;
						}
					}
				}
				this.all_shortcuts[shortcut_combination] = {
					'callback': func,
					'target': ele,
					'event': opt['type']
				};
				//Attach the function with the event
				if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);
				else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
				else ele['on' + opt['type']] = func;
			},
		
			//Remove the shortcut - just specify the shortcut and I will remove the binding
			'remove': function (shortcut_combination) {
				shortcut_combination = shortcut_combination.toLowerCase();
				var binding = this.all_shortcuts[shortcut_combination];
				delete(this.all_shortcuts[shortcut_combination])
				if (!binding) return;
				var type = binding['event'];
				var ele = binding['target'];
				var callback = binding['callback'];
		
				if (ele.detachEvent) ele.detachEvent('on' + type, callback);
				else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);
				else ele['on' + type] = false;
			}
		}	
	//}
	
	,createShortcut : function (strAtalho, fnCallback)
	{
		var self = this;
		self.shortcut.add(strAtalho, fnCallback);	
	}
	
	/**
		@object xml - provides xml manipulation
	*/
	,xml : {
		/**
		
		CAIRS.xml.fromJSON( { menu: [
			{ item : { id: "recarregagrid", text : "reload", img : "atualizar.png", imgdis : "atualizar.png"}, child : [
				{ item : { id: "file_sep_0", text : "select all", img : "select_all.gif", imgdis : "select_all.gif"} }
			] }
			,{ item : { id: "file_sep_1", type : "separator"} }
			,{ item : { id: "selecionartodos", text : "select all", img : "select_all.gif", imgdis : "select_all.gif"} }
			,{ item : { id: "file_sep_2", type : "separator"} }
			,{ item : { id: "excluir", text : "delete selected", img : "excluir.png", imgdis : "excluir.png"} }
		
		] } )
		
		*/
		fromJSON : function( json, isRoot, parentNode, xmlDoc )
		{
			/** 
				@parameter json - mandatory JSON:
			*/
			
			var self = CAIRS;
			
			(typeof isRoot === 'undefined') ? isRoot = true : "";
			(typeof xmlDoc === 'undefined') ? xmlDoc = null : "";
			(typeof parentNode === 'undefined') ? parentNode = false : "";
			
			for (var root in json)
			{
				var rootText;
				//create root
				if(isRoot)
				{
					rootText = root;
					xmlDoc = document.implementation.createDocument(null, root, null);
					isRoot = false;
				}
				
				// if value from key is an array, lets append childs
				if( self.isArray( json[root] ) )
				{
					for(var index = 0; index < json[root].length; index++)
					{
						// { item : { id: "recarregagrid", text : "reload", img : "atualizar.png", imgdis : "atualizar.png"} }
						var nodeObj = json[root][index];
						//console.log( JSON.stringify(nodeObj) );
						//if nodeObj is a object
						if( self.isObject( nodeObj ) )
						{
							//console.log(nodeObj);
							// iterates over nodeObj object and add a new node to parent node
							
							var pNodeName = '';
							var pNode = '';
							
							for ( var nodeText in nodeObj )
							{
								var node = null;
								
								if( CAIRS.isArray( nodeObj[nodeText] ) )
								{
									this.fromJSON( nodeObj, false, pNode, xmlDoc );
								}
								else
								{
									pNodeName = nodeText;
									
									node = xmlDoc.createElement( pNodeName );
									var attributes = nodeObj[nodeText];
									if( self.isObject( attributes ) )
									{
										for ( var attribute in attributes )
										{
											node.setAttribute( attribute, attributes[attribute] );		
										}
									}
										
									(parentNode) ? parentNode.appendChild( node ) : xmlDoc.documentElement.appendChild( node );
										
									pNode = node;
								}
							}
						}
					}
				}
			}
			return xmlDoc;
		}
		
		,serialize : function (xmlNode)
		{
			if (typeof window.XMLSerializer != "undefined") {
				return (new window.XMLSerializer()).serializeToString(xmlNode);
			} else if (typeof xmlNode.xml != "undefined") {
				return xmlNode.xml;
			}
			return "";
		}
		
	}	
	
	,test : function()
	{
		console.log("parent ok");	
	}
	
	/**
		@function init -  performs all the necessary tasks before let the user to use the CAIRS object
	*/
	,init : function()
	{
		var self = this;
		self.checkBrowserStuff(); // mandatory, first
		self.exposeForEach();
		
	}
};
window.onload = function()
{
	CAIRS.init();
};