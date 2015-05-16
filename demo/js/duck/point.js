var point = function(o){
	var np = new o.NullPoint(50,50)
	var p = new o.Point(np)
	this.children.push(p)
}

var ready = function(){
	var canvas = new cotton.duck.objects.Surface('main');
	canvas.load(['Point', 'NullPoint'], point);
};

cotton.ready(ready)
