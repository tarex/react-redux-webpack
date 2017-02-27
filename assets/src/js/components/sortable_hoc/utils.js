'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.arrayMove = arrayMove;
exports.closest = closest;
exports.limit = limit;
exports.getElementMargin = getElementMargin;
function arrayMove(array, previousIndex, newIndex) {
    if (newIndex >= array.length) {
        var k = newIndex - array.length;
        while (k-- + 1) {
            array.push(undefined);
        }
    }
    array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
    return array;
}

var events = exports.events = {
    start: ['touchstart', 'mousedown'],
    move: ['touchmove', 'mousemove'],
    end: ['touchend', 'mouseup']
};

var vendorPrefix = exports.vendorPrefix = function () {
    if (typeof window === 'undefined' || typeof document === 'undefined') return ''; // server environment
    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];

    switch (pre) {
        case 'ms':
            return 'ms';
        default:
            return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
    }
}();

function closest(el, fn) {
    while (el) {
        if (fn(el)) return el;
        el = el.parentNode;
    }
}

function limit(min, max, value) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}

function getCSSPixelValue(stringValue) {
    if (stringValue.substr(-2) === 'px') {
        return parseFloat(stringValue);
    }
    return 0;
}

function getElementMargin(element) {
    var style = window.getComputedStyle(element);

    return {
        top: getCSSPixelValue(style.marginTop),
        right: getCSSPixelValue(style.marginRight),
        bottom: getCSSPixelValue(style.marginBottom),
        left: getCSSPixelValue(style.marginLeft)
    };
}