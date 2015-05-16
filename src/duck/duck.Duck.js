/*
provide a rendering layer to perform logical stacking. Calling many draw objects
as layers and applying those layers to a stack.
 */
;(function(config){
	'use strict'

	var listen = window['addEventListener'] ? window.addEventListener: window.attachEvent
		, scripts = document.getElementsByTagName("script")
		, script = scripts[scripts.length - 1]
		, core, spindle, utils, space, cache
		//, BaseClass, Layer, Clock, CanvasClock, DisplayObject
		, self = this
		;

	var setup = function(){
		console.log('Write duck');

		core.duck.Duck = cache.Layer;
		core.duck.objects.Clock = cache.Clock;
		core.duck.objects.Layer = cache.Layer;
		core.duck.objects.CanvasClock = cache.CanvasClock;
		core.duck.objects.DisplayObject = cache.DisplayObject;
		core.duck.objects.Canvas = cache.Canvas;
		core.duck.objects.Surface = cache.Surface;

	}

	var ready = function(){
		core.canvas.draw(draw)
	}

	var draw = function(context) {
	};

	var main = (function(){

		listen('cotton:' + config.name, function(event){
			core 	= event.detail.namespace;
			spindle = event.detail.spindle;
			utils 	= event.detail.utils;
			space   = core[config.name];
			cache 	= core.cache;
	 		self.core = core
	 		self.spindle = spindle
	 		self.utils = utils

	 		setup()
	 		core.ready(ready);
	 		spindle.bootups[config.name].done()

		});

		window.dispatchEvent(new CustomEvent('spindle:get', {
			detail: config
		}));

	}).call(this);


}).call(window, {
	name: 'duck.Duck'
	//, space: true
	, preboot: true
});
