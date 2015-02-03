# Cotton Canvas

The canvas has been very lightly wrapped, to remove the train of regular boilerplate. It makes no assumptions to how you set up your code, You have a few simple method to work with the draw clock.

You can find all the methods in the `cotton.canvas` object

### create(canvas)

Pass a string or canvas element to return a wrapper ready for Cotton and canvas use. Preferably use the `draw()` function

### draw(canvas, draw)

Pass a valid canvas identifier and a method to render. The loop will be created immediately.

### inspectCanvas

Provide a valid canvas identifier or canvas element to return an object of definition. This content will be used to facilitate the target canvas for a given render.


### animFrame

The browsers animation frame, used to perform the rendering loop. When called this provides endpoints to a single callback for the clock.

`loop()`

The method used as a loop function. This starts the recursive call by the browserAnimationFrame to a function locked loop. Each call checks the `run` flag and calls the render function.

`render(callback)`

Apply and return the active render function. This function is called upon every animation frame iteration.

`run = true`

The run flag to dominate the stop start procedure. If this is set to false, the loop `browserAnimationFrame` will not run. This flag can be set to `false` at any time to stop the rendering loop. This flag is changed by the provided `stop()` and `start()` functions.

`stop()`

Stop the rendering function, switching the `run` flag to `false`

`start()`

Start the rendering and initialize the `loop()`. the `run` is set to `true`
