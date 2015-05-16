;(function(){
	'use strict'

this.Layer = Class(BaseClass, {
	type: 'Layer'
	, step: function(){
		console.log('layer step')
	}

	/*
	 the arguments are passed through to `init` accepted in same order.
	 */
	, constructor: function(){
		this.data = {};
		this.layer.tick = this.step;
		this.init.apply(this, arguments);
		if(this.draw) {
			this.layer.start()
		}
	}


	, parse: function(positions, data) {
		/*
		Layer({})
		Layer(NullPoint)
		Layer([NullPoint])
		Layer(NullPoint, {})
		Layer([NullPoint], {})

		 */
		var locations = undefined;

		if( positions !== undefined 
			&& data === undefined)  {
			// no data
			data = {}
			this.parse
		} else if( positions === undefined 
			&& data !== undefined ) {
			// User purpose positions == undefined

		}
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

})

}).apply(__duckCache)

