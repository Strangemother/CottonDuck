# Clock

The ensure speed and division of code, assigning to the running browser animation frame is performed by a central clock. This clock dispatches events at the the correct time. Your canvas items (preferably Ducks) will hear a clock event and initiate a draw.

There are two types of clock. A standad `clock` dispatches events at a given time. A `CanvasClock` has a `draw` method to implement functions for listening. The `draw(context)` is provided with the context of the `canvas` provided to the clock during instanstiation.

## Usage

Making a clock is easy, here we show framework specific listeners, but their but upon vanilla events so you can write your own windoe listeners.

    var clock = new cotton.duck.objects.Clock('bob')
    core.events.on('clock:bob', function(){ console.log(arguments); })

We've called our `Clock` `bob` and we listen for '`clock:bob`' event. The renderer uses this to write render frames at the correct time. 

## Canvas Clock

Making a clock is easy. If your using Duck components, you probably don't need to worry about the clock.

    var clock = new cotton.duck.objects.CanvasClock('main', 'render')
    clock.draw = function(context) {
        // canvas stuff.
    }

The two arguments, `main`, the name of my canvas and `render` is the name of the clock. The name can be anything.

You can alter the context of the CanvasClock by providing a new canvas to render to:

    clock.canvas('other_canvas')

---

# Why a clock?

Under the hood, we us `cotton.canvas` wrapper for the canvas itself. There is little or nothing between the core canvas and the end `draw`. 

The aim of Cotton Duck to be lean doesn't just mean the internal code. Providing an API of which is designed to be implemented super easy is the goal.

---

The important part, "Browser Rendering Frame" (of which is wrapped using `cotton.canvas`) runs at the right speed for your machine. The `Clock` aheres to this, ensure the run speed of the canvas element you make is correctly written.

So - you don't worry about when the clock should occur - only that it is running.

## More Clock.

Using a standard clock helps with:

+ Connecting many animation functions to run at the same time
+ agnostic events ensure everytrhing runs smooth
+ central point of speed altering.

Canvas clock given your much more:

+ `draw` function to directly hook to a canvas context
+ the right frame rate
+ a *logic*, *render* buffer - to stop bottlenecks
