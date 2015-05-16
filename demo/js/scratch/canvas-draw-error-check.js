if(!window.cotton) {
	console.error('cotton not ready')
}else{
	cotton.ready(function(){

		if(!cotton.canvas) {
			console.error('cotton.ready: canvas not ready')
			return false
		}
		cotton.canvas.draw('main', function(context) {
			context.beginPath();
		    context.rect(10,10,10,10);
		    context.fillStyle = '#8ED6FF';
		    context.fill();
		    context.lineWidth = 2;
		    context.strokeStyle = 'black';
		    context.stroke();
		})
	})
}
