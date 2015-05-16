cotton.ready(function(){

	// new cotton.duck.objects.Point(10,10)
	var Line = cotton.duck.item('Line', function(){
		var x,y;

		return {
			__extends: [cotton.duck.Duck]
			, constructor: function(){
				this.constructor.$super.apply(this, arguments);
			}
			, init: function(pointA, pointB){
				this.point = pointA
				this.points = [pointA, pointB]

				this.width = 3
				this.dashOffset = 0
				this.join = 'bevel'
			}

			, step: function(context, data){
				data.points = this.points;
				data.lineWidth = this.width;
				data.dashOffset = this.dashOffset;
				data.join = this.join;
				data.cap = this.cap;
			}
			, draw: function(ctx, data){
				ctx.lineCap = data.cap;
				ctx.lineWidth = data.width;
				ctx.lineDashOffset = data.dashOffset;
				ctx.lineJoin = data.join;
				ctx.setLineDash([1,3])
				ctx.beginPath();
				ctx.moveTo(data.points[0].x, data.points[0].y)
				ctx.lineTo(data.points[1].x, data.points[1].y)
		    	ctx.stroke();
		    	// ctx.endPath();
			}
		}
	});
})
