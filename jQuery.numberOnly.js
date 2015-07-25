/*
* This plugin allows only the digits 0 to 9 to be typed into an <input /> or <textarea /> element, along with optional extra characters (indicated by their key codes).
* This plugin also optionally allows disabling of the clipboard-related events activities pasting, copying and cutting.
* 
* Developed by Andrew Jameson and made available under the MIT License (https://raw.githubusercontent.com/awj100/jQuery.numberOnly.js/master/LICENSE).
*/

(function($) {

	$.fn.numberOnly = function(o) {

	        o = $.extend({
	            permitted: [],
	            canCopy: true,
	            canCut: true,
	            canEnter: true,
	            canPaste: true,
				keyCodeMode: false
	        }, o);
			
	        this.filter("input, textarea").each(function() {
	
			var permittedKeyCodes = [
						0,
						8,	// Backspace
						37,	// left-arrow
						39,	// right-arrow
						46,	// Delete
						48,	// 0
						49,	// 1
						50,	// 2
						51,	// 3
						52,	// 4
						53,	// 5
						54,	// 6
						55,	// 7
						56,	// 8
						57	// 9
					].concat(o.permitted);
	
	            	$(this).on("keypress", function(e) {
	
				var keyCode = e.keyCode || e.which,
					ctrlCmd = e.ctrlKey || (e.metaKey && !e.ctrlKey);  // detect CTRL or ⌘ (MAC)
		
				if (o.keyCodeMode && typeof(console) === "object") {
					console.log(keyCode);
				}
		
		                if (permittedKeyCodes.indexOf(keyCode) > -1
					|| (ctrlCmd && (keyCode === 97 || keyCode === 65))       // upper- or lower-case "a" - permit 'select all'; we can't stop this being done with the mouse
					|| (ctrlCmd && (keyCode === 118 || keyCode === 86))       // upper- or lower-case "v" - see note at bottom
					|| (ctrlCmd && (keyCode === 99 || keyCode === 67))         // upper- or lower-case "c" - see note at bottom
					|| (ctrlCmd && (keyCode === 120 || keyCode === 88))         // upper- or lower-case "x" - see note at bottom
					|| (o.canEnter && (keyCode === 13 || keyCode === 86))) {
		
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
	
			// if values can be pasted then we need to prevent non-permitted values
			if (o.canPaste) {
				this.onpaste = function(e) {
					if (e && e.clipboardData && e.clipboardData.getData) {
						var pastedData = e.clipboardData.getData("text/plain"),
							keyCodes = permittedKeyCodes.concat(o.permitted).join(),
							i = pastedData.length;
						while (i--) {
							if (keyCodes.indexOf(pastedData.charCodeAt(i)) === -1) {
								e.preventDefault();
							}
						}
					}
				};
			} else {
				this.onpaste = function(e) {
					e.preventDefault();
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
