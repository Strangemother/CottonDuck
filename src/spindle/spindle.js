
/*
# Spindle

The spindle is a configurable component. Designed to manage and care
for many objects booting with a global configuration. The assets are preloaded and
a ready event is fired through the bowser.

Options can be passed through HTML data attributes of the running script tag.

 // Boot cotton duck, adding to the dataset upon config :)

 	<script src="spindle.js" data-namespace='Foo' type="text/javascript" charset="utf-8"></script>

 */
(function Spindle(_w, _c) {
	"use-strict";

	/* Pick up the last script booted (me) */
	var scripts = document.getElementsByTagName("script");

	// Parse the special data to configure Cotton.
	var script = scripts[scripts.length - 1];

	// Placeholder will be populated with the inbound configurations.
  	var configuration = _c;

  	// Final namespace placeholder to store the building
  	// object prior to execution.
  	var namespace = {
  		// True when the build() method is performed.
  		built: false
  	};

  	var utils = {};
  	var spindle = {};

  	utils.sprintf = (function(){
  		var s = _w['sprintf'] || window['sprintf'];
  		return s;
  	})();

  	utils.it = (function(){
  		var s = _w['it'] || window['it'];
  		return s;
  	})();

  	utils.addEvent = function(name, method){
  		// If a name is an array the event is
  		// sent as each name.
  		// (window['addEventListener'] ? window.addEventListener: window.attachEvent)
  		var p 			= configuration.parent || _w
  			, _add 		= p['addEventListener'] ? p.addEventListener: p.attachEvent
  			, retEvs 	= []
  			;

  		// console.log("addEvent", name);
  		if( !it(name).is('array') ) {
  			name = [name]
  		}


  		for (var i = name.length - 1; i >= 0; i--) {
  			var _name = name[i];
  			retEvs.push(_add(_name, method, true, true) );
  		};

  		return retEvs
  	};

  	utils.dispatchEvent = function(eventName, data) {
  		// Pass an array to the eventName to dispatch
  		// the event many times as the event name.
  		var ev;
  		var name = eventName
  		if( !it(eventName).is('array') ) {
  			name = [eventName];
  		}


  		for (var i = name.length - 1; i >= 0; i--) {
  			var _name = name[i];
  			// console.log('dispatchEvent', _name);
	  		try {
				ev = new CustomEvent(_name, data);
				_w.dispatchEvent( ev );
	  		} catch(e) {}
	  	}
  	};

  	utils.removeEvent = function(eventName, listener){
  		// Dispach an event for signals of action.
  		var p = configuration.parent || _w;
  		listener = listener || utils.eventReceiver;

		p.removeEventListener(eventName, listener, true, true)
  		// console.log('removeEvent', eventName)
  	};

  	utils.randomString = function(){
		return Number(String( Math.random() ).replace('.', +(new Date) ) ).toString(36)
	};

  	utils.dispatchFrameworkEvent = function(name, d) {
  		/*
		Implement the internal addEvent here rather than the
		default to assist with IE cross compatability.

			dispatchFrameworkEvent('ready', namespace);

		 */
		var eventName = configuration.namespace + ':' + name;
		var wildName = '*:' + name;


		d = d || {};
		// Dispach an event for signals of action.
		d[configuration.namespace] = namespace;
		d['namespace'] = configuration.namespace;
		utils.addEvent([eventName, wildName], utils.eventReceiver);

		utils.dispatchEvent([eventName, wildName], { detail: d });
  	};

  	utils.listenOn = function(name, method){
		var eventName = configuration.namespace + ':' + name;
  		return utils.addEvent(eventName, method);
	};

  	utils.readyHook = function(config){

		if(config.readyhook || config.readyhook !== null ) {
			var hookType = typeof config.readyhook;

			if( hookType == 'string') {
				hook = _w[config.readyhook];

				if( hook === undefined ) {
					throw new Error('readyhook \'' + config.readyhook + '\' is not defined within the accessible namespace')
				}
			} else if(hookType == 'function' ) {
				hook = config.readyhook;
			}

		};

		return hook;
  	};

	/*
	 The initial function to boot
	 When ready
	 */
	utils.init = function init(_window, conf){
		// Get the arguments from the passed values - or try default to the
		// namespace
		if( conf === undefined ) {
			conf = _window
			_window = _w;
		}
		_window = _window || _w;
		var config = utils.extend({}, _c,  conf || {});

		console.log("Spin " + config.namespace);

		// pick up the initial config object and store it locally.
		configuration = namespace.getConfig(config);

		namespace.inited = true;

		// only auto build is allowed to boot initially.
		if( configuration.build && !namespace.building ) {
			// build and execute.
			utils.build( _window, config);
			utils.execute(/* configuration */);
		}

		return namespace
	};

	/*
	 Initialize the builder tool; generating the namespace object and
	 initializing a wait for final configurations before boot and execute
	 build requires a parent object and a conf object.
	 */
	utils.build = function build(parent, conf){

		// If we're already building and not built,
		// there is no need to call the method.
		if(namespace.building && !namespace.built) return true;
		namespace.building = true;

		if( !namespace.inited ) {
			utils.init();
		}

		var config = utils.extend(configuration, conf);

		// console.log('Build Cotton');
		/*
		It's okay to push this back into the parent as it's null.
		 */
		config.parent = (config.parent === null || config.parent === undefined) ? parent: config.parent;

		// push the namespace into the parent; defined as
		// the namespace string provided.
		config.parent[config.namespace] = namespace;

		// write the name into the namespace.
		namespace['namespace'] = config.namespace;
		namespace.built = true;

		return namespace;
	};

	utils.execute = function execute(conf) {

		if( !namespace.built ) {
			// time to execute - you build now!
			utils.build( namespace.parent || _w, conf );
		}

		var config = utils.extend(configuration, conf);

		// Fail check
		if( !namespace.built ) {
			throw new Error( namespace.namespace + ' cannot build.');
			return false;
		}
		namespace.building = false;
		utils.dispatchFrameworkEvent('ready')

		if( configuration.cleanup ) {
			utils.listenOn('cleanup', utils.cleanup);
			utils.dispatchFrameworkEvent('cleanup')
		};
	};

	utils.waitOnExecute = function waitOnExecute(conf) {
		/*
		 Wait on execute provide a spy on all active methods.
		 An active method; is a method of which needs the framework
		 to be ready before the method runs.
		 If you had a `init` method; of which required other parts of
		 the framework to run. Rather than instantly executing the
		 framework build (therefore removing the ability to
		 pre configure); you can wait on the method to be used.
		 Therefore your method can run lately and adhere to pre configuration
		 routines.
		 */
		var config = utils.extend(configuration, conf)
			, prop, v
			, c = config.waitOn || {}
			, scope = this
			, originalFunction
			;

		var injectFunction = function(){
			if( utils.shouldExecute() ) {
				namespace.execute( config )
			};

			console.log("waitOn execution took place", prop);
			var originalPropVal = namespace[prop].apply(scope, arguments);
			// Now reapply the very original once the
			// waitOn has occured.
			namespace[prop] = originalFunction;
		}

		for( prop in c ) {
			if( c.hasOwnProperty(prop) ) {
				v = c[prop];
				originalFunction = namespace[prop];
				console.log('wait on', v, namespace);
				namespace[prop] = injectFunction;
			}
		}
	};

  	utils.eventReceiver = function(ev, listener, useCapture, wasUntrusted) {
		// this listens to the same event, ensuring it's run.
		// console.log("Internal Event", ev.type);
		utils.removeEvent(ev.type, utils.eventReceiver);
  	};

  	utils.finalExecution = function(config){
  		config = config || configuration;

		var hook = function(n){ return n}
			, d = {
				chain: utils.nextExecution
			}, event
			;

		utils.dispatchFrameworkEvent('chain', d);

  		hook = utils.readyHook(config)

		// The hook is called. Albeit an internal readyhook
		// or a user defined. In each case, a namespace (The precotton
		// build) and a convenient config.
		// The config can be passed back and it will be merged.
		// The config is reference to the main configurations.
		// The config can still be referenced via PreCotton.getConfig()
		//
		var _h = hook(namespace, config);
		return _h;
  	};

  	/*
  	determine if the execution is ready based upon the current build state.
  	 */
  	utils.shouldExecute = function(config){
  		config = config || configuration;

  		return (config.build === true
  				&& namespace.building != true
  				&& namespace.built === false);
  	};

  	utils.chainScope = function(name, chainMethod, conf){
  		// Provide a scope for a new chained method to be implemented into
  		// the spindle. By applying the scope, it allows the
  		// new chain plugin to implement root methods to a naturally
  		// scoped object - making it easier to maintain a cleaner root
  		// object.
  		//
  		//     scope = new utils.chainScope();

  		var scope = {};
  		// mutate the main namespace, making a new root entity based upon the
  		// name provided.
  		//

  		if(namespace[name] === undefined) {
  			namespace[name] = scope;
  		} else {
  			utils.extend(namespace[name], scope);
  		}

  		return scope;
  	};

  	utils.nextExecution = function(name, chainMethod, conf){
  		// Chain a conf for easy reading.
  		// A method to be returned for chaining additional methods.
  		//

  		if(chainMethod === undefined) {
  			// wait for setup.
  			//
  			var config = namespace.getConfig()
  				;

  			/*
  			 Application loadout has finished.
  			 If all configurations have been performed,
  			 the app is ready to build.
  			 The next step is to `execute`
  			 */
  			var _h = utils.finalExecution();

  			// Merge any changes the user has made
  			// to the confgiuration by returning
  			// an object.
  			if( typeof _h == 'object') {
  				config = config.extend(config, _h);
  			};

  			if( utils.shouldExecute() && configuration.waitOn.length == 0) {
  				/*
  				 The readyhook has run; the user has made their configurations.
  				 The build has not been user executed and we're not currently in some
  				 wierd boot procedure.
  				 Proceed with the auto execute. If the user wanted to stop the boot.
  				 They should have defined it by now.
  				 */
  				console.log('Auto execute.');
  				namespace.execute()
  			};
  		} else {
  			utils.rootImplement(name, chainMethod, conf);
  		}

  		return utils.nextExecution;
  	};

  	utils.rootImplement = function(name, chainMethod, conf) {
		// console.log('Implementing', name);
		// Execute the chain method
		if(conf !== undefined) configuration = utils.extend(configuration, conf);
		var scope = new utils.chainScope(name, chainMethod, conf);
		utils.dispatchFrameworkEvent('implementing', name)
		var chain = chainMethod.call(scope, namespace, utils.nextExecution, configuration, scope);
		utils.dispatchFrameworkEvent('implemented', name);
		return chain
  	};

	utils.clone = function clone(obj) {
		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;

		// Handle Date
		if (obj instanceof Date) {
		    var copy = new Date();
		    copy.setTime(obj.getTime());
		    return copy;
		}

		// Handle Array
		if (obj instanceof Array) {
		    var copy = [];
		    for (var i = 0, len = obj.length; i < len; i++) {
		        copy[i] = utils.clone(obj[i]);
		    }
		    return copy;
		}

		// Handle Object
		if (obj instanceof Object) {
		    var copy = {};
		    for (var attr in obj) {
		        if (obj.hasOwnProperty(attr)) copy[attr] = utils.clone(obj[attr]);
		    }
		    return copy;
		}

		throw new Error("Unable to copy obj! Its type isn't supported.");
	};

	utils.extend = function extend(obj, node) {
		var nodeFunction = function(obj, source, prop) {
			// Some specials to facilitate loading of objects.
			if( prop == 'waitOn') {
				// Concat the array
				//
				// The destination object [prop] is =
				// 	it's original array (or a new on); + the old array
				var v = source[prop];

				if( !utils.it(source[prop]).is('array') ) {
					v = [source[prop]];
				}

				obj[prop] = (obj[prop] || []);
				var i, _v;
				for (i = 0; i < v.length; i++) {
					_v = v[i];
					if( obj[prop].indexOf(_v) == -1)  {
						obj[prop].push(_v)
					};
				};
			} else {
				// Naturally pass the property
				obj[prop] = source[prop];
			}
		};

		var objects = Array.prototype.slice.call(arguments, 0);

		return utils.noder(nodeFunction, objects);
	};

	/*
	 Itterate though two objects with the object of inheritence (right to left.)
	 passing a node method can implement a callback for every override to provide.
	 You can inject smarter methods.
	 By default source<B>(provides) obj<A>(receive) the attribute of prop(string) obj[prop]
	 */
	utils.noder = function(node, objects){

		node = node || function(obj, source, prop){ return obj[prop] = source[prop]}
		/*
		IE8 Polyfill
		 */
		if (!Array.prototype.forEach)
		{
		  Array.prototype.forEach = function(fun /*, thisArg */)
		  {
		    "use strict";

		    if (this === void 0 || this === null)
		      throw new TypeError();

		    var t = Object(this);
		    var len = t.length >>> 0;
		    if (typeof fun !== "function")
		      throw new TypeError();

		    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		    for (var i = 0; i < len; i++)
		    {
		      if (i in t)
		        fun.call(thisArg, t[i], i, t);
		    }
		  };
		}

		// The object to push all the other properties into.
	    var obj = objects[0];

	    Array.prototype.slice.call(objects, 1).forEach(function(source) {
	        if (source) {
	            for (var prop in source) {
	                if (source[prop]
	                	&& source[prop].constructor
	                	&& source[prop].constructor === Object) {

	                    if (!obj[prop] || obj[prop].constructor === Object) {
	                        obj[prop] = obj[prop] || {};
	                        utils.extend(obj[prop], source[prop], node);
	                    } else {
	                        // v;
	                        node(obj, source, prop)
	                    }

	                } else {
	                    // obj[prop] = source[prop];
	                    node(obj, source, prop)
	                }
	            }
	        }
	    });
	    return obj;
	}

	utils.makeup = function(space, conf, utilSet){
		var space = space || namespace
			, config = utils.extend({}, utils.originalConfiguration, conf)
			, utilSet = utilSet || utils
			;

		space = (function SpindleSpace(space, conf, utils){
			space.init			= utilSet.init;
			space.inited		= utilSet.inited;
			space.build			= utilSet.build;
			space.building		= utilSet.building;
			space.built			= utilSet.built;
			space.execute		= utilSet.execute;
			space.waitOnExecute	= utilSet.waitOnExecute;
			space._conf = conf;
			return space;
		}).apply({}, [space, config, utilSet])


		return space
	}

	utils.cleanup = function(e) {
		var space = configuration.namespace
		var _Cotton = e.detail[space];

		// Should never need to start the Framework again
		delete _Cotton.init;
		// The fact the framework has built is self evident.
		// A quacking duck does not need to prove it is a duck.
		delete _Cotton.inited;
		// if it's build; reglardless of the status. It is built.
		delete _Cotton.building;
		//delete _Cotton.built;
		// No need to rebuild
		delete _Cotton.build;
		// No need to execute
		delete _Cotton.execute;
		// Nothing to execute.
		delete _Cotton.waitOnExecute;
	}

	namespace.getUtil = function(){
		return utils;
	}

	namespace.getConfig = function getConfig(configure) {

		if(configure === undefined) {
			// Nothing has been passed to the method;
			// therefore return the entire item for chaining.
			c = {}
		} else if (typeof configure === 'string') {
			// Only return the variable if a string is
			// passed.
			c = {}
		} else {
			c = configure;
		}


		var config = utils.extend({}, configuration,  utils.clone(c) );

		var dataAttr, val;

		for( dataAttr in script.dataset ) {
			val = script.dataset[dataAttr];
			if(val == 'false') {
				val = false;
			}else if(val == 'true') {
				val = true;
			} else if( val == 'undefined') {
				val = undefined;
			} else if( val == 'null' ) {
				val = null;
			} else if( val == '{}' || val.toLowerCase() == 'object') {
				val = {}
			}

			config[dataAttr] = val;
		}

		if(configure === undefined) {
			// Nothing has been passed to the method;
			// therefore return the entire item for chaining.
			return config;
		} else if (typeof configure === 'string') {
			// Only return the variable if a string is
			// passed.
			return config[configure]
		}

		return config;
	}


	/**
	 * Set the configuration for the final object. Pass a key, value pair
	 * or an object with the values defined.
	 * Values will be overidden.
	 * Returned is the finished configuration object.
	 *
	 * @param {[String|Object]} key   Key name for the config value
	 * @param {{*|undefined}} value Value of the key for the object.
	 *                        this can be ignored if the `key` was an object.
	 */
	namespace.setConfig = function(key, value) {
		if(arguments.length == 2) {
			configuration[key] = value;
		} else if(arguments.length == 1
			&& it(key).is('object') ) {
			configuration = utils.extend(configuration, key);
		};

		return namespace.getConfig()
	}

	/**
	 * Provide a function to call when the framework is ready and all executions
	 * have occured to use the evented plugins.
	 * @param  {Function} func Function to be called when the framework is ready
	 * @return {undefined}      nothing returned.
	 */
	var readyCallbacks;
	namespace.ready = function( func ){
		// The function is passed to a list of functions of which wait on
		// the Cotton:ready event. If this has alreadfy occured; the method
		// is called and not appended to the chain.

		if( namespace.built === true) {
			// framework is ready; run the method.
			return func( namespace );
		}

		if( !readyCallbacks ) {
			// console.log('Ready wait?', callbacks)
			// add a listener for the ready event, this only occurs once.
			utils.addEvent('*:ready', function(event) {
				// Loop the entire list of callbacks, calling each one - passing
				// Cotton
				for (var i = readyCallbacks.length - 1; i >= 0; i--) {
					var cb = readyCallbacks[i];
					cb( namespace );
				};
			});

			readyCallbacks=[];
		}
		readyCallbacks.push(func);
	}

	spindle.readyReactions = function(){
		var c = namespace.getConfig()
		var name = c.namespace.toLowerCase();

		/*
		 Using events, a new entity can request Spindle.
		 dispatched is the event Spindle:[requester]

		 	window.dispatchEvent(
		 		new CustomEvent('spindle:get', {
		 			detail: {
		 				name: 'apples'
		 			}
		 		})
		 	)

		 */
		utils.addEvent(name + ':get', function(event){
			if(event.detail && event.detail.name ) {
				spindle.dispatchEvent(name + ':' + event.detail.name)
			} else {
				spindle.dispatchEvent(name)
			}
		})
	}

	spindle.getScript = function(){
		return script
	}
	/*
	 Dispatch a Spindle event
	 */
	spindle.dispatchEvent = function(name, data){
		utils.dispatchEvent(name, {
			detail: utils.extend({
				namespace: namespace
				, spindle: spindle
				, utils: utils
			}, data || {})
		});
	}

	utils.makeup();
	spindle.readyReactions()
	// utils.originalConfiguration = utils.clone(configuration)
	return utils.nextExecution;
})(this, {

	// Boolean - Should the cotton exist within the global namespace.
	/*
	 The global namespace of which Cotton will live in.
	 Change this if another application conflicts with
	 */
	namespace: 'Spindle'

	/*
	 Build automatically; making the namespace and pushing it's content
	 into the Cotton namespace. Perhaps you wish to wait and perform this
	 manually. The build sequence creates the namespace. Therefore before
	 this executes, Cotton will not exist.
	 By default this is true.
	 */
	, build: true

	/*
	 Pass a parent for Cotton to exist within rather than automatically
	 being pushed to the natural parent (window). This must be altered before the
	 build process begins.
	 By default this is 'window'
	 */
	, parent: null

	/*
	 To apply actions prior to execution during the pre configuration routine;
	 a waitOn method will be listened upon. If the named method is wrapped; execution
	 of the framework will occur before the spy'd method is executed.
	 */
	, waitOn: [
		'init'
	]

	/*
	 perform a garbage collect after the execution of the framework
	 removing all unrequired setup methods implemented.
	 This is to mostly clean up the api and save sane memory.
	 */
	, cleanup: true
	/*
	 Need a method to be called when the chain has completed plugin setup.
	 Apply a name referencing a global scope method, the method will be called
	 with the reference to Cotton as an argument.
	 This can be a 'string' referencing a global method, a method or null;
	 */
	, readyhook: function(Spindle, config){
		/*
		 Although this serves as a placeholderfor an override or implementation
		 it serves as a good example of the proxy object.
		 this entity is in the namespace but is not booted.
		 As such it's definedas a preCotton - not executed.
		 */
		console.log("readyhook", Spindle);
		window.Sp = Spindle

		if( Spindle.getConfig('build') ) {
			Spindle.waitOnExecute();
		}

	}
})('events', function(namespace, chain){
	// Configure on the Class
	// new Cotton() sets configuration
	// Adapters and imports are done
	// library creates
	// run stepper.


	/**
	 *  Events
	 */
	function Events(target){
	  var events = {}, i, list, args, A = Array;
	  target = target || this
	    /**
	     *  On: listen to events
	     */
	    target.on = function(type, func, ctx){
	      events[type] || (events[type] = [])
	      events[type].push({f:func, c:ctx})
	    }
	    /**
	     *  Off: stop listening to event / specific callback
	     */
	    target.off = function(type, func){
	      list = events[type] || []
	      i = list.length = func ? list.length : 0
	      while(~--i<0) func == list[i].f && list.splice(i,1)
	    }
	    /**
	     * Emit: send event, callbacks will be triggered
	     */
	    target.emit = function(){
	      args = A.apply([], arguments)
	      list = events[args.shift()] || []
	      i = list.length
	      for(j=0;j<i;j++) list[j].f.apply(list[j].c, args)
	    };
	}

	CoreEvents = function() {
		/*
		Use events.
		 */

		var init = function(scope){
			this._scope = scope || {};

			if( !Events ) {
				this.error(2, 'Events missing. Import minivents.js')
			}

			Events(this._scope);
			return this
		};

		/**
		 * dispatch an error event and print and error console log.
		 * @param  {Number} code    error code Number
		 * @param  {String} message Message string
		 * @return {this.dispatch}         return a signal dispatch
		 */
		this.error = function(code, message) {

			console.error('Error:', code, message);
			return this.dispatch('error', {
				type: 'error',
				code: code,
				message: message,
			})
		}

		this.warn = function(code, message) {

			if(message === undefined) {
				message= code;
				code = -1;
			};

			console.warn('Warning:', code, message);

			return this.dispatch('error', {
				type: 'error',
				code: code,
				message: message,
			})
		}

		/**
		 * add a callback to an event name
		 * this.on('foo', function(){})
		 * @param  {String} name Name of the event to listen for
		 * @param  {Function} func Handler to capture the diaptched event
		 * @return {undefined}
		 */
		this.on = function(name, func){
			return this._scope.on(name, func);
		};

		/**
		 * Dispatch for all listeners to react to.
		 * @param  {String} name Name of the event to dispatch
		 * @param  {Object} data Data object to provide to all listeners
		 * @return {undefined}
		 */
		this.dispatch = function(name, data) {
			return this._scope.emit(name, data);
		}

		this.off = function(name) {
			return this._scope.off(name);
		}

		this.add = function(name, config){
			return new this.register(name, config)
		}

		return init.apply(this, arguments);
	};

	namespace.events = new CoreEvents();

	// Wrap a function with an event
	var wrapMethod = function(func /*, name */){
		var orig = func;
		var scope = this;
		var v;
		name = arguments[1] || orig.name;

		func = function eventWrap(/* ... */) {
			// var args = Array.prototype.slice.call(arguments);
			v = orig.apply(scope, arguments);
			console.log('call', name)
			namespace.events.dispatch(name, arguments);
			return v;
		}
	}

	wrapMethod(namespace.getConfig);
	wrapMethod(namespace.init);
	wrapMethod(namespace.build);
	wrapMethod(namespace.execute);
})();
