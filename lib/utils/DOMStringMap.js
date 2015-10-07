/**
 * Class provides DOMStringMap implementation for processing dataset properties.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 * @extends {Map}
 
* @class DOMStringMap 
* @param element */
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var DOMStringMap = (function () {
    function DOMStringMap(element) {
        _classCallCheck(this, DOMStringMap);

        this._ownerElement = element;
        this._values = new _Map();
    }

    /**
     * Method provides searching of property in inner storage and in elements attributes.
     *
     * @param {string} property
     * @returns {string}
     * @private
     
    * @memberof DOMStringMap 
    * @instance 
    * @method _get 
    * @param property */

    _createClass(DOMStringMap, [{
        key: '_get',
        value: function _get(property) {
            if (this._values.has(property)) {
                return this._values.get(property);
            }

            var name = propertyNameToAttribute(property);
            if (this._ownerElement.hasAttribute(name)) {
                return this._ownerElement.getAttribute(name);
            }

            return undefined;
        }

        /**
         * Method provides setting of value in inner storage and also creates corresponded attribute.
         *
         * @param {string} property
         * @param {string} value
         * @private
         
        * @memberof DOMStringMap 
        * @instance 
        * @method _set 
        * @param property 
        * @param value */
    }, {
        key: '_set',
        value: function _set(property, value) {
            this._values.set(property, value);
            this._ownerElement.setAttribute(propertyNameToAttribute(property), value);
        }

        /**
         * Method provides check if data attribute is set. Also checks attributes.
         *
         * @param {string} property
         * @returns {boolean}
         * @private
         
        * @memberof DOMStringMap 
        * @instance 
        * @method _has 
        * @param property */
    }, {
        key: '_has',
        value: function _has(property) {
            if (this._values.has(property)) {
                return true;
            }

            return this._ownerElement.hasAttribute(propertyNameToAttribute(property));
        }

        /**
         * Method returns handlers for Proxy element
         *
         * @param {DOMStringMap} list
         * @returns {{get: (function(this:*)), has: (function(this:*)), set: (function(this:*))}}
         
        * @memberof DOMStringMap 
        * @static 
        * @method getHandler 
        * @param list */
    }], [{
        key: 'getHandler',
        value: function getHandler(list) {
            return {
                get: DOMStringMap._handlerGet.bind(list),
                has: DOMStringMap._handlerHas.bind(list),
                set: DOMStringMap._handlerSet.bind(list)
            };
        }

        /**
         * Function process get of property in DOMStringMap.
         *
         * @param {Proxy} receiver
         * @param {string} property
         * @returns {string}
         * @private
         
        * @memberof DOMStringMap 
        * @static 
        * @method _handlerGet 
        * @param receiver 
        * @param property */
    }, {
        key: '_handlerGet',
        value: function _handlerGet(receiver, property) {
            if (this._has(property)) {
                return this._get(property);
            }
            return undefined;
        }

        /**
         * Function returns boolean if target has property.
         *
         * @param {Proxy} receiver
         * @param {string} property
         * @returns {boolean}
         * @private
         
        * @memberof DOMStringMap 
        * @static 
        * @method _handlerHas 
        * @param receiver 
        * @param property */
    }, {
        key: '_handlerHas',
        value: function _handlerHas(receiver, property) {
            return this._has(property);
        }

        /**
         * Function process set of property in DOMStringMap.
         *
         * @param {Proxy} receiver
         * @param {string} property
         * @param {string} value
         * @private
         
        * @memberof DOMStringMap 
        * @static 
        * @method _handlerSet 
        * @param receiver 
        * @param property 
        * @param value */
    }, {
        key: '_handlerSet',
        value: function _handlerSet(receiver, property, value) {
            this._set(property, value);
        }
    }]);

    return DOMStringMap;
})();

/** @function 
* @param element */

function CreateDOMStringMap(element) {
    var list = new DOMStringMap(element);
    return Proxy.create(DOMStringMap.getHandler(list));
}

/**
 * @todo Implement processing rules
 * @param {string} name
 * @returns {string}
 * @private
 
* @function 
* @param name */
function attributeNameToProperty(name) {
    return name.replace(/^data-/i, '');
}

/**
 * @todo Implement processing rules
 * @param {string} name
 * @returns {string}
 * @private
 
* @function 
* @param name */
function propertyNameToAttribute(name) {
    return 'data-' + name;
}

exports.DOMStringMap = DOMStringMap;
exports.CreateDOMStringMap = CreateDOMStringMap;
exports.attributeNameToProperty = attributeNameToProperty;
exports.propertyNameToAttribute = propertyNameToAttribute;
//# sourceMappingURL=DOMStringMap.js.map