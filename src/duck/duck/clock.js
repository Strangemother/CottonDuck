;(function(){
	'use strict'

	var CanvasClock;
	/*
c=new cotton.duck.objects.Clock('bob')
core.events.on('clock:bob', function(){ console.log(arguments); })
 */
this.Clock = Class(this.BaseClass, {
	type: 'clock'
	, fps: 60
	, time: 1000
	, run: true
	, timer: undefined
	, constructor: function(time, name, start) {
		start = start || true;
		if( arguments.length == 1
			&& it(time).is('string') ) {
			// arg swap.
			name = time;
			time = this.time
		};

		if(name === undefined) {
			start = false;
		}

		this.name = name;
		this.count = 0;

		if(start) {
			this.start()
		};
	}
	, tick: function(){
		// debugger;
		core.events.dispatch(this.type + ':' + this.name, {
			name: this.name
			, time: this.time
			, tick: this.count++
		});

		//disaptch events
	}

	, start: function(){
		this.run = true;
		this.loop()
	}
	, reset: function(){
		this.stop();
		this.count = 0;
		this.run = true;
	}

	, stop: function(){
		this.run = false;
		window.clearTimeout(this.timer)
	}

	, loop: function(){
		this.timer = window.setTimeout(this.loopTimeout, this.time, this)
	}

	, loopTimeout: function(parent){
		parent.run && parent.tick()
		parent.loop()
	}
});

CanvasClock = this.CanvasClock = Class(this.Clock, {
	type: 'CanvasClock'
	, constructor: function(canvas, time, name, start) {
		var args = Array.prototype.slice.call(arguments, 1);

		this.canvas(canvas)
		this.interval = this.time / this.fps
		this.last = Date.now() * 1 - 1
		CanvasClock.$superp.constructor.apply(this, args)
	}

	, canvas: function(canvas) {
		if(canvas !== undefined) {
			if(this._canvas !== canvas){
				this.inspection = cotton.canvas.inspectCanvas(canvas);
			}

			this._canvas = canvas
			return this;
		}
		if(this.inspection !== undefined) {
			return this.inspection.canvas;
		}
		return this._canvas
	}

	, tick: function() {
		this.interval = this.time / this.fps
		// calculate clock rate.
		this.now = Date.now() * 1 - 1;
		this.delta = this.now - this.last

		if(this.delta > this.interval) {
			this.last = this.now - (this.delta % this.interval);
			this.step(this.inspection.context)
		};

		CanvasClock.$superp.tick()
		// this.time = this.interval;
	}

	, loop: function(){
		this.timer = window.setTimeout(this.loopTimeout, this.interval, this)
	}

	, step: function(context){
	}
})

}).apply(__duckCache)
