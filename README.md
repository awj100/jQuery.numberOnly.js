# jQuery.numberOnly.js
A jQuery plugin to permit only numerical digits and specified other characters being entered into an HTML element.

## Usage
Simply add a call to `numberOnly` on any jQuery selecter:

**Important:** v.1.2.0 is not fully backward-compatible with v1.1.0: the `max` and `maxExceededClass` options have been refactored. See the **Options** section below.

```
$(".number-only").numberOnly();
```

#### Notes on usage
* Although **jQuery.numberOnly** works only on `<input/>` and `<textarea/>` elements, it also fully supports chaining on *all* elements returned by the specified selecter, whether or not **jQuery.numberOnly** is running on them.
* **jQuery.numberOnly** will not prevent the action of certain operational keys. This includes `<Backspace>`, `<Del>`, `←` and `→`.

## Options
**jQuery.numberOnly** contains several options, as well as permitting only numbers to be specified.
* `permitted`: accepts an array of character codes denoting characters which are permitted alongside numerical digits. (See the example below.)
* `canCopy`: a boolean parameter indicating whether the value in the DOM element may be copied to the clipboard. Default: `true`.
* `canCut`: a boolean parameter indicating whether the value in the DOM element may be cut to the clipboard. Default: `true`.
* `canEnter`: a boolean parameter indicating whether hitting `<Enter>` will propagate a DOM event.
* `canPaste`: a boolean parameter indicating whether the value in the clipboard may be pasted to the DOM element. When pasting, the value in the clipboard is subject to the same rules as when typing. Default: `true`.
* `keyCodeMode`: when set to `true`, typing *any* key will result in that key's character code being written to the browser's console. The intention is to make it easier to add to the `permitted` array of permitted characters. **NOTE**: This is *not* included in the minified version. Default: `false`.
* `max`: an object containing the following properties
  * `limit`: a number specifying a threshold value. Default: `undefined`.
  * `callback`: a function which will be called when `limit` is both exceeded and, should `limit` have been exceeded, again when the value no longer exceeds `limit`. Default: `undefined`.

    The function will be passed the following arguments:
    * `exceeded`: a boolean value indicating in which direction the value has crossed the threshold (`true` = greater than `limit`, `false` = less than or equal to `limit`).
    * `e`: the [jQuery event object](https://api.jquery.com/category/events/event-object/). From this can be obtained the context DOM element.
    * `newVal`: the latest value in the context DOM element.

#### Examples
The following snippet demonstrates how to run **jQuery.numberOnly** on all elements with the CSS class "*number-only*", while also specifying that hyphens (`-`) are permitted but that pasting is *not* permitted.

```
$(".number-only").numberOnly({
  permitted: [45],  // 45 is the character code for '-'
  canPaste: false
});
```

Here, we specify that the `max.limit` value permitted is 100. In this case, because `max.callback` has not been specified, the DOM element will permit no further values to be typed or pasted if such an action would cause the DOM element to contain a value greater than 100.

```
$(".number-only").numberOnly({
  max: {
    limit: 100
  }
});
```

In this example, we specify that the `max.limit` value permitted is 100, as well as specifying a callback function to be called when `limit` is exceeded. Because a callback has been specified, the DOM element will _not_ prevent additional values from being appended to the existing value.

```
$(".number-only").numberOnly({
  max: {
    limit: 100,
    callback: function(exceeded, e, newVal) {
				if (exceeded) {
					console.log("exceeded with value " + newVal);
					$(e.currentTarget).addClass("error");
				} else {
					console.log(newVal + " is acceptable");
					$(e.currentTarget).removeClass("error");
				}
  }
});
```

In this last example, we again specify that the `max.limit` value permitted is 100 and a callback function which, unlike the previous example, will prevent additional key-presses from being displayed if `max.limit` is exceeded.

```
$(".number-only").numberOnly({
  max: {
    limit: 100,
    callback: function(exceeded, e, newVal) {
				if (exceeded) {
					console.log("exceeded with value " + newVal);
					e.preventDefault();
				} else {
					console.log(newVal + " is acceptable");
				}
  }
});
```

## Copyright and Licensing
Copyright © 2015 Andrew Jameson, released under the [MIT license](https://raw.githubusercontent.com/awj100/jQuery.numberOnly.js/master/LICENSE).
