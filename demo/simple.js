Cotton.draw(/* 'main',*/ function(context){
		// By passing this draw function, we are given the context.
		// How simple was that!
		context.beginPath();
		context.arc(100, 100, 50 , 0, Math.PI * 2, false);
	 	context.closePath()
		context.fillStyle = 'green';
		context.fill();
	}
});
