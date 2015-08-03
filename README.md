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

#### Example
The following snippet demonstrates how to run **jQuery.numberOnly** on all elements with the CSS class "*number-only*", while also specifying that hyphens (`-`) are permitted but that pasting is *not* permitted:

```
$(".number-only").numberOnly({
  permitted: [45],  // 45 is the character code for '-'
  canPaste: false
});
```

## Copyright and Licensing
Copyright © 2015 Andrew Jameson, released under the [MIT license](https://raw.githubusercontent.com/awj100/jQuery.numberOnly.js/master/LICENSE).
