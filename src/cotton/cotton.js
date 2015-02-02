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
		core.relativeLoad(script, assets, function(){
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
