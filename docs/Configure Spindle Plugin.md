# Configuring

You can configure a Spindle plugin as it get created. During the `ask` evenbt phase, you sent a custom event. This is default browser behaviour, so we can add more to this in otrde rto congiure how spindle accepts the incoming plugin.

## Ask for more.

When you ask for a a reference, you send a 'spindle:get'. In return `spindle:plugin-name` is dispatched. Obviously `plugin-name` is hot swappable.

This ensures Spindle responds to the right plugin during the event phase. It's done on top of vanilla events because:

+ It's the fastest
+ works on all browsers
+ you can do you own thing

---

We can use this to leverage more use out of spindle. Extending the event object you send can congiure before you need to integrate

> This is just a useful way to pre-configuree the core Spindle. You can also do the same changes without sending event data.

Here is an example of an event for `cotton.canvas.js`:

```javascript
window.dispatchEvent(new CustomEvent('spindle:get', {
    detail: {
        name: 'canvas'
        , space: true
    }
}));
```

By sending `space` as `true`, Spindle will create a object namespace in the core namespace provided when done. In this example the result would look like:

```javascript
>>> cotton.canvas
Object {name: "canvas"}
```


We can also rename the provided namespace (to anything but the boolean):

```javascript

window.dispatchEvent(new CustomEvent('spindle:get', {
    detail: {
        name: config.name
        , space: 'apples'
    }
}));

>>> cotton.apples
Object {name: "apples"}
```

---

This is a convenient way to create a location to store user defined variables, or nested functions
