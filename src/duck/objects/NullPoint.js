console.log('NullPoint ready')
cotton.ready(function(){

	// new cotton.duck.objects.NullPoint(10,10)
	cotton.duck.item('NullPoint', function(){
		console.log('null point')
		return {
			__extends: [cotton.duck.Duck]

			, init: function(coords){
				var xy = this.parse.apply(this, arguments)
				this.setXY(xy);
				console.log('NullPoint', xy[0], xy[1])
			}

			, parse: function(args) {
				// parse x y from the given object
				var _x = 0, _y = 0;
				if(arguments.length == 1) {
					var a = it(args);
					if( a.is('array') ) {
						// x y
						_x= a[0]
						_y= a[1]
					} else if( a.is('number') ) {
						// x
						_x = a;
					} else if( a.is('object') ) {
						// x y
						_x = a.x;
						_y = a.y;
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
		}
	});
})
