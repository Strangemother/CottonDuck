/*
provide a rendering layer to perform logical stacking. Calling many draw objects
as layers and applying those layers to a stack.
 */
;(function(config){
	'use strict'

	var listen = window['addEventListener'] ? window.addEventListener: window.attachEvent
		, scripts = document.getElementsByTagName("script")
		, script = scripts[scripts.length - 1]
		, core, spindle, utils, space
		, layers = {}
		, self = this
		;

	var createLayers = function(canvas) {
		var cnv = core.canvas.getCanvas(canvas)
		return {
			canvas: cnv
			, add: function(name, func){
				return addToLayer(this.canvas, name, func)
			}
			, get: function(name) {
				return getLayers(this.canvas)['draw'][name]
			}
			, set: function(name, func_null){
				var layer = this.get(name);
				if(layer) {
					addToLayer(this.canvas, name, func_null)
				}
			}
			, kill: function(name) {
				return removeLayer(this.canvas, name)
			}
		}
	}

	var addToLayer = function(canvas, name,func) {

		if(it(name).is('function') && func === undefined){
			func = name;
		};

		if(layers[canvas] === undefined)  {
			layers[canvas] = createLayers(canvas)
		};

		if(layers[canvas]['draw'] == undefined) {
			layers[canvas]['draw'] = {}
		};

		layers[canvas]['draw'][name] = func;
	};

	var getLayers = function(canvas) {
		var cnv = core.canvas.getCanvas(canvas)
		if(cnv) {
			return layers[cnv]
		} else {
			return layers
		}
	}

	var removeLayer = function(canvas, name) {
		var cnv = core.canvas.getCanvas(canvas)
		var f= layers[cnv]['draw'][name];
		if(f !== undefined) {
			delete layers[cnv]['draw'][name]
			return true
		};
		return false;
	}

	var setup = function(){

		space.get = function(canvas) {
			/*
			return a layer based upon the canvas provided. Scoping the
			layers to a single canvas allows for many canvas to run on one page.

			Passing any canvas object should be enough.
			 */
			if(layers[canvas] === undefined){
				layers[canvas] = createLayers(canvas)
			}

			return getLayers(canvas)
		}

		space.add = function(canvas, name, func){
			return addToLayer(canvas, name, func)
		};

	}

	var ready = function(){
		core.canvas.draw(draw)
	}

	var draw = function(context) {
		var layer, item, cb;
		for( layer in layers) {
			for( item in layers[layer].draw) {
				cb = layers[layer].draw[item]
				cb && cb(context)
			}
		}
	};

	var main = (function(){

		listen('cotton:' + config.name, function(event){
			core 	= event.detail.namespace;
			spindle = event.detail.spindle;
			utils 	= event.detail.utils;
			space   = core[config.name];
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
	name: 'layers'
	, space: true
	, preboot: true
});
