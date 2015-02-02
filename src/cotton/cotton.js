/*
 first import for any Cotton project. This should set everything for ready.

	+ A basic configure object
	+ can be configured
	+ runs with even events only


	+ Add core assets
	+ Get
 */
;(function(config){
	'use strict'

	var listen = window['addEventListener'] ? window.addEventListener: window.attachEvent
		, core
		, spindle
		, utils
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
		core.setConfig(config)
	 	core.ready(ready);
	 	core.init()
	};

	var ready = function(){
	 	console.log('Cotton', config.name);
	}

	main();
}).call(window, {
	name: 'cotton'
	, namespace: 'cotton'
})
