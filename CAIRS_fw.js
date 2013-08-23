var scripTS = document.getElementsByTagName("script");
var CAIRS_location = scripTS[scripTS.length-1].src.replace(/CAIRS_fw.js/gi,"");
//console.log(CAIRS_location);
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
		var script = document.createElement('script');
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
	
	
	,onDemand : {
		queue : []
		,load : function (url, callback)
		{
			var self = CAIRS.onDemand;
			if( CAIRS.isArray( url ) )
			{
				url.forEach( function(path, index, array)
				{
					self.queue.push(path);
				});
			}
			else
			{
				self.queue.push(url);
			}
			CAIRS.showDirections("Loading_Files");
			self.process_queue( callback );
		}
		,process_queue : function( callback )
		{
			var self = CAIRS.onDemand;
			//console.log(self.queue.length);
			if(self.queue.length > 0)
			{
				var first_on_queue = self.queue.shift();
				CAIRS.lScript(first_on_queue, function()
				{
					self.process_queue( callback );
				});
			}
			else
			{
				CAIRS.hideDirections();
				callback();
			}
		}
	}

	/**
		@function loadScript -  load script - code injection
		@param {string}	url - the url of a given javascript file which will be loaded
		@param {function}	callback - 	function  callback which will be executed after the javascript file 100% loaded
	*/
	,lScript : function (url, callback)
	{
		var self = this, arrType, type, s, nodeType, node;
		if(typeof document.getElementById(url) !== null)
		{
			
			arrType = url.split(".");
			type = arrType[arrType.length-1];
			
			if( type === 'css')
			{
				nodeType = "link";
				node = document.createElement(nodeType);
				node.setAttribute("rel","stylesheet");
				node.setAttribute("type","text/css");
				node.setAttribute("href",url);
			}
			else
			{
				nodeType = "script";
				node = document.createElement(nodeType);
				node.setAttribute("type","text/javascript");
				node.setAttribute("src",url);
			}
			
			node.setAttribute("id", url);
			
			if (node.readyState)
			{  //IE
				node.onreadystatechange = function()
				{
					if (node.readyState == 'loaded' ||
					node.readyState == 'complete')
					{
						node.onreadystatechange = null;
						callback();
					}
				};
			}
			else
			{  //Others
				node.onload = function(){
					callback();
				};
			}
			
			document.getElementsByTagName('head')[0].appendChild(node);
			
			//s = document.getElementsByTagName('script')[0];
			//s.parentNode.insertBefore(node, s);
		}
    }	
	/* load script - code injection */
	
	
	,editor : {
		
		render : function( configuration )
		{
			
			var self = CAIRS, width = 688, height = 400, existing_div, uid, div_wrapper;
			
			if(configuration.width)
			{
				width = configuration.width;
			}
			if(configuration.height)
			{
				height = configuration.height;
			}
		
			uid = configuration.uid;
			
			if( (typeof configuration.existing_div !== 'undefined') && (configuration.existing_div !== false) )
			{
				existing_div = configuration.existing_div;
			}
			else
			{
				
				existing_div = "cairs_editor_wrapper_" + uid;
				
				div_wrapper = document.createElement("div");
				div_wrapper.setAttribute("id", existing_div);
				
				
				if( (typeof configuration.dhtmlxContainer !== 'undefined') && (configuration.dhtmlxContainer !== false))
				{
					configuration.dhtmlxContainer.appendChild(div_wrapper);
				}
				else
				{
					document.body.appendChild(div_wrapper);
				}
				
				
			}
			
			//console.log(existing_div);
			
			var tinyMCEConfiguration = {
				selector: "div#" + existing_div,
				//theme: "modern",
				width: width,
				height: height,
				mode: "exact",
				//elements: "tinymce",
				//theme: "advanced",
				//plugins: 'ice',
				//content_css: "css/content.css",
				//toolbar: "insertfile undo redo |,search,replace,|,ice_togglechanges,ice_toggleshowchanges,iceacceptall,icerejectall,iceaccept,icereject |  styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons", 
				//theme : "advanced",
				//plugins : "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
				theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
				theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
				theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
				theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
				//theme_advanced_toolbar_location : "top",
				//theme_advanced_toolbar_align : "left",
				//theme_advanced_statusbar_location : "bottom",
				theme_advanced_resizing : true
			}
			
			
			
			if( (typeof configuration.tinyMCEConfiguration !== 'undefined') && (configuration.tinyMCEConfiguration !== false) )
			{
				for( config in configuration.tinyMCEConfiguration)
				{
					tinyMCEConfiguration[config] = configuration.tinyMCEConfiguration[config];
				}
			}
			
			
			
			tinymce.init( tinyMCEConfiguration );	
			return CAIRS.editor;
		}
		,set : function( c )
		{
			if(typeof c.uid !== 'undefined')
			{
				if(typeof c.content !== 'undefined')
				{
					window.setTimeout(function(){
						tinyMCE.get( "cairs_editor_wrapper_" + c.uid ).setContent( c.content );
					}, 1000);
				}
			}
		}
		,get : function( uid ){
			if(typeof uid !== 'undefined')
			{
				return encodeURIComponent( tinyMCE.get( "cairs_editor_wrapper_" + uid ).getContent() );
			}
			else
			{
				return null;	
			}
		}
		
	}
	
	,Encoder : 
	{
		EncodeType:"entity",isEmpty:function(val)
		{
			if(val)
			{
				return((val===null)||val.length==0||/^\s+$/.test(val))
			}else
			{
				return true
			}
		},
		arr1:new Array('&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;','&brvbar;','&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;','&reg;','&macr;','&deg;','&plusmn;','&sup2;','&sup3;','&acute;','&micro;','&para;','&middot;','&cedil;','&sup1;','&ordm;','&raquo;','&frac14;','&frac12;','&frac34;','&iquest;','&Agrave;','&Aacute;','&Acirc;','&Atilde;','&Auml;','&Aring;','&Aelig;','&Ccedil;','&Egrave;','&Eacute;','&Ecirc;','&Euml;','&Igrave;','&Iacute;','&Icirc;','&Iuml;','&ETH;','&Ntilde;','&Ograve;','&Oacute;','&Ocirc;','&Otilde;','&Ouml;','&times;','&Oslash;','&Ugrave;','&Uacute;','&Ucirc;','&Uuml;','&Yacute;','&THORN;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&divide;','&Oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;','&oelig;','&oelig;','&scaron;','&scaron;','&yuml;','&circ;','&tilde;','&ensp;','&emsp;','&thinsp;','&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;','&sbquo;','&ldquo;','&rdquo;','&bdquo;','&dagger;','&dagger;','&permil;','&lsaquo;','&rsaquo;','&euro;','&fnof;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;','&hellip;','&prime;','&prime;','&oline;','&frasl;','&weierp;','&image;','&real;','&trade;','&alefsym;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&forall;','&part;','&exist;','&empty;','&nabla;','&isin;','&notin;','&ni;','&prod;','&sum;','&minus;','&lowast;','&radic;','&prop;','&infin;','&ang;','&and;','&or;','&cap;','&cup;','&int;','&there4;','&sim;','&cong;','&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;','&sup;','&nsub;','&sube;','&supe;','&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;','&lfloor;','&rfloor;','&lang;','&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;'),
		arr2:new Array('&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;','&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;','&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;','&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;','&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;','&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;','&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;','&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;','&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;','&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;','&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;','&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;','&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;','&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;','&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;','&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;','&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;','&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;','&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;','&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;','&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;','&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;','&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;','&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;','&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;','&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;','&#9824;','&#9827;','&#9829;','&#9830;'),
		HTML2Numerical:function(s)
		{
			return this.swapArrayVals(s,this.arr1,this.arr2)
		},
		NumericalToHTML:function(s)
		{
			return this.swapArrayVals(s,this.arr2,this.arr1)
		},
		numEncode:function(s)
		{
			if(this.isEmpty(s))return"";
			var e="";
			for(var i=0;i<s.length;i++)
			{
				var c=s.charAt(i);
				if(c<" "||c>"~")
				{
					c="&#"+c.charCodeAt()+";"
				}
				e+=c
			}
			return e
		},
		htmlDecode:function(s)
		{
			var c,m,d=s;
			if(this.isEmpty(d))return"";
			d=this.HTML2Numerical(d);
			arr=d.match(/&#[0-9]{1,5};/g);
			if(arr!=null)
			{
				for(var x=0;x<arr.length;x++)
				{
					m=arr[x];
					c=m.substring(2,m.length-1);
					if(c>=-32768&&c<=65535)
					{
						d=d.replace(m,String.fromCharCode(c))
					}
					else
					{
						d=d.replace(m,"")
					}
				}
			}
			return d
		},
		htmlEncode:function(s,dbl)
		{
			if(this.isEmpty(s))return"";
			dbl=dbl||false;
			if(dbl)
			{
				if(this.EncodeType=="numerical")
				{
					s=s.replace(/&/g,"&#38;")
				}
				else
				{
					s=s.replace(/&/g,"&amp;")
				}
			}
			s=this.XSSEncode(s,false);
			if(this.EncodeType=="numerical"||!dbl)
			{
				s=this.HTML2Numerical(s)
			}
			s=this.numEncode(s);
			if(!dbl)
			{
				s=s.replace(/&#/g,"##AMPHASH##");
				if(this.EncodeType=="numerical")
				{
					s=s.replace(/&/g,"&#38;")
				}
				else
				{
					s=s.replace(/&/g,"&amp;")
				}
				s=s.replace(/##AMPHASH##/g,"&#")
			}
			s=s.replace(/&#\d*([^\d;]|$)/g,"$1");
			if(!dbl)
			{
				s=this.correctEncoding(s)
			}
			if(this.EncodeType=="entity")
			{
				s=this.NumericalToHTML(s)
			}
			return s
		},
		XSSEncode:function(s,en)
		{
			if(!this.isEmpty(s))
			{
				en=en||true;
				if(en)
				{
					s=s.replace(/\'/g,"&#39;");
					s=s.replace(/\"/g,"&quot;");
					s=s.replace(/</g,"&lt;");
					s=s.replace(/>/g,"&gt;")
				}
				else
				{
					s=s.replace(/\'/g,"&#39;");
					s=s.replace(/\"/g,"&#34;");
					s=s.replace(/</g,"&#60;");
					s=s.replace(/>/g,"&#62;")
				}
				return s
			}
			else
			{
				return""
			}
		},
		hasEncoded:function(s)
		{
			if(/&#[0-9]{1,5};/g.test(s))
			{
				return true
			}
			else if(/&[A-Z]{2,6};/gi.test(s))
			{
				return true
			}
			else
			{
				return false
			}
		},
		stripUnicode:function(s)
		{
			return s.replace(/[^\x20-\x7E]/g,"")
		},
		correctEncoding:function(s)
		{
			return s.replace(/(&amp;)(amp;)+/,"$1")
		},
		swapArrayVals:function(s,arr1,arr2)
		{
			if(this.isEmpty(s))return"";
			var re;
			if(arr1&&arr2)
			{
				if(arr1.length==arr2.length)
				{
					for(var x=0,i=arr1.length;x<i;x++)
					{
						re=new RegExp(arr1[x],'g');
						s=s.replace(re,arr2[x])
					}
				}
			}
			return s
		},
		inArray:function(item,arr)
		{
			for(var i=0,x=arr.length;i<x;i++)
			{
				if(arr[i]===item)
				{
					return i
				}
			}
			return-1
		}
	}
	
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
	
	,hideDirections : function()
	{
		try
		{
			document.getElementById("CAIRS_wrapper_splash").style.display = "none";
			document.getElementById("CAIRS_splash").style.display = "none";	
		}
		catch(e)
		{
			
		}
	}
	
	,showDirections : function(m)
	{
		var self = this, template = '', div_wrapper, div_splash;
		div_wrapper = document.createElement("DIV");
		div_wrapper.setAttribute("style", '-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; filter: alpha(opacity=50);');
		div_wrapper.setAttribute("id", 'CAIRS_wrapper_splash');
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
		div_splash.setAttribute("id", 'CAIRS_splash');
		div_splash.style.width = "442px";
		div_splash.style.height = "80px";
		div_splash.style.position = "fixed";
		//div_splash.style.margin = "auto";
		
		
		if( self.windowHeight == 0)
		{
			self.getAndSetWindowDimension();
		}
		
		
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
		else if(m === "Loading_Files")
		{
			template = template + '';
			template = template + '<b>Loading files ...</b><br>';
			template = template + 'please wait!';
		}
		
		div_splash.innerHTML = template;
		
		
		//document.getElementById("CAIRS_wrapper_splash").style.display = "none";
		//document.getElementById("CAIRS_splash").style.display = "none";
		
		
		if(document.getElementById("CAIRS_wrapper_splash") === null)
		{
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
		else
		{
			document.getElementById("CAIRS_wrapper_splash").style.display = "block";
			document.getElementById("CAIRS_splash").style.display = "block";
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
	
	,isValidDate : function(d) {
	  if ( Object.prototype.toString.call(d) !== "[object Date]" )
		return false;
	  return !isNaN(d.getTime());
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
	
	,getParentByID : function( id )
	{
		try
		{
			return document.getElementById(id).parentNode;
		}
		catch(e)
		{
			return false;
		}
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
	
	// cookie child object
	,cookie : {
		
		set : function(cookieName, strValue, lngDays)
		{
			try
			{
				var dtmData = new Date();
				if(lngDays)
				{
					dtmData.setTime(dtmData.getTime() + (lngDays * 24 * 60 * 60 * 1000));
					var strExpires = "; expires=" + dtmData.toGMTString();
				}
				else
				{
					var strExpires = "";
				}
				document.cookie = cookieName + "=" + strValue + strExpires + "; path=/";
				
				return true;
			}
			catch(e)
			{
				//console.log(e.stack);
				return false;
			}
		}
		
		,setByKey : function( cookieName, keyName, value, lngDays )
		{
			var self = CAIRS.cookie;
			try{
				var thisCookies = unescape(self.get(cookieName));
				if(thisCookies)
				{
					thisCookies = thisCookies.split("&");
					
					thisCookies.forEach( function(cookie, index, array)
					{
						cookie = cookie.split("=");
						if(cookie[0] == keyName)
						{
							return;	
						}
					});
					
					var newcookie = self.get( cookieName ) + "&"+keyName+"="+value+"";
						
					self.set( cookieName, newcookie, lngDays );
				}
				else
				{
					self.set( cookieName, ""+keyName+"="+value+"", 360 );
				}
				
				return true;	
			}catch(e)
			{
				//console.log(e.stack);
				return false;
			}
		}
		
		,get : function( cookieName )
		{
			try
			{
				var cookieNameEqual = cookieName + "=";
				var arrCookies = document.cookie.split(';');
			
				for(var i = 0; i < arrCookies.length; i++)
				{
					var strValueCookie = arrCookies[i];
					while(strValueCookie.charAt(0) == ' ')
					{
						strValueCookie = strValueCookie.substring(1, strValueCookie.length);
					}
					if(strValueCookie.indexOf(cookieNameEqual) == 0)
					{
						return unescape(strValueCookie.substring(cookieNameEqual.length, strValueCookie.length).replace(/\+/gi, " "));
					}
				}
				return false;
			}
			catch(e)
			{
				return false;
			}
		}
		
		,getByKey : function( cookiename, cookiekey )	
		{
			var self = CAIRS.cookie;
			try
			{
				var cookievalue = self.get(cookiename);
				if ( cookievalue == "")
					return false;
				try
				{
					cookievaluesep=cookievalue.split("&");	
				}catch(e)
				{
						return false;
				}
				
				for (c=0;c<cookievaluesep.length;c++)
				{
					cookienamevalue=cookievaluesep[c].split("=");
					if (cookienamevalue.length > 1) //it has multi valued cookie
					{
						if ( cookienamevalue[0] == cookiekey )			
							return  unescape(cookienamevalue[1].toString().replace(/\+/gi, " "));			
					}
					else		
						return false;		
				}
				return false;
			}
			catch(e)
			{
				return false;
			}
		}
	}
	
	,dropdown : 
	{
		currentOpened : false
		,components : []
		,closeOpened : function()
		{
			var self = CAIRS.dropdown;
			if(self.currentOpened)
			{
				self.currentOpened.style.zIndex = "1";
				self.currentOpened.childNodes[1].style.zIndex = "2";
				self.currentOpened.childNodes[3].style.zIndex = "2";
				self.currentOpened.childNodes[3].style.display = "none";
			}
		}
		,openClicked : function(obj)
		{
			var self = CAIRS.dropdown;
			obj.style.zIndex = "999";
			obj.childNodes[1].style.zIndex = "9999";
			obj.childNodes[3].style.zIndex = "9999";
			obj.childNodes[3].style.display = "block";
			self.currentOpened = obj;
		}
		,setSelectedValue : function(obj, value)
		{
			var self = CAIRS.dropdown;
			//obj.style.zIndex = "999";
			obj.childNodes[1].innerHTML = value;
			self.closeOpened();
		}
		,setValue : function(objId, value)
		{
			var self = CAIRS.dropdown;
			var obj = document.getElementById( objId );
			obj.childNodes[1].innerHTML = value;
			self.closeOpened();
		}
		,getSelectedValue : function(objID)
		{
			try
			{
				var self = CAIRS.dropdown;
				var obj = document.getElementById( objID );
				return obj.childNodes[1].innerHTML;
			}catch(e)
			{
				return false;
			}
		}
		,getValues : function()
		{
			try
			{
				var self = CAIRS.dropdown;
				var hash = {};
				for(var dropdownId in self.components)
				{
					hash[ dropdownId ] = self.getSelectedValue( dropdownId );
				}
				return hash;
			}catch(e)
			{
				return {};
			}
		}
		,getPostParams : function()
		{
			try
			{
				var self = CAIRS.dropdown;
				var postStr = "";
				for(var dropdownId in self.components)
				{
					postStr = postStr + "&" + dropdownId + "=" + encodeURI( self.getSelectedValue( dropdownId ) );
					//console.log(dropdownId + "  varchar(255),");
					//console.log("'$"+dropdownId+"',");
					//console.log(dropdownId + ",");
					//console.log("'"+dropdownId+"' => $row['"+dropdownId+"']");
					
				}
				return postStr.substr( 1, postStr.length );
			}catch(e)
			{
				return "";
			}
		}
		,renderAll : function(parentID)
		{
			var self = CAIRS.dropdown;
			var parent = document.getElementById(parentID);
			var divs = parent.getElementsByTagName("DIV");
			for (div in divs)
			{
				if( ('' + divs[div].className + '').indexOf('CAIRS_dropdown') > -1)
				{
					var component_container = divs[div];
					var component_id =  component_container.getAttribute("id");
					self.components[ component_id ] = 
					{
						component_container : divs[div]
						,component_id :  component_container.getAttribute("id")
						,selected_area : component_container.childNodes[1]
						,selected_value : component_container.childNodes[1].innerHTML
						,ul_options : component_container.childNodes[3]
					}
					self.components[ component_id ].selected_area.onclick = function()
					{
						self.closeOpened();
						self.openClicked( this.parentNode );
					}
					var lis = self.components[ component_id ].ul_options.getElementsByTagName("LI");
					for(var x = 0; x < lis.length; x++)
					{
						var li = lis[x];
						li.onclick = function()
						{
							self.setSelectedValue( this.parentNode.parentNode, this.innerHTML)
						}
					}
					var uls = self.components[ component_id ].ul_options.childNodes;
					for (lis in uls)
					{
						var li = uls[lis];
					}
				}
			}
		}
	}
	
	
	,utils : {
		us_states : {"AL": "Alabama","AK": "Alaska","AS": "American Samoa","AZ": "Arizona","AR": "Arkansas","CA": "California","CO": "Colorado","CT": "Connecticut","DE": "Delaware","DC": "District Of Columbia","FL": "Florida","GA": "Georgia","GU": "Guam","HI": "Hawaii","ID": "Idaho","IL": "Illinois","IN": "Indiana","IA": "Iowa","KS": "Kansas","KY": "Kentucky","LA": "Louisiana","ME": "Maine","MH": "Marshall Islands","MD": "Maryland","MA": "Massachusetts","MI": "Michigan","MN": "Minnesota","MS": "Mississippi","MO": "Missouri","MT": "Montana","NE": "Nebraska","NV": "Nevada","NH": "New Hampshire","NJ": "New Jersey","NM": "New Mexico","NY": "New York","NC": "North Carolina","ND": "North Dakota","MP": "Northern Mariana Islands","OH": "Ohio","OK": "Oklahoma","OR": "Oregon","PW": "Palau","PA": "Pennsylvania","PR": "Puerto Rico","RI": "Rhode Island","SC": "South Carolina","SD": "South Dakota","TN": "Tennessee","TX": "Texas","UT": "Utah","VT": "Vermont","VI": "Virgin Islands","VA": "Virginia","WA": "Washington","WV": "West Virginia","WI": "Wisconsin","WY": "Wyoming"}	
	}
	
	/*TITLE: Client-Side Request Object for javascript by Andrew Urquhart (UK) http://andrewu.co.uk/tools/request/manual/ VERSION: #1.41 2007-06-28 18:10 UTC*/
	,Request : new function ()
	{
	//function RObj(ea) {
		var LS	= "";
		var QS	= new Object();
		var un	= "undefined";
		var x	= null; // On platforms that understand the 'undefined' keyword replace 'null' with 'undefined' for maximum ASP-like behaviour.
		var f	= "function";
		var n	= "number";
		var r	= "string";
		var e1	= "ERROR: Index out of range in\r\nRequest.QueryString";
		var e2	= "ERROR: Wrong number of arguments or invalid property assignment\r\nRequest.QueryString";
		var e3	= "ERROR: Object doesn't support this property or method\r\nRequest.QueryString.Key";
		var dU	= window.decodeURIComponent ? 1 : 0;
	
		function Err(arg) {
			if (ea) {
				alert("Request Object:\r\n" + arg);
			}
		}
		function URID(t) {
			var d = "";
			if (t) {
				for (var i = 0; i < t.length; ++i) {
					var c = t.charAt(i);
					d += (c  ==  "+" ? " " : c);
				}
			}
			return (dU ? decodeURIComponent(d) : unescape(d));
		}
		function OL(o) {
			var l = 0;
			for (var i in o) {
				if (typeof o[i] != f) {
					l++;
				}
			}
			return l;
		}
		function AK(key) {
			var auk = true;
			for (var u in QS) {
				if (typeof QS[u] != f && u.toString().toLowerCase() == key.toLowerCase()) {
					auk = false;
					return u;
				}
			}
			if (auk) {
				QS[key] = new Object();
				QS[key].toString = function() {
					return TS(QS[key]);
				}
				QS[key].Count = function() {
					return OL(QS[key]);
				}
				QS[key].Count.toString = function() {
					return OL(QS[key]).toString();
				}
				QS[key].Item = function(e) {
					if (typeof e == un) {
						return QS[key];
					}
					else {
						if (typeof e == n) {
							var a = QS[key][Math.ceil(e)];
							if (typeof a == un) {
								Err(e1 + "(\"" + key + "\").Item(" + e + ")");
							}
							return a;
						}
						else {
							Err("ERROR: Expecting numeric input in\r\nRequest.QueryString(\"" + key + "\").Item(\"" + e + "\")");
						}
					}
				}
				QS[key].Item.toString = function(e) {
					if (typeof e == un) {
						return QS[key].toString();
					}
					else {
						var a = QS[key][e];
						if (typeof a == un) {
							Err(e1 + "(\"" + key + "\").Item(" + e + ")");
						}
						return a.toString();
					}
				}
				QS[key].Key = function(e) {
					var t = typeof e;
					if (t == r) {
						var a = QS[key][e];
						return (typeof a != un && a && a.toString() ? e : "");
					}
					else {
						Err(e3 + "(" + (e ? e : "") + ")");
					}
				}
				QS[key].Key.toString = function() {
					return x;
				}
			}
			return key;
		}
		function AVTK(key, val) {
			if (key != "") {
				var key = AK(key);
				var l = OL(QS[key]);
				QS[key][l + 1] = val;
			}
		}
		function TS(o) {
			var s = "";
			for (var i in o) {
				var ty = typeof o[i];
				if (ty == "object") {
					s += TS(o[i]);
				}
				else if (ty != f) {
					s += o[i] + ", ";
				}
			}
			var l = s.length;
			if (l > 1) {
				return (s.substring(0, l-2));
			}
			return (s == "" ? x : s);
		}
		function KM(k, o) {
			var k = k.toLowerCase();
			for (var u in o) {
				if (typeof o[u] != f && u.toString().toLowerCase() == k) {
					return u;
				}
			}
		}
		if (window.location && window.location.search) {
			LS = window.location.search;
			var l = LS.length;
			if (l > 0) {
				LS = LS.substring(1,l);
				var preAmpAt = 0;
				var ampAt = -1;
				var eqAt = -1;
				var k = 0;
				var skip = false;
				for (var i = 0; i < l; ++i) {
					var c = LS.charAt(i);

					if (LS.charAt(preAmpAt) == "=" || (preAmpAt == 0 && i == 0 && c == "=")) {
						skip=true;
					}
					if (c == "=" && eqAt == -1 && !skip) {
						eqAt=i;
					}
					if (c == "&" && ampAt == -1) {
						if (eqAt!=-1) {
							ampAt=i;
						}
						if (skip) {
							preAmpAt = i + 1;
						}
						skip = false;
					}
					if (ampAt>eqAt) {
						AVTK(URID(LS.substring(preAmpAt, eqAt)), URID(LS.substring(eqAt + 1, ampAt)));
						preAmpAt = ampAt + 1;
						eqAt = ampAt = -1;
						++k;
					}
				}
				if (LS.charAt(preAmpAt) != "=" && (preAmpAt != 0 || i != 0 || c != "=")) {
					if (preAmpAt != l) {
						if (eqAt != -1) {
							AVTK(URID(LS.substring(preAmpAt,eqAt)), URID(LS.substring(eqAt + 1,l)));
						}
						else if (preAmpAt != l - 1) {
							AVTK(URID(LS.substring(preAmpAt, l)), "");
						}
					}
					if (l == 1) {
						AVTK(LS.substring(0,1),"");
					}
				}
			}
		}
		var TC = OL(QS);
		if (!TC) {
			TC=0;
		}
		QS.toString = function() {
			return LS.toString();
		}
		QS.Count = function() {
			return (TC ? TC : 0);
		}
		QS.Count.toString = function() {
			return (TC ? TC.toString() : "0");
		}
		QS.Item = function(e) {
			if (typeof e == un) {
				return LS;
			}
			else {
				if (typeof e == n) {
					var e = Math.ceil(e);
					var c = 0;
					for (var i in QS) {
						if (typeof QS[i] != f && ++c == e) {
							return QS[i];
						}
					}
					Err(e1 + "().Item(" + e + ")");
				}
				else {
					return QS[KM(e, QS)];
				}
			}
			return x;
		}
		QS.Item.toString = function() {
			return LS.toString();
		}
		QS.Key = function(e) {
			var t = typeof e;
			if (t == n) {
				var e = Math.ceil(e);
				var c = 0;
				for (var i in QS) {
					if (typeof QS[i] != f && ++c == e) {
						return i;
					}
				}
			}
			else if (t == r) {
				var e = KM(e, QS);
				var a = QS[e];
				return (typeof a != un && a && a.toString() ? e : "");
			}
			else {
				Err(e2 + "().Key(" + (e ? e : "") + ")");
			}
			Err(e1 + "().Item(" + e + ")");
		}
		QS.Key.toString = function() {
			Err(e2 + "().Key");
		}
		this.QueryString = function(k) {
			if (typeof k == un) {
				return QS;
			}
			else {
				if (typeof k == n) {
					return QS.Item(k);
				}
				var k = KM(k, QS);
				if (typeof QS[k] == un) {
					t = new Object();
					t.Count = function() {
						return 0;
					}
					t.Count.toString = function() {
						return "0";
					}
					t.toString = function() {
						return x;
					}
					t.Item = function(e) {
						return x;
					}
					t.Item.toString = function() {
						return x;
					}
					t.Key = function(e) {
						Err(e3 + "(" + (e ? e : "") + ")");
					}
					t.Key.toString = function() {
						return x;
					}
					return t;
				}
				else {
					return QS[k];
				}
			}
		}
		this.QueryString.toString = function() {
			return LS.toString();
		}
		this.QueryString.Count = function() {
			return (TC ? TC : 0);
		}
		this.QueryString.Count.toString = function() {
			return (TC ? TC.toString() : "0");
		}
		this.QueryString.Item = function(e) {
			if (typeof e == un) {
				return LS.toString();
			}
			else {
				if (typeof e == n) {
					var e = Math.ceil(e);
					var c = 0;
					for (var i in QS) {
						if (typeof QS[i] != f && ++c == e) {
							return QS[i];
						}
					}
					Err(e1 + ".Item(" + e + ")");
				}
				else {
					return QS[KM(e, QS)];
				}
			}
			if (typeof e == n) {
				Err(e1 + ".Item(" + e + ")");
			}
			return x;
		}
		this.QueryString.Item.toString = function() {
			return LS.toString();
		}
		this.QueryString.Key = function(e) {
			var t = typeof e;
			if (t == n) {
				var e = Math.ceil(e);
				var c = 0;
				for (var i in QS) {
					if (typeof QS[i] == "object" && (++c == e)) {
						return i;
					}
				}
			}
			else if (t == r) {
				var e = KM(e, QS);
				var a = QS[e];
				return (typeof a != un && a && a.toString() ? e : "");
			}
			else {
				Err(e2 + ".Key(" + (e ? e : "") + ")");
			}
			Err(e1 + ".Item(" + e + ")");
		}
		this.QueryString.Key.toString = function() {
			Err(e2 + ".Key");
		}
		
		
		this.Version = 1.4;
		this.Author = "Andrew Urquhart (http://andrewu.co.uk)";
	}//var Request = new RObj(false);
	
	,$_GET : function(id){
			return CAIRS.Request.QueryString(id).Item(1);
	}
	
	,test : function()
	{
		//console.log("parent ok");	
	}
	
	/**
		@function init -  performs all the necessary tasks before let the user to use the CAIRS object
	*/
	,init : function(c)
	{
		var self = this;
		self.checkBrowserStuff(); // mandatory, first
		self.exposeForEach();
		
		if(typeof c !== 'undefined')
		{
			if(c.plugins)
			{
				
			}
		}
		
	}
};
window.onload = function()
{
	CAIRS.init();
};