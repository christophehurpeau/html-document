'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

var _Text = require('../Text');

var _Text2 = _interopRequireDefault(_Text);

var _DOMException = require('../DOMException');

var _DOMException2 = _interopRequireDefault(_DOMException);

/** @function 
* @param source 
* @param dest */

function cloneArguments(source, dest) {
    for (var _iterator = source.attributes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var attr = _ref;

        dest.setAttribute(attr.name, attr.value);
    }
}

/** @function 
* @param element 
* @param deep */function cloneElementNode(element, deep) {
    var clone = element.ownerDocument.createElement(element.nodeName);
    clone._ownerDocument = element._ownerDocument;
    clone._parentNode = null;
    cloneArguments(element, clone);

    if (deep) {
        element.childNodes.forEach(function (child) {
            return clone.appendChild(cloneAnyNode(child, deep));
        });
    }

    return clone;
}

/** @function 
* @param fragment 
* @param deep */function cloneDocumentFragment(fragment, deep) {
    var clone = fragment.ownerDocument.createDocumentFragment();

    if (deep) {
        fragment.childNodes.forEach(function (child) {
            return clone.appendChild(cloneAnyNode(child, deep));
        });
    }

    return clone;
}

/** @function 
* @param element */function cloneTextNode(element) {
    return new _Text2['default'](element.value);
}

/**
 * Function return copy of element and if request deep copy of element
 *
 * @param {ParentNode|Node} element
 * @param {boolean} deep
 * @ignore
 
* @function 
* @param element 
* @param deep */
function cloneAnyNode(element, deep) {
    switch (element.nodeType) {
        case _Node2['default'].DOCUMENT_FRAGMENT_NODE:
            return cloneDocumentFragment(element, deep);
        case _Node2['default'].ELEMENT_NODE:
            return cloneElementNode(element, deep);
        case _Node2['default'].TEXT_NODE:
            return cloneTextNode(element);
        default:
            throw new _DOMException2['default'](_DOMException2['default'].DATA_CLONE_ERR);
    }
}

exports.cloneAnyNode = cloneAnyNode;
exports.cloneElementNode = cloneElementNode;
exports.cloneTextNode = cloneTextNode;
//# sourceMappingURL=cloneNodeHelper.js.map