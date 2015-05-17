var NullPoint;
var _p = function(x,y) {
    return (new NullPoint(x,y));
}

var line = function(o) {
    l = new o.Line( [_p(50,50), _p(50,150)] ,{

    });
    this.children.push(l)
}

var ready = function(){
    var canvas = new cotton.duck.objects.Surface('main');
    
    canvas.load(['NullPoint'], function(o){
        NullPoint = o.NullPoint;
        canvas.load(['Line'], line);
    });
};

cotton.ready(ready)
