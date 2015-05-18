cotton.ready(function(){

	// new cotton.duck.objects.Point(10,10)
	var Point = cotton.duck.item('Point', function(){
		var x,y;

		return {
			__extends: [cotton.duck.Duck]
			, constructor: function(){
				this.constructor.$super.apply(this, arguments);
			}
			, init: function(points, data){
				this.point = points[0]
			}

			, step: function(context, data){
				// debugger;
				return data;
			}
			/**
			 * Provided to the draaw renderer to present the values within the class.
			 * This is isolated from the main class, running within a closed scoped
			 * The data is updated within the `step` class. The `draw method should
			 * only present these values.
			 *
			 * @param  {Context} context 2D context provided by the renderer
			 * @return {void}         Nothing to return.
			 */
			, draw: function(context, data){
				/*
				It's best to define this lightly only drawing should occur.
				Any calculations required should be performed within the
				`step` method. This is to ensure to renderer loop isn't clogged
				and the closed scope ensures less leaking.
				The data object should contain all dynamic values required to
				draw. These values were written during the `step` phase.
				 */
				context.beginPath();
				context.fillStyle = data.fillStyle;
				context.arc(data.point.x, data.point.y, data.size || 2, 0, Math.PI * 2, false);
		    	context.fill();
		    	// context.endPath();
			}
		}
	});

	Point.options = {
		size: Number
		, fillStyle: undefined
	}
})
