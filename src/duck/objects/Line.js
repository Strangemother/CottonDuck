cotton.ready(function(){

	// new cotton.duck.objects.Point(10,10)
	var Line = cotton.duck.item('Line', function(){
		var x,y;

		return {
			__extends: [cotton.duck.Duck]
			, constructor: function(){
				this.constructor.$super.apply(this, arguments);
			}
			
			, init: function(points, data){
				this.point = points[0]
				this.points = points

				this.width = 3
				this.dashOffset = 0
				this.join = 'bevel'
			}

			, step: function(context, data){
				var ret = {};
				ret.points 		= this.points;
				ret.lineWidth 	= this.width;
				ret.dashOffset 	= this.dashOffset;
				ret.join 		= this.join;
				ret.cap 		= this.cap;
				
				if( ret.dashSpace > 0 ) {
					ret.lineDash = [ret.dashSpace, ret.dashWidth];
				}

				return ret;
			}
			
			, draw: function(ctx, data){
				ctx.lineCap = data.cap;
				ctx.lineWidth = data.width;
				ctx.lineDashOffset = data.dashOffset;
				ctx.lineJoin = data.join;
				data.lineDash && ctx.setLineDash(data.lineDash)
				ctx.beginPath();
				ctx.moveTo(data.points[0].x, data.points[0].y)
				ctx.lineTo(data.points[1].x, data.points[1].y)
				
				for(var i=0;i<data.points.length; i++) {
					ctx.lineTo(data.points[i].x, data.points[i].y)	
				};

		    	ctx.stroke();
		    	// ctx.endPath();
			}
		}
	});

	Line.options = {
		cap: ['butt', 'round', 'square']
		, join: ['round', 'bevel', 'miter']
		, width: Number
		, dashOffset: Number
		// space between dash
		, dashSpace: 0
	}
})
