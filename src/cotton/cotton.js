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
		, readys =[], draws = []
		, core
		, spindle
		, utils
		, assets = [
			'components/cotton.canvas.js'
		]
		;

  	var Head = function(){
  		var init = function(){
  			this.startUp = +(new Date)
  		};

  		this.ready = function(func) {
  			console.log('add ready')
  			readys.push(func);
  		};

  		this.draw = function(func) {
  			draws.push(arguments)
  		};

  		init.apply(this, arguments)
  	}

	var main = function(){
		listen('spindle:' + config.name, function(event){
			core = event.detail.namespace;
			spindle = event.detail.spindle;
			utils = event.detail.utils;
			run();
		});
		head();
		var event = new CustomEvent('spindle:get', {
			detail: { name: config.name }
		});


		window.dispatchEvent(event);

	}

	var head = function() {
		/*
		 write the initial config object specfic to the custom library. This
		 applies something to hook to if the library is referenced before the boot
		 is finished.
		 */
		 if(!window[config.name]) {
		 	console.log('write pre head');
		 	window[config.name] = new Head()
		 }
	}

	var run = function() {
		liveloadAssets()
		core.setConfig(config)
	 	core.ready(ready);
	};

	var liveloadAssets = function(){
		core.load.relativeLoad(script, assets, function(){
			console.log('live loaded')
			core.init()
		})
	}

	var ready = function(){
	 	console.log('Cotton.js heard ready under name:', config.name);
	 	Head.prototype.ready = core.ready
	 	for (var i = readys.length - 1; i >= 0; i--) {
	 		console.log('push readys')
	 		core.ready(readys[i])
	 	};

	 	for (var i = draws.length - 1; i >= 0; i--) {
	 		console.log('push draws')
	 		core.canvas.draw.apply(core.canvas, draws[i])
	 	};
	}

	main();
}).call(window, {
	name: 'cotton'
	, namespace: 'cotton'
})
