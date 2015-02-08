var point = function(o){

	var np = new o.NullPoint(10,10)
	var p = new o.Point(np)
	this.children.push(p)
}

var ready = function(){
	var canvas = new cotton.duck.objects.Surface('main')
	canvas.load(['NullPoint', 'Point'], point)
};

cotton.ready(ready)
