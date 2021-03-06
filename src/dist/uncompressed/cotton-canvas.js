/*
 first import for any Cotton project. This should set everything for ready.

	+ A basic configure object
	+ can be configured
	+ runs with even events only


	+ Add core assets
	+ Get
 */
	/* Pick up the last script booted (me) */

;(function(config){
	'use strict'

	var scripts = document.getElementsByTagName("script");
	// Parse the special data to configure Cotton.
	var script = scripts[scripts.length - 1];

	var listen = window['addEventListener'] ? window.addEventListener: window.attachEvent
		, core
		, spindle
		, utils
		, assets = [
			'components/cotton.canvas.js'
		]
		;

	var main = function(){
		listen('spindle:' + config.name, function(event){
			core = event.detail.namespace;
			spindle = event.detail.spindle;
			utils = event.detail.utils;
			run();
		});

		var event = new CustomEvent('spindle:get', {
			detail: { name: config.name }
		});


		window.dispatchEvent(event);

	}

	var run = function() {
		liveloadAssets()
		core.setConfig(config)
	 	core.ready(ready);
	 	core.init()
	};

	var liveloadAssets = function(){
		core.load.relativeLoad(script, assets, function(){
			console.log('live loaded')
		})
	}

	var ready = function(){
	 	console.log('Cotton', config.name);
	}

	main();
}).call(window, {
	name: 'cotton'
	, namespace: 'cotton'
})
;;(function(config){
	'use strict'

	var listen = window['addEventListener'] ? window.addEventListener: window.attachEvent
		, scripts = document.getElementsByTagName("script")
		, script = scripts[scripts.length - 1]
		, core, spindle, utils, space
		, self = this
		;

	var setup = function(){
		core.draw = draw;
		space.draw = draw;
		space.create = create;
		space.inspectCanvas = inspectCanvas;
		space.getCanvas = getCanvas;
		space.animFrame = animFrame;

	 	console.log('Setup', config.name);
	}

	var ready = function(){
	 	console.log('Ready', config.name);
	}

	/**
	 * The `draw()` method is the cheapest method to run your canvas code.
	 * Optionally provide a `canvas` String or Node and a required draw method.
	 *
	 * If the canvas is omited, Cotton will default to the `canvas#main` from the
	 * DOM.
	 *
	 * If no draw method is supplied. The basic stage display is provided.
	 *
	 * @param  {[type]} draw [description]
	 * @return {[type]}      [description]
	 */
	var draw = function(canvas, draw) {
		var cnv = create(canvas, draw);
		cnv.animFrame.loop()
		return cnv
	}

	var create = function(canvas, callback) {
		/*
		 run the method of execution on a canvas, wrapping the
		 canvas with CottonDuck
		 */
		var insp = inspectCanvas(canvas);
		insp.animFrame = animFrame(callback);
		return insp;
	}

	var inspectCanvas = function(canvas) {

		var cnv = getCanvas(canvas);
		var dpr = window.devicePixelRatio || 1;

		var ret = {
			context: undefined
			, canvas: cnv
			, width:0
			, height: 0
			, devicePixelRatio: dpr
		};

	    ret.context = cnv.getContext("2d");
	    // debugger;
	    ret.context.scale(dpr, dpr);
		// this.step.start(1000, context);

	    ret.width = cnv.width  * dpr;
	    ret.height = cnv.height * dpr;

	    return ret;
	}

	var getCanvas = function(canvas){
		/*
		 Return a canvas element, peoviding a string, ID or canvas item.
		 IF one canvas exists this is returned.

		 Order of preference:

			Canvas element
			Canvas Element ID
			Canvas Element 1 found
		 */

		if( canvas === undefined ) {
			// find elements
			var els = document.getElementsByTagName('canvas');
			if(els.length == 1) {
				canvas = els[0];
			};
		} else {
			var canvasStr;

			if( it(canvas).is('string') ){
				// by idl
				canvasStr = canvas;
				canvas = document.getElementById(canvasStr)
			} else if( canvas instanceof HTMLElement ) {
				// By element
			} else {
				return false
			}

		}

		if( (canvas instanceof HTMLElement) != true ) {
			throw new Error('Canvas:'  + canvas + ' must be HTML element')
		}

		return canvas;
	}

	var animFrame = function(callback){
		var renderFunction = function(){};
		var run = true;
		var r = {
			loop: undefined
			, render: undefined
			, run: run
			, start: undefined
			, stop: undefined
		}

		r.render = function render(callback){
			if(callback) { renderFunction = callback; };

			return renderFunction;
		};

		var browserAnimationFrame = (function(){
		  	return  window.requestAnimationFrame     ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          window.oRequestAnimationFrame      ||
		          window.msRequestAnimationFrame     ||
		          function(/* function */ callback, /* DOMElement */ element){
		          	  window.setTimeout(callback, config.fps);
		          };
		})();

		r.loop = function() {
			r.createTime = +(new Date);
		    var _loop = function(){
		        (function animloop(){
		            renderFunction()
		            r.run && browserAnimationFrame(animloop);
		        })();
		    };
		    _loop();
		};


		r.start = function(){
			r.run = true;
			r.loop()
		}

		r.stop = function(){
			r.run = false;
		};

		r.running = function(){
			return r.run
		}

		if(callback !== undefined) {
			renderFunction = callback;
		};


		return r;
	}

	var main = (function(){

		listen('spindle:' + config.name, function(event){
			core 	= event.detail.namespace;
			spindle = event.detail.spindle;
			utils 	= event.detail.utils;
			space   = core[config.name];

	 		self.core = core
	 		self.spindle = spindle
	 		self.utils = utils
	 		setup()
	 		core.ready(ready);
		});

		window.dispatchEvent(new CustomEvent('spindle:get', {
			detail: {
				name: config.name
				, space: true
			}
		}));

	}).call(this);


}).call(window, {
	name: 'canvas'
})
