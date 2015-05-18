;(function(){
    'use strict'

this.Modifier = Class(function(){

    return {
        name: 'modifier'
        , type: 'modifier'
        , constructor: function(){
            if(arguments.length > 0) {
                this.setArgs.apply(this, arguments);
            }
        }

        , id: function(){
            if( !this._id) {
                this._id = Number( String(Math.random()).split('.')[1] ).toString(32);
            };

            return this._id;    
        }

        , setArgs: function(args) {
            // Provide the initial arguments to run this modifier.
        }
    }
});

var caller = function(Klass){
    /*
    Call the class into existence through use of a function implemented
    at API level.
    Modifier
     */
    
    var runClass = function(_Klass, args, scope) {
        // Provides the _Klass to boot, 
        // Arguments ran for this klass
        // original scope provided for functional scope.
        var modifier = new _Klass()
        modifier.setArgs.apply(modifier, args)
        return modifier
    }

    // Return callback with class for use.
    return (function(){
        /* Start the class providing init method data */
        var self = this;
        var C = self.Klass;

        return function(){
            return runClass.apply(self, [C, arguments, self])
        };

    }).apply({
        Klass: Klass
    })
}

var Iterator = Class([this.Modifier], function(){
    return {
        name: 'iterator'
        , setArgs: function(start, finish, step) {
            // Provide the initial arguments to run this modifier.
            if(arguments.length == 1) {
                finish = start;
                start = undefined;
            }
            this.stepCount = step || 1;
            this.start = start || 0;
            this.finish = finish || 500;
            this._count = 0;
        }

        , step: function(ctx, layers, data){
            this._count+=this.stepCount;
            if(this._count>this.finish){
                this._count = this.start;
            }

            this._x = this._count;
            this._y = this._count;
        }
        , point: function(value, point, data){
            // console.log('call point', value)
            return { x: this._x, y: this._y }
        }
    }
});

this.modifiers = {
    iterator: caller(Iterator)
}


}).apply(__duckCache)
