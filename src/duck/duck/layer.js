;(function(){
	'use strict'


var _plugs = {};
var _plugins = {};

var registerGlobal = function(plugin, name){
    var id = plugin.id();

    if( !it(_plugs[ plugin.name ]).is('array') ) {
        _plugs[ plugin.name ] = [];
    }
    
    if( !it(_plugs[ name ]).is('array') ) { 
        _plugs[ name ] = [];
    }
    
    _plugs[id] = id;
    _plugs[ plugin.name ].push( id );
    _plugs[ name ].push( id );
    
    _plugins[id] = plugin;
}

var getGlobal = function(v) {
    var id = v;
    if( v.id !== undefined ) {
        if( it(v.id).is('function') ) {
            id = v.id()
        } else {
            id = v.id;
        }
    }

    var plugin;

    if( _plugs[id] !== undefined ) plugin = _plugs[id];

    return plugin
}

var removeGlobal = function(v) {
    var id = v;
    if( v.id !== undefined ) {
        if( it(v.id).is('function') ) {
            id = v.id()
        } else {
            id = v.id;
        }
    }

    if( _plugs[id] ) {
        delete _plugs[id]
    }
}

var ModifierMixin = Class(function(){
    var ModScope = function(parent){
        var self = this;
        this.addSet = function(object) {
        	/* Apply a list of modifiers applied by a
        	name:plugin set. The keyname defines the
        	targeted value to be affected by the modifier.*/

        	var M = cotton.duck.item('Modifier');
	        var m = new M();

        	for(var name in object) {
	        	var args = object[name]
	        	m[name] = args
        	}

	        // m.setArgs.apply(m, args);

        }

        this.add = function(name, plugin){
            if( !it(name).is('string') 
                && plugin === undefined ) {

                plugin = name;
                name = plugin.name;
            };

            registerGlobal(plugin, name);
        }

        this.get = function(v) {
            return getGlobal(v);
        }

        this.remove = function(v) {
            var p = getGlobal(v);
            removeGlobal(p)
        }

        this.run = function(context, data, layers) {
        	/*
        	 Called by the DisplayObject when a run() 
        	 has been called from a modifier(ctx) call.

        	 The provided data object is the finished product from
        	 the Layers parent `step()`
        	 */

            // loop all modifiers
            var id
            	, mod
            	, field
            	, modCall
            	, value
            	;

            if(layers.point)
            layers.point.step(context, data)

            for(id in _plugins) {
            	// step.
            	mod = _plugins[id];
            	
            	mod.step(context, layers, data)
            	for(field in data) {
            		modCall = mod[field]
            		value = data[field];
            		if( modCall !== undefined) {
            			// call the matching modifier method
            			// console.log('Calling', field)
            			value = modCall.apply(mod, [ data[field], context, data])
            		}

            		data[field] = value;
            	}
            }

            return data;
        }
    }

    return {
        modifiers: function(ctx, d) {
            if(!this._modifiers) {
                this._modifiers = new ModScope(this);
            };

           	if( ctx !== undefined 
           		&& d !== undefined ) {
           		return this._modifiers.run(ctx, d, this)
           	}

            return this._modifiers;
        }
    }

});

this.Layer = Class([BaseClass, ModifierMixin], {
	type: 'Layer'
	, step: function(){
		console.log('layer step')
	}

	/*
	 the arguments are passed through to `init` accepted in same order.
	 */
	, constructor: function(){
		this.layer.tick = this.step;
		var args = this.parseArgs.apply(this, arguments);
		var initData = this.init.apply(this, args );
		this.data = initData || args[1];
		if(this.draw) {
			this.layer.start()
		}
	}


	, parseArgs: function(positions, data) {
		/*
		Layer({})
		Layer(NullPoint)
		Layer([NullPoint])
		Layer(NullPoint, {})
		Layer([NullPoint], {})

		 */
		var locations = undefined;
		var config = {};

		if( positions !== undefined ){
			locations = positions
			if( !it(positions).is('array') ) {
				locations = [positions]
			}
		};

		if( data !== undefined ) {
			// User purpose positions == undefined
			config = data;
		};

		return [locations, config]
	}
	
	, load: function(arr, func) {
		// load a duck set and run.
		var map = {}
		var self = this;
		var checkMap = function(cb){
			var ready = true;
			for (var name in map) {
				if (map.hasOwnProperty(name)) {
					if(map[name] !== true) {
						ready = false;
					};
				}
			}

			if(ready) {
				for (var name in map) {
					if (map.hasOwnProperty(name)) {
						map[name] = cotton.duck.objects[name];
					}
				}
				cb.apply(self, [map])
			}
			return ready;
		}

		for (var i = 0; i < arr.length; i++) {
			map[arr[i]] = (function(){
					var self = this;
					return cotton.duck.checkAndLoad(arr[i], function(name, lib) {
						self.map[name] = true
						checkMap(self.func);
					});
				}).apply({
					map:map
					, name: name
					, func: func
				})

		};
		return map
	}

	, layer: {
		clock: 1000
		, run: true
		, timer: undefined
		, clockName: 'render'
		, tick: function(){}
		, start: function(){
			console.log('start clockName')
			core.events.on('clock:' + this.clockName, this.draw)
		}

		, draw: function(context){
			console.log('draw')
			//return draw(context)
		}

		, stop: function(){
			core.events.off('clock:' + this.clockName, this.draw)
		}

		, loop: function(){
			this.timer = window.setTimeout(this.loopTimeout, this.clock, this)
		}

		, loopTimeout: function(parent){
			parent.run && parent.tick()
			parent.loop()
		}
	}
});

}).apply(__duckCache)

