// ==UserScript==
// @name         BookKit Algorithm Wrapper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  It wraps and unwraps BookKit Algorithm elements for you. Tested in Firefox 69.0 + Tampermonkey 4.9.5941. Usage: Press CTRL + ALT + SHIFT + W to wrap or CTRL + ALT + SHIFT + D to unwrap all elements. If you want to change these shortcuts, you must change the code below.
// @author       Monika
// @match        https://uuos9.plus4u.net/uu-bookkitg01-main/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.onkeyup = function(e) {
        var key = e.which || e.keyCode;
        if (e.ctrlKey && e.altKey && e.shiftKey && key === 87) { // CTRL + ALT + SHIFT + W (ASCII number)
            wrapAll();
        } else if (e.ctrlKey && e.altKey && e.shiftKey && key === 68) { // CTRL + SHIFT + ALT + D (ASCII number)
            unwrapAll();
        }
    }
    console.log("[BookKit Algorithm Wrapper] Key bindings registered!");

    function unwrapAll() {
        console.log("[BookKit Algorithm Wrapper] Unwrapping all algorithm elements...");
        var elements = document.getElementsByClassName("uu-uuapp-designkit uu-uuapp-designkit-statement");
        for(var i = 0; i < elements.length; i++) {
            let wrappingButton = getFirstChild(elements[i], 6);
            if (wrappingButton != null && wrappingButton.children.length > 0) {
                if (getFirstChild(wrappingButton, 1).classList.contains("mdi-menu-right")) {
                    wrappingButton.click();
                }
            }
        }
        console.log("[BookKit Algorithm Wrapper] Unwrapping done!");
    }

    function wrapAll() {
        console.log("[BookKit Algorithm Wrapper] Wrapping all algorithm elements...");
        var elements = document.getElementsByClassName("uu-uuapp-designkit uu-uuapp-designkit-statement");
        for(var i = elements.length - 1; i >= 0; i--) {
            if (i >= elements.length) {
                i = elements.length - 1; // Elements will shorten, this will avoid null pointer exception.
            }
            let wrappingButton = getFirstChild(elements[i], 6);
            if (wrappingButton != null && wrappingButton.children.length > 0) {
                if (getFirstChild(wrappingButton, 1).classList.contains("mdi-menu-down")) {
                    wrappingButton.click();
                }
            }
        }
        console.log("[BookKit Algorithm Wrapper] Wrapping done!");
    }

    function getFirstChild(parent, depth) {
        if (parent != null && typeof parent === "object" && parent.children != null && typeof parent.children === "object"
            && parent.children.length != null && typeof parent.children.length === "number" && parent.children.length > 0
            && depth != null && typeof depth === "number" && depth > 0) {

            if (depth === 1) {
                return parent.children[0];
            } else {
                return getFirstChild(parent.children[0], depth - 1);
            }
        } else {
            return null;
        }
    }
})();