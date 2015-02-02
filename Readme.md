# Cotton Duck.

Implementing basic canvas for developers. Focusing on an Object API instead of frame drawing. This allows fast canvas prototyping using a clear simple object API. 

## Cotton

Simple super thin wrapper, convering all the basics of the canvas. A low level exposure to a `draw()` method provides you all the basic implementation. The extras (albeit not extensive) are performed. 

+ Remove the need to frame count
+ Basic tooling for instant exposure to the draw API
+ simple to configure and work upon

## Duck

The Cotton is just a small part. A simple start is brilliant. Now this exists - Duck allows a simple drawing API, exposing very simple canvas objects with an extendable API.

No more hassling with GamePads, LEAP Motions and mouse input. All these are covered in very basic canvas entities.

+ Low level is covered.
+ Super clean API providing a logic/rendering cycle and framerate managing
+ easily extend and import live object
+ Basics are covered with hardware for your browser

### Why not X?

No! X is great. I especially love Three.js. But with all these big beautiful libraries I can't do basic canvas. Sometimes I want two lines to canvas, Or I want to draw my own canvas thing. As I already know canvas, I just want a plain API

#### The logical bits.

I extend from a Flash/AS3 background. Snuffers may snuff - but it was excellent. The developer platform was extensive and glorious. Basic drawing was fast; advanced drawing was extendable. 

In my javascript drawing world - I don't have a 'pick-up-a-brush' API for that quick idea; I must consider (lots of great) libraries I choose for a task. My idea is lost in framework specific logic.

`Cotton` is the wrapper I need to start drawing to the canvas; with the very basics all started.
`Duck` provides a cheap, extended and easy API. A basic Point extends to Circle. 
The importable parts are integrated to my favorite device - Allowing me to focus on my fancy Jump sequence, rather than mapping mouse/keyboard with hard drawing.


### What you get

`CottonDuck` Provides a simple API to both. A bare-bones starting block with a clean object API on top. I can focus on spinning my pentagon, rather than managing its draw routines.

The API is specially designed to be super quick. Providing a slick data and draw rendering clocks. The classy structure API provides a tight enough implementation for you to use both without changing your code.
