var layers = function(){

	var ctn = cotton.canvas.create('main');
	ctnLayers = cotton.layers.get(ctn.canvas);

	ctnLayers.add(function(context){
		context.beginPath();
	    context.rect(0,0,10,10);
	    context.fillStyle = '#8ED6FF';
	    context.fill();
	});

	ctnLayers.add('rect', function(context){
		context.beginPath();
	    context.rect(10,10,10,10);
	    context.fillStyle = '#8ED6FF';
	    context.fill();
	});

	ctnLayers.add(function(context){
		context.beginPath();
	    context.rect(20,20,10,10);
	    context.fillStyle = '#8ED6FF';
	    context.fill();
	});

	ctnLayers.add('rect4', function(context){
		context.beginPath();
	    context.rect(40,40,10,10);
	    context.fillStyle = '#8ED6FF';
	    context.fill();
	});

	v = ctnLayers.set('rect', undefined);
	v = ctnLayers.kill('rect4');

};

cotton.ready(layers);
