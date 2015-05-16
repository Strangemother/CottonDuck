DisplayObject = Class(Layer, {
	type: 'DisplayObject'
	, constructor: function(name, canvas) {
		this.name = name;
		this.data = {};
		this.canvas(canvas)
		this.clock = new CanvasClock(canvas, name)
		var self = this;
		this.clock.draw = function(context){
			self.draw(context)
		}
	}

	, draw: function(context){
		this.children = this.getChildren();
		for (var i = this.children.length - 1; i >= 0; i--) {
			this.renderChild(this.children[i], context);
		};
	}

	, step: function(context){
		this.children = this.getChildren();
		for (var i = this.children.length - 1; i >= 0; i--) {
			this.stepChild(this.children[i], context);
		};
	}

	, children: []
	, getChildren: function(){
		return this.children
	}

	, renderChild: function(child, context) {
		//render this item
		if(child.render) {
			return child.render(context)
		}
		if(child.draw) {
			return child.data.point && child.draw.apply(child.data, [context, child.data])
		}
	}

	, stepChild: function(child, context) {
		if(child.step !== undefined) {
			child.data.point = child.point;
			child.step(context, child.data)
		}
	}

	, canvas: function(canvas) {
		if(canvas !== undefined) {
			if(this._canvas !== canvas){
				this.inspection = cotton.canvas.inspectCanvas(canvas);
			}

			this._canvas = canvas;
			return this;
		}
		return this._canvas;
	}
})