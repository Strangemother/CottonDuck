# Usage

Without getting into the guts (read [Spindle Plugin]) there is some boilerplate to offer for all a spindle plugin. Yes it's not what we want; but it's been made bread-and-butter simple to use.

---

You'll want to set up your code like this for a single component.

```javascript
;(function(){
    'use strict'

    var run = function(){
        console.log('canvas run')
    }
    /*My very own function space.*/

    return function(){
        // This is the chaining method
        run()
     }
})
// This flavour helps extrapolate from the required code - it's not 
// massive - but it's easily forgotten.
// *Right at the bottom of the file* (Underneath the return function)
//
// Automatic chain.
(function(config){
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

