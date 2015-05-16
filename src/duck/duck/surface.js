;(function(){
	'use strict'

/*
A surface combines a single canvas object to a top level Display Objects.

All elements within a DisplayObject should have a step and draw method.
These methods will be called as per request from the step and draw from the
canvas
 */
this.Surface = Class(this.DisplayObject, {
	type: 'Surface'
	, constructor: function(canvas, name, children) {
		if(children!= undefined) {
			this.children = children;
		};

		if(canvas !== undefined) {
			this.duckCanvas = cotton.duck.objects.Canvas.setup('main')
			var self = this;
			this.duckCanvas.draw = function(context) {
				self.preDraw(context)
				self.draw(context)
				self.postDraw(context)
			};

			this.duckCanvas.step = function(context) {
				self.step(context)
			};
		};
	}
	, preDraw: function(context){
		var canvas = this.canvas();
		var width = canvas.inspection.width
		var height = canvas.inspection.height

		context.clearRect(0,0, width, height)
		context.save()
	}
	, postDraw: function(context){
		context.restore()
	}
	, canvas: function() {
		return this.duckCanvas
	}
})

// canvas=new cotton.duck.objects.Surface('main')
// p=new cotton.duck.objects.NullPoint(10,10)
// pp=new cotton.duck.objects.Point(p)
// canvas.children.push(pp)
}).apply(__duckCache)
