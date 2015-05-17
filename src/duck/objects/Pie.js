cotton.ready(function(){

    // new cotton.duck.objects.Point(10,10)
    var Pie = cotton.duck.item('Pie', function(){
        var x,y;

        return {
            __extends: [cotton.duck.Duck]
            , constructor: function(){
                this.constructor.$super.apply(this, arguments);
            }
            , init: function(points, data){
                this.point = points[0]
            }

            , step: function(context, data){
                var ret = {};
                ret.point           = data.point
                ret.radius          = data.size || 10;
                ret.startAngle      = data.startAngle || 0;
                ret.endAngle        = data.endAngle || Math.PI * 2;
                ret.antiClockwise   = ret.antiClockwise || false;
                ret.fillStyle       = ret.fillStyle
               
                if(data.donut !== undefined) {
                    var d = data.donut;
                    if( !it(data.donut).is('array') ) {
                        d = [data.donut]
                    };

                    ret.inners = d;
                } else {
                    ret.inners = [];
                }

                return ret;
            }
            /**
             * Provided to the draaw renderer to present the values within the class.
             * This is isolated from the main class, running within a closed scoped
             * The data is updated within the `step` class. The `draw method should
             * only present these values.
             *
             * @param  {Context} context 2D context provided by the renderer
             * @return {void}         Nothing to return.
             */
            , draw: function(context, data){
                /*
                It's best to define this lightly only drawing should occur.
                Any calculations required should be performed within the
                `step` method. This is to ensure to renderer loop isn't clogged
                and the closed scope ensures less leaking.
                The data object should contain all dynamic values required to
                draw. These values were written during the `step` phase.
                 */
                context.beginPath();
                context.fillStyle = data.fillStyle;
                /* x, y , radius , startAngle, endAngle */
                context.arc(data.point.x
                    , data.point.y
                    , data.radius
                    , data.startAngle
                    , data.endAngle
                    , data.antiClockwise
                );

                for(var i=0; i<data.inners.length; i++) {
                    context.arc(data.point.x
                        , data.point.y
                        , data.inners[i]
                        , data.startAngle
                        , data.endAngle
                        , !data.antiClockwise 
                    );

                }

                context.fill();
                // context.endPath();
            }
        }
    });

    Pie.options = {
        size: Number
        , fillStyle: undefined
        , point: undefined
        , radius: Number
        , startAngle: Number
        , endAngle: Number
        , antiClockwise: Boolean
    }
})
