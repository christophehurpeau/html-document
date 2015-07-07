'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var HTMLElement = require('../../HTMLElement');

/**
 * HTML <select> elements share all of the properties and methods
 * of other HTML elements described in the element section.
 * They also have the specialized interface HTMLSelectElement.
 */

var HTMLSelectElement = (function (_HTMLElement) {
    function HTMLSelectElement() {
        _classCallCheck(this, HTMLSelectElement);

        _get(Object.getPrototypeOf(HTMLSelectElement.prototype), 'constructor', this).call(this);
        this.nodeName = 'select';
    }

    _inherits(HTMLSelectElement, _HTMLElement);

    _createClass(HTMLSelectElement, [{
        key: 'item',

        /**
         * Gets an item from the options collection for this select element.
         *
         * @param {Number} index
         * @return {HTMLOptionElement}
         */
        value: function item(index) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'namedItem',

        /**
         * Gets the item in the options collection with the specified name.
         * The name string can match either the id or the name attribute of an option node
         *
         * @param {string} name
         * @return {HTMLOptionElement}
         */
        value: function namedItem(name) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'remove',

        /**
         * Removes the element at the specified index from the options collection for this select element.
         *
         * @param {Number} index
         */
        value: function remove(index) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'autoFocus',
        get: function get() {
            throw new Error('Not implemented');
        },
        set: function set(value) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'form',

        /**
         * The form that this element is associated with. If this element is a descendant of a form element,
         * then this attribute is the ID of that form element.
         * If the element is not a descendant of a form element, then:
         * The attribute can be the ID of any form element in the same document.
         *
         * @return {HTMLFormElement}
         */
        get: function get() {
            throw new Error('Not implemented');
        },
        set: function set(value) {
            throw new Error('form is read only');
        }
    }, {
        key: 'labels',
        get: function get() {
            throw new Error('Not implemented');
        }
    }, {
        key: 'disabled',

        /**
         * Reflects the disabled HTML attribute, which indicates whether the control is disabled.
         * If it is disabled, it does not accept clicks.
         *
         * @return {Boolean}
         */
        get: function get() {
            return !!this.getAttribute('disabled');
        },

        /**
         * Reflects the disabled HTML attribute, which indicates whether the control is disabled.
         * If it is disabled, it does not accept clicks.
         *
         * @param {Boolean} disabled
         */
        set: function set(disabled) {
            if (disabled) {
                this.setAttribute('disabled', 'disabled');
            } else {
                this.removeAttribute('disabled');
            }
        }
    }, {
        key: 'length',

        /**
         * The number of <option> elements in this select element.
         *
         * @return {Number}
         */
        get: function get() {
            return this.options.length;
        },
        set: function set(value) {
            throw new Error('Length is read only');
        }
    }, {
        key: 'multiple',

        /**
         * Reflects the multiple HTML attribute, whichindicates whether multiple items can be selected.
         *
         * @return {Boolean}
         */
        get: function get() {
            return !!this.getAttribute('multiple');
        },

        /**
         * Reflects the multiple HTML attribute, whichindicates whether multiple items can be selected.
         *
         * @param {Boolean} multiple
         */
        set: function set(multiple) {
            if (multiple) {
                this.setAttribute('multiple', 'multiple');
            } else {
                this.removeAttribute('multiple');
            }
        }
    }, {
        key: 'name',

        /**
         * Reflects the name HTML attribute, containing the name of this control used by servers and DOM search functions.
         */
        get: function get() {
            return this.getAttribute('name');
        },

        /**
         * Reflects the name HTML attribute, containing the name of this control used by servers and DOM search functions.
         *
         * @param {string} name
         */
        set: function set(name) {
            this.setAttribute('name', name);
        }
    }, {
        key: 'options',

        /**
         * The set of <option> elements contained by this element. Read only.
         */
        get: function get() {
            return this.getElementsByTagName('option');
        },
        set: function set(value) {
            throw new Error('options is read only');
        }
    }, {
        key: 'required',

        /**
         * Reflects the required HTML attribute, which indicates whether the user is required
         * to select a value before submitting the form
         *
         * @return {Boolean}
         */
        get: function get() {
            return !!this.getAttribute('required');
        },

        /**
         * Reflects the required HTML attribute, which indicates whether the user is required
         * to select a value before submitting the form
         *
         * @param {Boolean} required
         */
        set: function set(required) {
            if (required) {
                this.setAttribute('required', 'required');
            } else {
                this.removeAttribute('required');
            }
        }
    }, {
        key: 'selectedIndex',

        /**
         * The index of the first selected <option> element. The value -1 is returned if no element is selected.
         *
         * @return {Number}
         */
        get: function get() {
            var index = -1;
            var options = this.options;
            if (!options.length) {
                return index;
            }
            options.some(function (option, i) {
                if (option.selected) {
                    index = i;
                    return true;
                }
            });
            if (index === -1 && !this.multiple) {
                options.some(function (option, i) {
                    if (option.value === '') {
                        index = i;
                        return true;
                    }
                });
                if (index === -1) {
                    return 0;
                }
            }
            return index;
        },

        /**
         * The index of the first selected <option> element. The value -1 is returned if no element is selected.
         *
         * @return {Number}
         */
        set: function set(index) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'selectedOptions',

        /**
         * The set of options that are selected.
         *
         * @return {HTMLCollection}
         */
        get: function get() {
            return this.options.filter(function (option) {
                return option.selected;
            });
        }
    }, {
        key: 'selectedOption',

        /**
         * The first selected option.
         *
         * @return HTMLOptionElement
         */
        get: function get() {
            var selectedOption;
            this.options.some(function (option) {
                if (option.selected) {
                    selectedOption = option;
                    return true;
                }
            });
            return selectedOption;
        }
    }, {
        key: 'size',

        /**
         * Reflects the size HTML attribute, which contains the number of visible items in the control.
         * The default is 1, unless multiple is true, in which case it is 4.
         *
         * @return {Number}
         */
        get: function get() {
            return Number(this.getAttribute('size')) || (this.multiple ? 4 : 1);
        },

        /**
         * Reflects the size HTML attribute, which contains the number of visible items in the control.
         *
         * @param {string} name
         */
        set: function set(size) {
            this.setAttribute('size', size);
        }
    }, {
        key: 'tabIndex',
        get: function get() {
            throw new Error('Obsolete since HTML5');
        }
    }, {
        key: 'type',

        /**
         * The form control's type. When multiple is true, it returns select-multiple; otherwise, it returns select-one.
         * Read only.
         *
         * @return {string}
         */
        get: function get() {
            return this.multiple ? 'select-multiple' : 'select-one';
        },
        set: function set(value) {
            throw new Error('type is read only');
        }
    }, {
        key: 'validationMessage',
        get: function get() {
            throw new Error('Not implemented');
        },
        set: function set(value) {
            throw new Error('validationMessage is read only');
        }
    }, {
        key: 'validity',
        get: function get() {
            throw new Error('Not implemented');
        },
        set: function set(value) {
            throw new Error('validity is read only');
        }
    }, {
        key: 'value',

        /**
         * The value of this form control, that is, of the first selected option.
         *
         * @return {string}
         */
        get: function get() {
            return this.selectedOption && this.selectedOption.value;
        },

        /**
         * The value of this form control, that is, of the first selected option.
         *
         * @param {string} value
         */
        set: function set(value) {
            return this.selectedOption.value = value;
        }
    }, {
        key: 'willValidate',
        get: function get() {
            throw new Error('Not implemented');
        },
        set: function set(value) {
            throw new Error('willValidate is read only');
        }
    }]);

    return HTMLSelectElement;
})(HTMLElement);

exports['default'] = HTMLSelectElement;
module.exports = exports['default'];
//# sourceMappingURL=HTMLSelectElement.js.map