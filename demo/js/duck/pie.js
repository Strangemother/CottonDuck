var NullPoint;
var _p = function(x,y) {
    return (new NullPoint(x,y));
}

var pie = function(o) {
    myPie = new o.Pie( _p(100, 100) , {
        size: 100
        , donut: 50
    });

    this.children.push(myPie)
}

var ready = function(){
    var canvas = new cotton.duck.objects.Surface('main');
    
    canvas.load(['NullPoint'], function(o){
        NullPoint = o.NullPoint;
        canvas.load(['Pie'], pie);
    });
};

cotton.ready(ready)
