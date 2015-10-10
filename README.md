# jQuery.numberOnly.js
A jQuery plugin to permit only numerical digits and specified other characters being entered into an HTML element.

## Usage
Simply add a call to `numberOnly` on any jQuery selecter:

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
* `max`: an integer indicating the maximum value allowable. Default `undefined`.
* `maxExceededClass`: a string denoting a CSS class which shall be added to the DOM element should the specified `max` value be exceeded. **Note:** If a `max` value is specified without any value specified for `maxExceededClass`, the DOM element will not permit any values to be typed or pasted if such an action would cause the value of the element to exceed `max`. However, if `maxExceededClass` _does_ have a CSS class (_i.e._, a string value) then the DOM element _will_ permit further values to be typed or pasted, even after the `max` value has been exceeded. In this latter case, the specified `maxExceededClass` value will be added to the DOM element. Default `undefined`.

#### Examples
The following snippet demonstrates how to run **jQuery.numberOnly** on all elements with the CSS class "*number-only*", while also specifying that hyphens (`-`) are permitted but that pasting is *not* permitted.

```
$(".number-only").numberOnly({
  permitted: [45],  // 45 is the character code for '-'
  canPaste: false
});
```

Here, we specify that the `max` value permitted is 100. In this case, because `maxExceededClass` has not been specified, the DOM element will permit no further values to be typed or pasted if such an action would cause the DOM element to contain a value greater than 100.

```
$(".number-only").numberOnly({
  max: 100
});
```

In this example, we specify that the `max` value permitted is 100, as well as specifying a CSS class to be added to the DOM element should its value exceed 100. Because a CSS class has been specified, the DOM element will _not_ prevent additional values from being appended to the existing value.

```
$(".number-only").numberOnly({
  max: 100,
  maxExceededClass: "exceeded"
});
```

## Copyright and Licensing
Copyright © 2015 Andrew Jameson, released under the [MIT license](https://raw.githubusercontent.com/awj100/jQuery.numberOnly.js/master/LICENSE).
