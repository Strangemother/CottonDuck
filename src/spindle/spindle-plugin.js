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
			utils = event.detail.utls;
			run();
		});

		// instansiate code
		ask();
	}


	var ask = function(){
		// prepare code

		window.dispatchEvent(
			new CustomEvent('spindle:get', {
				detail: {
					name: config.name
				}
			})
		);
	};

	var run = function() {
		// hook code
	 	core.load = ljs.load
	 	core.aliasLoad = ljs.load

	 	core.ready(ready);
	 	// core.init()
	};

	var ready = function(){
		// run code
	 	// console.log('Ready', config.name);
	}

	main();
}).call(window, {
	name: 'plugin'
})
