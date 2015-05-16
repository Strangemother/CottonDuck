var point = function(o){
	var np = new o.NullPoint(10,10)
	var p = new o.Point(np)
	this.children.push(p)
}

var line = function(o) {
	var a = new o.NullPoint(10,10)
	var b = new o.NullPoint(10,40)
	l = new o.Line(a, b)
	this.children.push(l)
}

var ready = function(){
	var canvas = new cotton.duck.objects.Surface('main')
	canvas.load(['NullPoint', 'Point'], point)
	canvas.load(['NullPoint', 'Line'], line)
};

cotton.ready(ready)
