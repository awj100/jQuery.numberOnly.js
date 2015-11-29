/*
* jQuery.numberOnly (https://github.com/awj100/jQuery.numberOnly.js)
* v1.2.0
* This plugin allows only the digits 0 to 9 to be typed into an <input /> or <textarea /> element, along with optional extra characters (indicated by their key codes).
* This plugin also optionally allows disabling of the clipboard-related events activities pasting, copying and cutting.
*
* Developed by Andrew Jameson and made available under the MIT License (https://raw.githubusercontent.com/awj100/jQuery.numberOnly.js/master/LICENSE).
*/

(function($) {

    $.fn.numberOnly = function(o) {

        o = $.extend(true, {
            permitted: [],
            canCopy: true,
            canCut: true,
            canEnter: true,
            canPaste: true,
            keyCodeMode: false,
            max: {
                callback: undefined,
                limit: undefined
            }
        }, o);

        this.filter("input, textarea").each(function() {

            var numericKeyCodes = [
                    48, // 0
                    49, // 1
                    50, // 2
                    51, // 3
                    52, // 4
                    53, // 5
                    54, // 6
                    55, // 7
                    56, // 8
                    57 // 9
                ],
                specialKeyCodes = [
                    8, // Backspace
                    9, // tab
                    37, // left-arrow
                    39, // right-arrow
                    46 // Delete
                ],
                permittedKeyCodes = [
                    0
                ].concat(numericKeyCodes).concat(specialKeyCodes).concat(o.permitted),
                numericKeypadKeyCodes = [
                    96,     // "a" & keypad-0
                    97,     // "b" & keypad-1
                    98,     // "c" & keypad-2
                    99,     // "d" & keypad-3
                    100,    // "e" & keypad-4
                    101,    // "f" & keypad-5
                    102,    // "g" & keypad-6
                    103,    // "h" & keypad-7
                    104,    // "i" & keypad-8
                    105     // "j" & keypad-9
                ],
                $this = $(this),
                exceeded = false,
                getNextValue = function(e) {

                    var key,
                        target = e.currentTarget,
                        start = target.selectionStart,
                        end = target.selectionEnd;

                    if (e.charCode) {

                        key = String.fromCharCode(e.which);
                    }
                    else {

                        if (e.which === 8 || e.which === 46) {

                            key = '';

                            if (end === start) {

                                if (e.which === 8) {

                                    start--;

                                } else {

                                    end++;
                                }
                            }
                        }
                        else {

                            return target.value;
                        }
                    }

                    var cur = target.value,
                        val = cur.substring(0, start) + key + cur.substring(end);

                     return val;
                },
                checkAgainstMax = function(e, newValue) {

                    // if a max.limit has been set, add the key-pressed value to the existing value and verify
                    if (o.max && typeof (o.max.limit) === "number") {

                        var exceededToggle = exceeded !== (newValue > o.max.limit);
                        exceeded = newValue > o.max.limit;

                        if (!exceededToggle && !exceeded) {
                            return true;
                        }

                        // if a callback function has been specified then permit the key-press and call that function
                        if (typeof (o.max.callback) === "function") {

                            o.max.callback(exceeded, e, newValue);

                            return true;

                        } else {

                            // no callback function, block the key-press instead
                            e.preventDefault();

                            return false;
                        }
                    }
                };

            // if the permittedKeyCodes has been modified then set 'max.limit' to 'undefined'
            // - permittedKeyCodes already contains all the numbers so any additions will be non-numerical
            if (o.permitted.length) {
                o.max.limit = undefined;
            }

            $this.on("keydown.numberOnly", function(e) {

                /*
                Only Firefox triggers the keypress event for 'special characters' (delete, arrow keys, etc.).
                Checking here, just for the 'special characters', enables cross-browser.
                */

                if (specialKeyCodes.indexOf(e.which) > -1) {

                    var newValue = getNextValue(e);
                    return checkAgainstMax(e, newValue);
                }

            }).on("keypress.numberOnly", function(e) {

                var keyCode = e.which,
                    ctrlCmd = e.ctrlKey || (e.metaKey && !e.ctrlKey); // detect CTRL or ⌘ (MAC)

                // to consider numeric keypad digits, which have the same keyCode as "a" - "j", some additional processing needed
                if (numericKeypadKeyCodes.indexOf(keyCode) > -1) {

                    // keyIdentifier has been deprecated so we'll have to check whether a number has been given, and if so we'll switch keyCode
                    if (!isNaN(e.key)) {
                        switch (parseInt(e.key)) {
                            case 0:
                                keyCode = 48;
                                break;
                            case 1:
                                keyCode = 49;
                                break;
                            case 2:
                                keyCode = 50;
                                break;
                            case 3:
                                keyCode = 51;
                                break;
                            case 4:
                                keyCode = 52;
                                break;
                            case 5:
                                keyCode = 53;
                                break;
                            case 6:
                                keyCode = 54;
                                break;
                            case 7:
                                keyCode = 55;
                                break;
                            case 8:
                                keyCode = 56;
                                break;
                            case 9:
                                keyCode = 57;
                                break;
                        }
                    }
                }

                if (o.keyCodeMode && typeof(console) === "object") {
                    console.log(keyCode);
                }

                if (permittedKeyCodes.indexOf(keyCode) > -1
                    || (ctrlCmd && (keyCode === 97 || keyCode === 65)) // upper- or lower-case "a" - permit 'select all'; we can't stop this being done with the mouse
                    || (ctrlCmd && (keyCode === 118 || keyCode === 86)) // upper- or lower-case "v" - see note at bottom
                    || (ctrlCmd && (keyCode === 99 || keyCode === 67)) // upper- or lower-case "c" - see note at bottom
                    || (ctrlCmd && (keyCode === 120 || keyCode === 88)) // upper- or lower-case "x" - see note at bottom
                    || (o.canEnter && (keyCode === 13 || keyCode === 86))) {


                    // if a max has been set, add the key-pressed value to the existing value and verify
                    if (o.max && typeof (o.max.limit) === "number") {

                        var newValue = getNextValue(e);
                        return checkAgainstMax(e, newValue);
                    }

                    return true;
                }

                // if the key pressed does not represent any of the permitted keys or key combinations then stop the event
                e.preventDefault();

                return false;

            });

            if (!o.canCopy) {

                this.oncopy = function(e) {
                    e.preventDefault();
                };
            }

            if (!o.canCut) {

                this.oncut = function(e) {
                    e.preventDefault();
                };
            }

            if (!o.canPaste) {

                this.onpaste = function(e) {
                    e.preventDefault();
                };

            } else {

                // if values can be pasted then we need to prevent non-permitted values
                this.onpaste = function(e) {

                    if (e && e.clipboardData && e.clipboardData.getData) {

                        var pastedData = e.clipboardData.getData("text/plain"),
                            keyCodes = permittedKeyCodes.concat(o.permitted).join(),
                            i = pastedData.length,
                            target = e.currentTarget,
                            start = target.selectionStart,
                            end = target.selectionEnd;

                        while (i--) {
                            if (keyCodes.indexOf(pastedData.charCodeAt(i)) === -1) {
                                e.preventDefault();
                            }
                        }

                        if (typeof (o.max.limit) === "number") {

                            // append the pasted value to the existing value
                            var cur = target.value,
                                val = cur.substring(0, start) + pastedData + cur.substring(end);

                            checkAgainstMax(e, val);
                        }
                    }
                };
            }
        });

        return this;
    };
})(jQuery);



/*
 * Implementation differences between browsers mean that the 'oncopy', 'oncut' and 'onpaste' events sometimes fire before the keypress event, and sometimes after.
 * To prevent this event-ordering causing a problem, this script always allows CTRL+C, CTRL+V and CTRL+X in the keypress stage, and then deals with the
 * specified preference in the 'oncopy', 'oncut' or 'onpaste' event.
*/
