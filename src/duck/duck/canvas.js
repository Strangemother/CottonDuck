/*

clock = cotton.duck.objects.Canvas.setup('main')
 */
Canvas = Class(CanvasClock, {
	type: 'Canvas'
	, $singleton: true

	, setup: function(canvas){
		this.name = this.type
		this.canvas(canvas)
		var self = this;
		cotton.canvas.draw(canvas, function(context) {
			self.draw(context)
		})
		this.last = Date.now() * 1 - 1
		this.start()
		return this;
	}

	, draw: function(context) {
		/*
		 The renderign clock runs seperately from the logic clock (step())
		 Therefore, stop() will perform a logic stop, not a rendering stop.
		 This is to assist with a built in pause.

		 The stop both clocks, perform a return is the `run` is false.
		 */
		if(!this.run) return
		/**
		 * This is a canvas draw method, running at the right speed for
		 * the canvas.
		 */
		console.log('canvas draw')
	}
	, step: function(){
		console.log('canvas step')
	}
})
