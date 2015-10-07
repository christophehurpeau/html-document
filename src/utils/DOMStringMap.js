/**
 * Class provides DOMStringMap implementation for processing dataset properties.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 * @extends {Map}
 */
class DOMStringMap {
    constructor(element) {
        this._ownerElement = element;
        this._values = new Map();
    }

    /**
     * Method provides searching of property in inner storage and in elements attributes.
     *
     * @param {string} property
     * @returns {string}
     * @private
     */
    _get(property) {
        if (this._values.has(property)) {
            return this._values.get(property);
        }

        let name = propertyNameToAttribute(property);
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
     */
    _set(property, value) {
        this._values.set(property, value);
        this._ownerElement.setAttribute(propertyNameToAttribute(property), value);
    }

    /**
     * Method provides check if data attribute is set. Also checks attributes.
     *
     * @param {string} property
     * @returns {boolean}
     * @private
     */
    _has(property) {
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
     */
    static getHandler(list) {
        return {
            get: DOMStringMap._handlerGet.bind(list),
            has: DOMStringMap._handlerHas.bind(list),
            set: DOMStringMap._handlerSet.bind(list),
        };
    }

    /**
     * Function process get of property in DOMStringMap.
     *
     * @param {Proxy} receiver
     * @param {string} property
     * @returns {string}
     * @private
     */
    static _handlerGet(receiver, property) {
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
     */
    static _handlerHas(receiver, property) {
        return this._has(property);
    }

    /**
     * Function process set of property in DOMStringMap.
     *
     * @param {Proxy} receiver
     * @param {string} property
     * @param {string} value
     * @private
     */
    static _handlerSet(receiver, property, value) {
        this._set(property, value);
    }
}

function CreateDOMStringMap(element) {
    let list = new DOMStringMap(element);
    return Proxy.create(DOMStringMap.getHandler(list));
}

/**
 * @todo Implement processing rules
 * @param {string} name
 * @returns {string}
 * @private
 */
function attributeNameToProperty(name) {
    return name.replace(/^data-/i, '');
}

/**
 * @todo Implement processing rules
 * @param {string} name
 * @returns {string}
 * @private
 */
function propertyNameToAttribute(name) {
    return 'data-' + name;
}

export {DOMStringMap, CreateDOMStringMap, attributeNameToProperty, propertyNameToAttribute};
