
Layer = Class(BaseClass, {
	type: 'Layer'
	, step: function(){
		console.log('layer step')
	}

	, constructor: function(){
		this.data ={}
		this.layer.tick = this.step;
		this.init.apply(this, arguments);
		if(this.draw) {
			this.layer.start()
		}
	}
	, load: function(arr, func) {
		// load a duck set and run.
		var map = {}
		var self = this;
		var checkMap = function(){
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
				func.apply(self, [map])
			}
			return ready;
		}

		for (var i = 0; i < arr.length; i++) {
			map[arr[i]] = cotton.duck.checkAndLoad(arr[i], function(name, lib) {
				map[name] = true
				checkMap();
			});

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
