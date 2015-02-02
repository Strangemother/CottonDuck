;(window['addEventListener'] ? window.addEventListener: window.attachEvent)
('spindle:apples', function(event) {
	var core = event.detail.namespace;
	var spindle = event.detail.spindle;
	var utils = event.detail.utls;

 	core.setConfig('namespace', 'mylib');
 	core.ready(function(){
 		console.log('my plugin')
 	});

});

window.dispatchEvent(
	new CustomEvent('spindle:get', {
		detail: { name: 'apples' }
	})
);
