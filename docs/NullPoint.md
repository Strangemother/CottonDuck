# NullPoint

The nullpoint is the starting block for any given on screen duck item. This contains the basic position and is supplied to anything needing an X and Y.

As your code progresses your null point may bcome more advance. For now lets look at using a basic point.

```javascript
var NullPoint = cotton.duck.item('NullPoint');
var Point = cotton.duck.item('Point');
var np = new NullPoint(10, 20);
var dot = new Point(np);

dot.point.x
// 10
```

And that's it! Everything to generate a point on the canvas. The null point will be referenced for any position knowledge. 

---

### Understanding a NullPoint

Although it has Null in the name it's very important. It contains the position for the object needing to be seen on the canvas. Without a solid place of reference for positioning, the Point object (and anything else needing a position) would be really ugly to code.

So remember some short rules to make it easy

+ Everything needs a NullPoint
+ You cannot render a NullPoint directly
+ All positioning lives in a NullPoint
