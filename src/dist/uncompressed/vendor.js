/*
It functionality simplifies type checking.
 */
    /*! sprintf.js | Copyright (c) 2007-2013 Alexandru Marasteanu <hello at alexei dot ro> | 3 clause BSD license */
    (function(e) {
        function r(e) {
            return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
        }

        function i(e, t) {
            for (var n = []; t > 0; n[--t] = e);
            return n.join("")
        }
        var t = function() {
            return t.cache.hasOwnProperty(arguments[0]) || (t.cache[arguments[0]] = t.parse(arguments[0])), t.format.call(null, t.cache[arguments[0]], arguments)
        };
        t.format = function(e, n) {
            var s = 1,
                o = e.length,
                u = "",
                a, f = [],
                l, c, h, p, d, v;
            for (l = 0; l < o; l++) {
                u = r(e[l]);
                if (u === "string") f.push(e[l]);
                else if (u === "array") {
                    h = e[l];
                    if (h[2]) {
                        a = n[s];
                        for (c = 0; c < h[2].length; c++) {
                            if (!a.hasOwnProperty(h[2][c])) throw t('[sprintf] property "%s" does not exist', h[2][c]);
                            a = a[h[2][c]]
                        }
                    } else h[1] ? a = n[h[1]] : a = n[s++]; if (/[^s]/.test(h[8]) && r(a) != "number") throw t("[sprintf] expecting number but found %s", r(a));
                    switch (h[8]) {
                        case "b":
                            a = a.toString(2);
                            break;
                        case "c":
                            a = String.fromCharCode(a);
                            break;
                        case "d":
                            a = parseInt(a, 10);
                            break;
                        case "e":
                            a = h[7] ? a.toExponential(h[7]) : a.toExponential();
                            break;
                        case "f":
                            a = h[7] ? parseFloat(a).toFixed(h[7]) : parseFloat(a);
                            break;
                        case "o":
                            a = a.toString(8);
                            break;
                        case "s":
                            a = (a = String(a)) && h[7] ? a.substring(0, h[7]) : a;
                            break;
                        case "u":
                            a >>>= 0;
                            break;
                        case "x":
                            a = a.toString(16);
                            break;
                        case "X":
                            a = a.toString(16).toUpperCase()
                    }
                    a = /[def]/.test(h[8]) && h[3] && a >= 0 ? "+" + a : a, d = h[4] ? h[4] == "0" ? "0" : h[4].charAt(1) : " ", v = h[6] - String(a).length, p = h[6] ? i(d, v) : "", f.push(h[5] ? a + p : p + a)
                }
            }
            return f.join("")
        }, t.cache = {}, t.parse = function(e) {
            var t = e,
                n = [],
                r = [],
                i = 0;
            while (t) {
                if ((n = /^[^\x25]+/.exec(t)) !== null) r.push(n[0]);
                else if ((n = /^\x25{2}/.exec(t)) !== null) r.push("%");
                else {
                    if ((n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t)) === null) throw "[sprintf] huh?";
                    if (n[2]) {
                        i |= 1;
                        var s = [],
                            o = n[2],
                            u = [];
                        if ((u = /^([a-z_][a-z_\d]*)/i.exec(o)) === null) throw "[sprintf] huh?";
                        s.push(u[1]);
                        while ((o = o.substring(u[0].length)) !== "")
                            if ((u = /^\.([a-z_][a-z_\d]*)/i.exec(o)) !== null) s.push(u[1]);
                            else {
                                if ((u = /^\[(\d+)\]/.exec(o)) === null) throw "[sprintf] huh?";
                                s.push(u[1])
                            }
                        n[2] = s
                    } else i |= 2; if (i === 3) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                    r.push(n)
                }
                t = t.substring(n[0].length)
            }
            return r
        };
        var n = function(e, n, r) {
            return r = n.slice(0), r.splice(0, 0, e), t.apply(null, r)
        };
        e.sprintf = t, e.vsprintf = n
    })(typeof exports != "undefined" ? exports : window);

    var IS = (function() {

        this._null = function( a )
        {
            return ( a === null );
        };
        this._undefined = function( a )
        {
            return ( this._null( a ) || typeof a == 'undefined' || a === 'undefined' );
        };

        this._string = function ( a )
        {
            return ( ( a instanceof String || typeof a == 'string' ) && !this._undefined( a ) && !this._true( a ) && !this._false( a ) );
        };
        this._number = function( a )
        {
            return ( ( a instanceof Number || typeof a == 'number' ) && !isNaN( a ) );
        };
        this._boolean = function( a )
        {
            return ( a instanceof Boolean || typeof a == 'boolean' || this._true( a ) || this._false( a ) );
        };
        this._object = function( a )
        {
            return ( ( a instanceof Object || typeof a == 'object' ) && !this._null( a ) && !this._jquery( a ) && !this._array( a ) );
        };
        this._array = function ( a )
        {
            return ( a instanceof Array );
        };
        this._function = function( a )
        {
            return ( a instanceof Function || typeof a == 'function' );
        };

        this._jquery = function ( a )
        {
            return ( typeof jQuery != 'undefined' && a instanceof jQuery );
        };

        this._true = function( a )
        {
            return ( a === true || a === 'true' );
        };
        this._false = function( a )
        {
            return ( a === false || a === 'false' );
        };
        this._percentage = function( a )
        {
            return ( this._string( a ) && a.slice( -1 ) == '%' && this._number( parseInt( a.slice( 0, -1 ), 10 ) ) );
        };

        return this;
    })();

var IT = function(){
    // It class set.
    // 
    var self = this;
    this._value = undefined;

    /**
     * IT init method, accepting a value to wrap.
     * @param  {*} value Pass an object to determine it's value
     * @return {IT}       and instance of the IT 
     */
    var init = function(value) {
        return this.value(value);
    }

    /**
     * apply and return the value to be tested. This is optionally passed
     * through the instance reaction. This is a chained method.
     * value is optional. If a value is passed, `this` is returned, if no 
     * parameters are given, the existing value is returned
     */
    this.value = function(val) {

        if(val !== undefined) {
            this._value = val;
            return this;
        }

        return this._value || this;
    }

    this.data = function(val){
        
        if(val === undefined) {
            return this._value;
        }

        return this;
    }

    this.toString = function(){
        return this.data().toString()
    }

    /*
    Check an element is another type.
    typeString can be string of name type or type.toString
    
        it.is(typeString, value);

    typeString should be a string name of a basic type. 
    value should be your object.

    returned is a boolean.

        // Can accept string name for the type
        it.is('string', 'foo')
        // can accept cased types
        it.is('Boolean', false);
        // Can accept basic type
        it.is(Number, 1)
     */
    


    return init.apply(this, arguments);

}



var it = function(value) {
        /*
    return an IT(value) chain.
     */
    if(value === undefined) {
        return IT;
    }

    var _it = new IT(value);
    return _it;
}

function test(desc, b, c) {
    Test = function (desc, a, b){
        this.desc = desc;
        this.a = a;
        this.b = b;

        this.assert = function(a, b) {
            // Used passed values or inherit
            a = a || this.a;
            b = b || this.b;

            _test = a === b;

            test.tests.push([a,b], _test);
            if(_test === true) {
                t = "Success"
            } else {
                t = 'Fail   '
            } 

            this.printOut(t, _test);

            return _test;
        }

        this.printOut = function(msg, value){
            console.log(this.desc, msg)
        }

        if(this.a !== undefined && this.b !== undefined) {
            return this.assert()
        }
    };

    if(b !== undefined) {
        if( c !== undefined) {
            /* test(desc, b, c) - b === c */ 
            _test = new Test(desc, b, c)
        } else {
            /* test(a, b) - a === b */ 
            _test = new Test('', desc, b)
        }
    } else {
        /* test(a, b) - a === b */ 
        _test = new Test(desc)
    }

}

test.tests = [];


ItTestExt = function(name, type, value, expected) {
    /*
    Tests all types of extension.
     */
    var tn =  type.name || name;
    var s = function(st) {
        return sprintf(st, { 
            name: name, 
            type: type, 
            value: value,
            tn: tn
        });
    }
    console.log("+ Testing", tn, typeof(value), 'against', value, 'expecting', expected)

    test( s('    it.%(name)s( %(tn)s , %(value)s )'),
        it.is( type, value ), expected);
    test( s('    IT.%(name)s( %(tn)s , %(value)s )'),
        IT.is( type, value ), expected);
    test( s('  it().%(name)s( %(tn)s , %(value)s )'),
      it().is( type, value ), expected);
    test( s('  (IT).%(name)s( %(tn)s , %(value)s )'),
      (IT).is( type, value ), expected);
    test( s('  it(%(value)s).%(name)s( %(tn)s )'),
      it(value).is(type), expected);
}
  
IT.implement = function(name, func){
    it[name] = function(){
        return func.apply(IT, arguments)
    }

    IT.prototype[name] = function(typeString, value) {
        var val = this.value() || value;
        return func(typeString, val);
    }

    IT[name] = it[name];
    
    return 
    ItTestExt(name, String, 'Foo', true);
    ItTestExt(name, String, 1, false);
    ItTestExt(name, Number, 1, true);
    ItTestExt(name, Number, 'Foo', false);
}

/*
    Tests the value against the type, returning true or false 
    if the value is the same.

    use the primitive or string representation of as the type string:

        it.is('Array', []) == true
        it.is(Array, [])   == true
 */
IT.implement('is', function(typeString, value) {
    
    if (value === undefined) {
        console.warn('IT.is type checking against an undefined value');
    }

    if(typeString === undefined && value === undefined) return undefined;
    
    var typeName;
    if( typeString.hasOwnProperty('name') ) {
        typeName = typeString.name.toLowerCase();
    } else {
        typeName = String(typeString).toLowerCase();
    }

    if(IS.hasOwnProperty('_' + typeName)) {
        return IS['_' + typeName](value);
    }
    // console.log('is', typeName, value)
    return false;
});

/*
    Can check for a key in an object

        var obj = {
            bar: 'apples'
        }
        it.has('bar', obj)   == true;
    
    Can check for an entity in an array

        var arr = ['george', 'huxely', 'will']
        it.has('will', arr)  == true;
    
    Can check string types:
    
        var str = 'The worlds tallest colour!'
        it.has('world', str) == true;

 */
IT.implement('has', function(typeString, value){
    var val = it(value)

    if( val.is(Object) ) {
        return value.hasOwnProperty(typeString);
    } else if( val.is(Array) || val.is(String) ) {
        return value.indexOf(typeString) > -1;
    }
});;//https://github.com/malko/l.js
;(function(window, undefined){
/*
* script for js/css parallel loading with dependancies management
* @author Jonathan Gotti < jgotti at jgotti dot net >
* @licence dual licence mit / gpl
* @since 2012-04-12
* @todo add prefetching using text/cache for js files
* @changelog
*            - 2014-06-26 - bugfix in css loaded check when hashbang is used
*            - 2014-05-25 - fallback support rewrite + null id bug correction + minification work
*            - 2014-05-21 - add cdn fallback support with hashbang url
*            - 2014-05-22 - add support for relative paths for stylesheets in checkLoaded
*            - 2014-05-21 - add support for relative paths for scripts in checkLoaded
*            - 2013-01-25 - add parrallel loading inside single load call
*            - 2012-06-29 - some minifier optimisations
*            - 2012-04-20 - now sharp part of url will be used as tag id
*                         - add options for checking already loaded scripts at load time
*            - 2012-04-19 - add addAliases method
* @note coding style is implied by the target usage of this script not my habbits
*/
	/** gEval credits goes to my javascript idol John Resig, this is a simplified jQuery.globalEval */
	var gEval = function(js){ ( window.execScript || function(js){ window[ "eval" ].call(window,js);} )(js); }
		, isA =  function(a,b){ return a instanceof (b || Array);}
		//-- some minifier optimisation
		, D = document
		, getElementsByTagName = 'getElementsByTagName'
		, length = 'length'
		, readyState = 'readyState'
		, onreadystatechange = 'onreadystatechange'
		//-- get the current script tag for further evaluation of it's eventual content
		, scripts = D[getElementsByTagName]("script")
		, scriptTag = scripts[scripts[length]-1]
		, script  = scriptTag.innerHTML.replace(/^\s+|\s+$/g,'')
	;
	//avoid multiple inclusion to override current loader but allow tag content evaluation
	if( ! window.ljs ){
		var checkLoaded = scriptTag.src.match(/checkLoaded/)?1:0
			//-- keep trace of header as we will make multiple access to it
			,header  = D[getElementsByTagName]("head")[0] || D.documentElement
			, urlParse = function(url){
				var parts={}; // u => url, i => id, f = fallback
				parts.u = url.replace(/#(=)?([^#]*)?/g,function(m,a,b){ parts[a?'f':'i'] = b; return '';});
				return parts;
			}
			,appendElmt = function(type,attrs,cb){
				var e = D.createElement(type), i;
				if( cb ){ //-- this is not intended to be used for link
					if(e[readyState]){
						e[onreadystatechange] = function(){
							if (e[readyState] === "loaded" || e[readyState] === "complete"){
								e[onreadystatechange] = null;
								cb();
							}
						};
					}else{
						e.onload = cb;
					}
				}
				for( i in attrs ){ attrs[i] && (e[i]=attrs[i]); }
				header.appendChild(e);
				// return e; // unused at this time so drop it
			}
			,load = function(url,cb){
				if( this.aliases && this.aliases[url] ){
					var args = this.aliases[url].slice(0);
					isA(args) || (args=[args]);
					cb && args.push(cb);
					return this.load.apply(this,args);
				}
				if( isA(url) ){ // parallelized request
					for( var l=url[length]; l--;){
						this.load(url[l]);
					}
					cb && url.push(cb); // relaunch the dependancie queue
					return this.load.apply(this,url);
				}
				if( url.match(/\.css\b/) ){
					return this.loadcss(url,cb);
				}
				return this.loadjs(url,cb);
			}
			,loaded = {}  // will handle already loaded urls
			,loader  = {
				aliases:{}
				,loadjs: function(url,cb){
					var parts = urlParse(url);
					url = parts.u;
					if( loaded[url] === true ){ // already loaded exec cb if any
						cb && cb();
						return this;
					}else if( loaded[url]!== undefined ){ // already asked for loading we append callback if any else return
						if( cb ){
							loaded[url] = (function(ocb,cb){ return function(){ ocb && ocb(); cb && cb(); }; })(loaded[url],cb);
						}
						return this;
					}
					// first time we ask this script
					loaded[url] = (function(cb){ return function(){loaded[url]=true; cb && cb();};})(cb);
					cb = function(){ loaded[url](); };
					appendElmt('script',{type:'text/javascript',src:url,id:parts.i,onerror:function(error){
						if( parts.f ){
							var c = error.currentTarget;
							c.parentNode.removeChild(c);
							appendElmt('script',{type:'text/javascript',src:parts.f,id:parts.i},cb);
						}
					}},cb);
					return this;
				}
				,loadcss: function(url,cb){
					var parts = urlParse(url);
					url = parts.u;
					loaded[url] || appendElmt('link',{type:'text/css',rel:'stylesheet',href:url,id:parts.i});
					loaded[url] = true;
					cb && cb();
					return this;
				}
				,load: function(){
					var argv=arguments,argc = argv[length];
					if( argc === 1 && isA(argv[0],Function) ){
						argv[0]();
						return this;
					}
					load.call(this,argv[0], argc <= 1 ? undefined : function(){ loader.load.apply(loader,[].slice.call(argv,1));} );
					return this;
				}
				,addAliases:function(aliases){
					for(var i in aliases ){
						this.aliases[i]= isA(aliases[i]) ? aliases[i].slice(0) : aliases[i];
					}
					return this;
				}
			}
		;
		if( checkLoaded ){
			var i,l,links,url;
			for(i=0,l=scripts[length];i<l;i++){
				(url = scripts[i].getAttribute('src')) && (loaded[url.replace(/#.*$/,'')] = true);
			}
			links = D[getElementsByTagName]('link');
			for(i=0,l=links[length];i<l;i++){
				(links[i].rel==='stylesheet' || links[i].type==='text/css') && (loaded[links[i].getAttribute('href').replace(/#.*$/,'')]=true);
			}
		}
		//export ljs
		window.ljs = loader;
		// eval inside tag code if any
	}
	script && gEval(script);
})(window);
