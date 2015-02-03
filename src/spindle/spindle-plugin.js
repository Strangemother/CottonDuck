;(function(config){
	'use strict'

	var listen = window['addEventListener'] ? window.addEventListener: window.attachEvent
		, core
		, spindle
		, utils
		, space
		;

	var main = function(){
		listen('spindle:' + config.name, function(event){
			core = event.detail.namespace;
			spindle = event.detail.spindle;
			utils = event.detail.utls;
			space = core[config.space]
			run();
		});

		// instansiate code
		ask();
	}


	var ask = function(){
		// prepare code
		window.dispatchEvent(
			new CustomEvent('spindle:get', {
				detail: {
					name: config.name
					, space: config.space
				}
			})
		);
	};

	var run = function() {
		// hook code
		core.path = StrTools.path

	 	space.load = function(){
	 		return ljs.load.apply(ljs, arguments)
	 	}

	 	space.aliasLoad = function(){
	 		return ljs.load.apply(ljs, arguments)
	 	}

	 	/*
	 	Perform a load relative from the script localtion.
	 	If a script tag is passed, the attributes are parsed to determin
	 	the end path relative location. The path is prepended to the string
	 	assets to load the assets from a relative location from the
	 	src script.

		 	script = <script src="../src/cotton/cotton.js"></script>

		 	relativeLoad(script, 'components/cotton.canvas.js')
		 	// ../src/cotton/cotton.canvas.js
	 	 */
	 	space.relativeLoad = function(script, assets, callback) {
	 		var path = script;
	 		var liveLoad;

	 		if( it(script).is('string') == false && script.src !== false ) {
	 			// HTMLElement
	 			path = script.src
	 		}//else if( it(script).is('string') ) {
	 			//path = script;
	 		//}

	 		// get path
	 		var ia = it(assets);
	 		var dn = core.path.dirname(path);

	 		if( ia.is('string') ) {
	 			var uri = core.path.join([dn, assets ])
	 			liveLoad = uri
	 		}

	 		if( ia.is('array') ) {
	 			for (var i = assets.length - 1; i >= 0; i--) {
	 				assets[i] = core.path.join(dn, assets[i])
	 			};
	 			liveLoad = assets;
	 		}

	 		// strip end file
	 		return space.load(liveLoad, callback)
	 		// loop assets
	 		// prepend file path
	 	}

	 	core.ready(ready);
	 	// core.init()
	};

	var ready = function(){
		// run code
	 	// console.log('Ready', config.name);
	}

	var StrTools = {
		path: {}
	}

// STR Tools
	/**
	 * Returns the final component of a pathname.
	 * See http://docs.python.org/library/os.path.html#os.path.basename
	 * @param {string} path A pathname.
	 * @return {string} path The final component of a pathname, i.e. everything
	 *     after the final slash.
	 */
	StrTools.path.baseName = function(path) {
	  var i = path.lastIndexOf('/') + 1;
	  return path.slice(i);
	};


	/**
	 * Alias to StrTools.path.baseName.
	 * @param {string} path A pathname.
	 * @return {string} path The final component of a pathname.
	 * @deprecated Use StrTools.path.baseName.
	 */
	StrTools.path.basename = StrTools.path.baseName;


	/**
	 * Returns the directory component of a pathname.
	 * See http://docs.python.org/library/os.path.html#os.path.dirname
	 * @param {string} path A pathname.
	 * @return {string} The directory component of a pathname, i.e. everything
	 *     leading up to the final slash.
	 */
	StrTools.path.dirname = function(path) {
	  var i = path.lastIndexOf('/') + 1;
	  var head = path.slice(0, i);
	  // If the path isn't all forward slashes, trim the trailing slashes.
	  if (!/^\/+$/.test(head)) {
	    head = head.replace(/\/+$/, '');
	  }
	  return head;
	};


	/**
	 * Extracts the extension part of a pathname.
	 * @param {string} path The path name to process.
	 * @return {string} The extension if any, otherwise the empty string.
	 */
	StrTools.path.extension = function(path) {
	  var separator = '.';
	  // Combining all adjacent periods in the basename to a single period.
	  var baseName = StrTools.path.baseName(path).replace(/\.+/g, separator);
	  var separatorIndex = baseName.lastIndexOf(separator);
	  return separatorIndex <= 0 ? '' : baseName.substr(separatorIndex + 1);
	};


	/**
	 * Joins one or more path components (e.g. 'foo/' and 'bar' make 'foo/bar').
	 * An absolute component will discard all previous component.
	 * See http://docs.python.org/library/os.path.html#os.path.join
	 * @param {...string} var_args One of more path components.
	 * @return {string} The path components joined.
	 */
	StrTools.path.join = function(var_args) {
	  var path = arguments[0];

	  for (var i = 1; i < arguments.length; i++) {
	    var arg = arguments[i];
	    if (StrTools.path.startsWith(arg, '/')) {
	      path = arg;
	    } else if (path == '' || StrTools.path.endsWith(path, '/')) {
	      path += arg;
	    } else {
	      path += '/' + arg;
	    }
	  }

	  return path;
	};

	/**
	 * Fast suffix-checker.
	 * @param {string} str The string to check.
	 * @param {string} suffix A string to look for at the end of {@code str}.
	 * @return {boolean} True if {@code str} ends with {@code suffix}.
	 */
	StrTools.path.endsWith = function(str, suffix) {
	  var l = str.length - suffix.length;
	  return l >= 0 && str.indexOf(suffix, l) == l;
	};

	StrTools.path.startsWith = function(str, prefix) {
	  return str.lastIndexOf(prefix, 0) == 0;
	};
	/**
	 * Normalizes a pathname by collapsing duplicate separators, parent directory
	 * references ('..'), and current directory references ('.').
	 * See http://docs.python.org/library/os.path.html#os.path.normpath
	 * @param {string} path One or more path components.
	 * @return {string} The path after normalization.
	 */
	StrTools.path.normalizePath = function(path) {
	  if (path == '') {
	    return '.';
	  }

	  var initialSlashes = '';
	  // POSIX will keep two slashes, but three or more will be collapsed to one.
	  if (StrTools.path.startsWith(path, '/')) {
	    initialSlashes = '/';
	    if (StrTools.path.startsWith(path, '//') &&
	        !StrTools.path.startsWith(path, '///')) {
	      initialSlashes = '//';
	    }
	  }

	  var parts = path.split('/');
	  var newParts = [];

	  for (var i = 0; i < parts.length; i++) {
	    var part = parts[i];

	    // '' and '.' don't change the directory, ignore.
	    if (part == '' || part == '.') {
	      continue;
	    }

	    // A '..' should pop a directory unless this is not an absolute path and
	    // we're at the root, or we've travelled upwards relatively in the last
	    // iteration.
	    if (part != '..' ||
	        (!initialSlashes && !newParts.length) ||
	        goog.array.peek(newParts) == '..') {
	      newParts.push(part);
	    } else {
	      newParts.pop();
	    }
	  }

	  var returnPath = initialSlashes + newParts.join('/');
	  return returnPath || '.';
	};


	/**
	 * Splits a pathname into "dirname" and "baseName" components, where "baseName"
	 * is everything after the final slash. Either part may return an empty string.
	 * See http://docs.python.org/library/os.path.html#os.path.split
	 * @param {string} path A pathname.
	 * @return {!Array.<string>} An array of [dirname, basename].
	 */
	StrTools.path.split = function(path) {
	  var head = StrTools.path.dirname(path);
	  var tail = StrTools.path.baseName(path);
	  return [head, tail];
	};


   main();
}).call(window, {
	name: 'plugin'
	, space: 'load'
})

