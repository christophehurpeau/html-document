/**
 * Class provides interface for HTLMCollection. Used in getElementsByTagName etc.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
 */
"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

Object.defineProperty(exports, "__esModule", {
    value: true
});
/** @class HTMLCollection 
* @param parent 
* @param selector */
var HTMLCollection = (function (_Array) {
    _inherits(HTMLCollection, _Array);

    function HTMLCollection(parent, selector) {
        _classCallCheck(this, HTMLCollection);

        _get(Object.getPrototypeOf(HTMLCollection.prototype), "constructor", this).call(this);
        this._parent = parent;
        this._selector = selector;
        this._fillChildren(this._parent);
    }

    _createClass(HTMLCollection, [{
        key: "_fillChildren",
        /** @memberof HTMLCollection 
        * @instance 
        * @method _fillChildren 
        * @param parent */value: function _fillChildren(parent) {
            var _this = this;

            parent.children.forEach(function (child) {
                if (_this._selector(child)) {
                    _this.push(child);
                }

                if (child.childElementCount > 0) {
                    _this._fillChildren(child);
                }
            });
        }

        /**
         * Method updates state of collection
         *
         * @private
         
        * @memberof HTMLCollection 
        * @instance 
        * @method _update */
    }, {
        key: "_update",
        value: function _update() {
            this.splice(0, this.length);
            this._fillChildren(this._parent);
        }

        /**
         * Returns the specific node at the given zero-based index into the list. Returns null if the index
         * is out of range.
         *
         * @param {number} index
         * @returns {HTMLElement|null}
         
        * @memberof HTMLCollection 
        * @instance 
        * @method item 
        * @param index */
    }, {
        key: "item",
        value: function item(index) {
            if (index >= 0 && index < this.length) {
                return this[index];
            }

            return null;
        }
    }]);

    return HTMLCollection;
})(Array);

exports["default"] = HTMLCollection;
module.exports = exports["default"];
//# sourceMappingURL=HTMLCollection.js.map