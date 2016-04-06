'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _Symbol$iterator = require('babel-runtime/core-js/symbol/iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Attr = require('./Attr');

var _Attr2 = _interopRequireDefault(_Attr);

var _DOMException = require('./DOMException');

var _DOMException2 = _interopRequireDefault(_DOMException);

/**
 * The NamedNodeMap interface represents a collection of Attr objects. Objects inside a NamedNodeMap are not in any
 * particular order, unlike NodeList, although they may be accessed by an index as in an array.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */

/** @class NamedNodeMap */
var NamedNodeMap = (function () {
    function NamedNodeMap() {
        _classCallCheck(this, NamedNodeMap);

        this._data = new _Map();
        this._index = [];
    }

    /**
     * Returns the amount of objects in the map.
     *
     * @returns {number}
     
    * @memberof NamedNodeMap 
    * @instance 
    * @member length */

    _createClass(NamedNodeMap, [{
        key: 'setNamedItem',

        /**
         * Replaces, or adds, the Attr identified in the map by the given name.
         *
         * @param {Attr} attr
         * @returns {Attr|null}
         
        * @memberof NamedNodeMap 
        * @instance 
        * @method setNamedItem 
        * @param attr */
        value: function setNamedItem(attr) {
            if (!(attr instanceof _Attr2['default'])) {
                throw new _DOMException2['default']('NOT_ATTR');
            }

            var result = null;

            if (this._data.has(attr.name)) {
                result = this._data.get(attr.name);
                this._index.splice(this._index.indexOf(attr.name), 1);
            }

            this._data.set(attr.name, attr);
            this._index.push(attr.name);

            return result;
        }

        /**
         * Returns a Attr, corresponding to the given name.
         *
         * @param {string} name
         * @returns {Attr|null}
         
        * @memberof NamedNodeMap 
        * @instance 
        * @method getNamedItem 
        * @param name */
    }, {
        key: 'getNamedItem',
        value: function getNamedItem(name) {
            if (this._data.has(name)) {
                return this._data.get(name);
            }

            return null;
        }

        /**
         * Removes the Attr identified by the given map.
         *
         * @param {string} name
         * @returns {Attr|null}
         
        * @memberof NamedNodeMap 
        * @instance 
        * @method removeNamedItem 
        * @param name */
    }, {
        key: 'removeNamedItem',
        value: function removeNamedItem(name) {
            var result = null;
            if (this._data.has(name)) {
                result = this._data.get(name);
                this._data['delete'](name);
                this._index.splice(this._index.indexOf(name), 1);
            }

            return result;
        }

        /**
         * Returns the Attr at the given index, or null if the index is higher or equal to the number of nodes.
         *
         * @param {number} index
         * @returns {Attr|null}
         
        * @memberof NamedNodeMap 
        * @instance 
        * @method item 
        * @param index */
    }, {
        key: 'item',
        value: function item(index) {
            if (index > -1 && index < this._index.length) {
                return this._data.get(this._index[index]);
            }

            return null;
        }
    }, {
        key: _Symbol$iterator,
        /** @memberof NamedNodeMap 
        * @instance */value: function value() {
            var _this = this;

            var index = 0;

            return {
                next: function next() {
                    return { value: _this.item(index++), done: index > _this.length };
                }
            };
        }
    }, {
        key: 'length',
        get: function get() {
            return this._data.size;
        }
    }]);

    return NamedNodeMap;
})();

exports['default'] = NamedNodeMap;
module.exports = exports['default'];
//# sourceMappingURL=NamedNodeMap.js.map