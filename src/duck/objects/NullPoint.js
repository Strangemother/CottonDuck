cotton.ready(function(){

	// new cotton.duck.objects.NullPoint(10,10)
	var NullPoint = cotton.duck.item('NullPoint', function(){
		console.log('null point')
		return {
			__extends: [cotton.duck.Duck]

			, init: function(coords){
				var xy = this.parse.apply(this, arguments)
				this.setXY(xy);
				console.log('NullPoint', xy[0], xy[1])
			}

			, step: function(context, data) {
				//debugger;
				this.modifiers(context, data)
			}

			/*
			 Parse the arguments into there x/y components.
			 [x,y]
			 x<Number>
			 {x:<Number>, y:<Number>
			 */
			, parse: function(args) {
				// parse x y from the given object
				var _x = 0, _y = 0;
				if(arguments.length == 1) {
					var a = it(args);
					if( a.is('array') ) {
						// x y
						_x= args[0]
						_y= args[1]
					} else if( a.is('number') ) {
						// x
						_x = args;
					} else if( a.is('object') ) {
						// x y
						if( it(args.step).is('function') 
							&& args.type == 'modifier' ) {
							// active.
							this.modifiers().add(args)
						} else if( args.modifiers !== undefined ){
							this.modifiers().addSet(args.modifiers)
						} else {
							_x = args.x;
							_y = args.y;
						}

					}
				} else if(arguments.length == 2) {
					_x = arguments[0]
					_y = arguments[1]
				};

				return [_x,_y]
			}
			, setXY: function(arr) {
				this.x = arr[0]
				this.y = arr[1]
			}
			
			, copy: function(){
				return new this.constructor(this.x, this.y)
			}
		}
	});
});
