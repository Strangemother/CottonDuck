# Plugins

The point of Spindle is to provide you with a plugin box - allowing you to make small components to build a big object.

Here is an example of a plugin loadout:

```javascript
;(function(config){
    'use strict'

    var listen = window['addEventListener'] ? window.addEventListener: window.attachEvent
        , scripts = document.getElementsByTagName("script")
        , script = scripts[scripts.length - 1]
        , core, spindle, utils
        ;

    var ready = function(){
        console.log('Ready', config.name);
    }

    var main = (function(){
        listen('spindle:' + config.name, function(event){
            core    = event.detail.namespace;
            spindle = event.detail.spindle;
            utils   = event.detail.utils;
            core.ready(ready);
        });

        window.dispatchEvent(new CustomEvent('spindle:get', {
            detail: { name: config.name }
        }));

    }).call(this)

}).call(window, {
    name: 'canvas'
})
```

It's not as scary as it looks, it's just verbose - and covers everything you need to start a pre-boot plugin.

## The top

```javascript
// Safe sandbox
;(function(config){
    'use strict'
    // used for accessing Spindle
    var listen = window['addEventListener'] ? window.addEventListener: window.attachEvent
        // Know which file is loaded (me)
        , scripts = document.getElementsByTagName("script")
        , script = scripts[scripts.length - 1]
        // Some namespaces for ease
        , core, spindle, utils
        ;
```

This provides a safe sandbox, hooks the right event, knows which script it was and adds namespaces for when these items turn up.

## Main

The `main` function does all the heavy lifting:

```javascript
var main = (function(){
        // Add an event listener for when we ask for it
        listen('spindle:' + config.name, function(event){
            // Spindle Answered! here are our parts.
            core    = event.detail.namespace;
            spindle = event.detail.spindle;
            utils   = event.detail.utils;
            // add a ready function so we know when it's booted.
            core.ready(ready);
        });
    
        // Go ask for spindle!
        window.dispatchEvent(new CustomEvent('spindle:get', {
            detail: { name: config.name }
        }));
    // Executes without calling it, passing the parent scope
    }).call(this)
```

Spindle lives inside a sandbox, so it may be hard to grab onto. It's done this way so it's safe and invisible. The main function performs the round trip and calls a handler when done.

You don't need to work with any hard points, You get a big config object to play with.
