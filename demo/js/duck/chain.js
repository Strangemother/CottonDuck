var NullPoint;
var _p = function(x,y) {
    return (new NullPoint(x,y));
}

var chain = function(c) {
    var i
        , arr = []
        , padding = 20
        ;

    for(i=0; i<c; i++) {
        x = padding * i + (i * (2 % .9) + 10)
        y = padding * (i * 2 % .8) + i
        arr.push( _p(x, y) )
    }

    return arr;
}

var line = function(o){
    var l = new o.Line( chain( 26), {
        width: 3
    });

    this.children.push(l);
}

var ready = function(){
    var canvas = new cotton.duck.objects.Surface('main');
    
    canvas.load(['NullPoint'], function(o){
        NullPoint = o.NullPoint;
        canvas.load(['Line'], line);
    });
};

cotton.ready(ready)
