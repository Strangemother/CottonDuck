/**
 * This file is the support file for the Gesso js library. In this file assets
 * are imported and run to display examples and basic settings. 
 *
 * These examples are designed to cover the basic aspects of the application; 
 * the code examples are mostly designed for clarity and simplicity so they
 * do not represent the best format for your code or a correct style.
 *
 */

/*
Using the live loader to import jQuery. Once this is complete, the `gotQuery`
method id run of which presents the interface buttons.
 */
ljs.load('vendor/jquery-1.11.0.min.js', function(){
		gotJquery()
	})

done=false;

gotJquery = function(){
	// only perform this action once. 
	if(done) return;

	examples 				= {};
	examples.line 			= line;
	examples.circle 		= circle;
	examples.rectangle 		= rectangle;

	examples.point 			= point;
	examples.padPoint 		= padPoint;
	examples.gyroPoint 		= gyroPoint;
	examples.mouse 			= mouse;

	examples.atoms 		= atoms;
	examples.gravity 		= gravity;
	examples.orbit 			= orbit;
	examples.orbitConnector = orbitConnector;
	examples.space 			= space;

	examples.game 			= game;
	examples.clock 			= clock;
	examples.sound 			= sound;

	/*
	We create a button for each example method applied to the `examples` object.
	Each button is coded to present the example name as the button text and
	the resulting action called when the button is clicked.
	*/
	for (var example in examples) {
		if (examples.hasOwnProperty(example)) {
			// pick the method from the examples
			var method = examples[example];
			// make and place a button
			$('<button/>', {
				id: example,
				text: example
			}).appendTo('.buttons');
		}
	}

	// Add a clicker to the buttons.
	$('.buttons button').click(function(){
		var exampleId = $(this).attr('id');
		examples[exampleId]();
	});

	done=true;
};

var main = function(){
	// called at the bottom
	// line();
	// circle();
	// rectangle();
	// padPoint();
	// point();
	// mouse();
	// gyroPoint()
	// orbit();
	// orbitConnector();
	// sound();
};

var sound = function(){
	var count = 1024;
	spec = []

	for (var i = count - 1; i >= 0; i--) {
		spec.push(new G.Rectangle(gesso, {
				point: new Point(i, 100),
				width: 1, 
				height: 10,
				color: 'red',
				stoke: 0
			}) 
		);
	};

	whistle.init();
    document.addEventListener("whistle", function() { 
    	console.log("whistled!"); 
    }, false);
}

var game = function(){


	er = new G.PadPoint(gesso, {
		color: 'red',
	});
	
	
	SUN = new G.GravityPoint(gesso, {
		mass: 50,
		fixed: true,
		x: gesso.centerWidth,
		y: gesso.centerHeight
	});

	cr = new G.Circle(gesso, {
		// point: er.point,
		color: 'transparent',
		degrees: 90,
		orientation: 90 + 45,
		x: function(){
			return er.point.x
		},
		y: function(){
			return er.point.y
		},
	})

	return 
	gravity()
};

var gyroPoint = function() {
	gpp = new G.GyroPoint(gesso);
};

/*
The first example of accepting input from an external source augements Gamepad.js
allowing the control of an element using a gamepad controller through the Browser.
This example will only work on modern browsers with the game controller api.
 */
var padPoint = function(){
	gpp = new G.PadPoint(gesso);
};

var point = function(){
	p = new G.Point(gesso)
}

var gravity = function(count, size, color){
	var gps = []
		, s = size
		, c = count || 10;

	for (var i = c - 1; i >= 0; i--) {
		size = (!s)? .2 + (Math.random() * .5): s;
		console.log("size", size)
		gps.push( new G.GravityPoint(gesso, {
			x: 100 + Math.random() * gesso.width,
		 	y: 100 + Math.random() * gesso.height, 
		 	mass: size,
		 	size: size * 3,
		 	color: color || 'white'

		 }) );
	};
}

var atoms = function(){
	gesso.backgroundColor('black');	
	gravity(20, .1);
}

/**
 * Draw a line to the interface using a basic 4 point matrix.
 *
 * Draw a line to the interface using a Point element referencing 4 points.
 */
var line = function(){
	//sle = new G.Line(gesso, { 
	//	point: { 
	//		x1: 100, y1: 150, 
	//		x2: 200, y2: 600
	//	} 
	//});
	// debugger
	l = new G.Line(gesso, {
		point: new Point(100, 100, 100, 600)
	});

};

var rectangle = function(){
	rect = new G.Rectangle(gesso, {
		x: gesso.centerWidth - 100, 
		y: 100, 
		width: 200, 
		height: 200,
		strokeStyle: 'black',
		stoke: 1
	});

	// rect.animate('width', 280, 3);
	// rect.animate('height', 400, 4);
	// rect.animate('x', gesso.centerWidth - 140, 5);
	// rect.animate('y', gesso.centerHeight - 200, 9);

	return rect
};

var circle = function(){
	cp = new G.Circle(gesso, {
		x: gesso.centerWidth
		, y: gesso.centerHeight
	})
};

var mouse = function(){
	mp = new G.MousePoint(gesso);
};


main()