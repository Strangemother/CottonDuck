;(function(config){
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
		space.calcWidth = calcWidth;
		
	 	console.log('Setup', config.name);
	}

	var ready = function(cotton){
		utils.dispatchEvent('canvas:ready')
		calcWidth(cotton.canvas.getCanvas() )
	 	console.log('Im good to go', config.name);
	}

	var calcWidth = function(canvas){

		var width = canvas.clientWidth * ( window.devicePixelRatio);
		var height = canvas.clientHeight * ( window.devicePixelRatio);
		canvas.width = width;
		canvas.height = height;
		return {
			width: width
			, height: height
		}
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
		var f = draw;
		if( arguments.length == 1
			&& it(canvas).is('function') ) {
			f = canvas;
			canvas = undefined;
		};

		var cnv = create(canvas, f);
		cnv.animFrame.loop()
		return cnv
	}

	var create = function(canvas, callback) {
		/*
		 run the method of execution on a canvas, wrapping the
		 canvas with CottonDuck
		 */
		var insp = inspectCanvas(canvas);
		insp.animFrame = animFrame(insp.context, callback);
		return insp;
	}

	var inspectCanvas = function(canvas) {

		var cnv = getCanvas(canvas);
		var dpr = window.devicePixelRatio || 1;
		var ret = {
			context: undefined
			, canvas: cnv
			, width:  0
			, height: 0
			, devicePixelRatio: dpr
		};

	    ret.context = cnv.getContext("2d");
	    // debugger;
	    ret.context.scale(dpr, dpr);
		// this.step.start(1000, context);

	    var c = calcWidth( cnv)
	    ret.width = c.width  * dpr;
	    ret.height = c.height * dpr;
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

	var animFrame = function(context, callback){
		var renderFunction = function(){};
		var run = true;
		var r = {
			loop: undefined
			, render: undefined
			, run: run
			, start: undefined
			, stop: undefined
			, context: context
		}

		r.render = function render(callback){
			if(callback) { renderFunction = callback; };

			return renderFunction;
		};

		r.frame = function frame() {
			renderFunction(r.context)
		}

		var browserAnimationFrame = (function(){
		  	return window.requestAnimationFrame      ||
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
		            r.run && browserAnimationFrame(animloop);
		            r.frame()
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

		listen('cotton:' + config.name, function(event){
			core 	= event.detail.namespace;
			spindle = event.detail.spindle;
			utils 	= event.detail.utils;
			space   = core[config.name];
			console.log('canvas ligbot response')
	 		self.core = core
	 		self.spindle = spindle
	 		self.utils = utils
	 		setup()
	 		core.ready(ready);
	 		spindle.bootups[config.name].done()

		});

		listen('resize', function(){
			calcWidth(cotton.canvas.getCanvas())
		})
		console.log('canvas listen request')
		window.dispatchEvent(new CustomEvent('spindle:get', {
			detail: config
		}));

	}).call(this);


}).call(window, {
	name: 'canvas'
	, space: true
	, preboot: true
})
