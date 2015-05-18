var NullPoint;
var _p = function(x,y) {
    return (new NullPoint(x,y));
}

var mouse = function(o) {
    var m = cotton.duck.objects.modifiers
    var p = new o.NullPoint( m.iterator(0, 300, 4) )
    circle = new o.Point( p , {
        size: 20
    });

    var p2 = new o.NullPoint({
        modifiers: {
            x: m.iterator(0, 300, 2)
            , y: 100
        }
    })
    circle2 = new o.Point( p2 , {
        size: 20
    });

    this.children.push(circle)
    // this.children.push(circle2)
}

var ready = function(){
    var canvas = new cotton.duck.objects.Surface('main');
    canvas.load(['NullPoint', 'Point'], mouse);
};

cotton.ready(ready)
