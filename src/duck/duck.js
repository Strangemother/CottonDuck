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
		, objects = {}
		, assets = [
			'duck.Duck.js'
		]
		, self = this
		;

	var setup = function(){
		space.item = item;
		space.checkAndLoad = checkAndLoad
		liveloadAssets()
	}

	var ready = function(){
		// core.canvas.draw(draw)
	}

	var item = function(name){
		if(arguments.length == 1) {
			// return name class;
			return objects[name]
		} else if(arguments.length == 2) {
			// adapt
			var klass = adapter(name, arguments[1])
			objects[name] = klass
		}
	}

	var adapter = function(name, api) {
		if( it(api).is('function') ) {
			api = api()
		};

		var mixins = api.__extends || [];
		var c = api.init;

		api.type = name;
		delete api.__extends

		if( !(api.constructor)
			|| api.constructor == Object) {
			api.constructor = function(){
				this.init.apply(this,arguments)
			}
		}
		if(mixins.length == 1) {
			var klass = Class(mixins[0], api)
		} else if( mixins.length > 0 ) {
			var klass = Class(mixins, api);
		} else {
			var klass = Class(api);
		}
		return klass;
	}

	var liveloadAssets = function(){
		console.log('duck some assets')
		core.load.relativeLoad(script, assets, function(){
			console.log('live loaded')

	 		spindle.bootups[config.name].done()

		})
	}

	var checkAndLoad = function(name, callback){
		if(core.duck.objects[name] === undefined) {
			core.load.relativeLoad(script, 'objects/' + name + '.js', function() {
				var n = name;
				callback(n, cotton.duck.item(name))
			})
			return false;
		} else {
			return true;
		}
	}

	var draw = function(context) {

	};

	var main = (function(){

		listen('cotton:' + config.name, function(event){
			core 	= event.detail.namespace;
			spindle = event.detail.spindle;
			utils 	= event.detail.utils;
			space   = core[config.name];
	 		self.core 	 = core
	 		self.spindle = spindle
	 		self.utils 	 = utils
	 		space.objects = objects;
	 		setup()
	 		core.ready(ready);

		});

		window.dispatchEvent(new CustomEvent('spindle:get', {
			detail: config
		}));

	}).call(this);


}).call(window, {
	name: 'duck'
	, space: true
	, preboot: true
});
