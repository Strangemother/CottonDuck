# Spindle

The spindle runs at the very core of cotton. It allows for a configure base for the loading object.

By using spindle we have a ready platform to read and extend objects, with callbacks to boot. Add to your HTML

## Usage

There isn't much to scare you with. Spindle lives without a global namesspace. You need to send an event and have a listener in place. This is done with
standard events.

```javascript
;(window['addEventListener'] ? window.addEventListener: window.attachEvent)('Spindle:apples', function(event) {
    console.log('Spindle', event.detail)
});

window.dispatchEvent(
    new CustomEvent('Spindle:get', {
        detail: {
            name: 'apples'
        }
    })
);
```

The event contains everything you need to configure upon. If you want to be lazy - you can use the generic event.

```javascript
;window.addEventListener('Spindle', function(event) {
    console.log('Spindle', event.detail)
});

window.dispatchEvent(new Event('Spindle:get'));
```


## Tools

Spindle provides much of the heavy lifting when makeing frameless projects:

+ Simple to use build in (vanilla) events
+ It has no feet to step on your code
+ set of very useful object extension tools

These tools are designed for you to make a config object, to then run your library bits. There is no core framework to build on - just a very simple tool to help your library boot.

## Booting.

The Spindle runs without configuration, simply dropping it into a file, it will run silently. 

+ There is no global namespace - util `init()` occurs
+ The settings are not applied until `init`
+ default window namespace is `Spindle`
+ Talk to spindle (before handle) with events


## Boot Usage 

1. Add an event listener,
2. dispatch a request event
3. run your code

Funnily enough there is an exact example, essentially everything to boot your plugin.

```javascript
;(window['addEventListener'] ? window.addEventListener: window.attachEvent)
('spindle:apples', function(event) {
    var core = event.detail.namespace;
    var spindle = event.detail.spindle;
    var utils = event.detail.utls;

    core.setConfig('namespace', 'mylib');
    core.ready(function(){
        console.log('my plugin')
    });

    core.init()
});

window.dispatchEvent(
    new CustomEvent('spindle:get', {
        detail: { name: 'apples' }
    })
);
```

You'll now find `mylib` in the global namespace, along with all the prebuilt options ready.

```javascript
mylib {
    0: function
    , built: true
    , getUtil: function
    , getConfig: function
    , setConfig: function
    , ready: function
    , value
}
```

The example code would run this sequence in the console


+ readyhook Object 
+ wait on init 
+ (our call `core.init()`)
+ Spin mylib
+ execute
+ Calling Callback
+ my plugin

Our configration is performed. We're ready to implement a completely event driven plugin system.

# Extending

To the point, Spindle is designed to be as invisible as possible. After one event configuration, you can own the rest. With this, Spindle implements it's plugins in the same manner for your API.
