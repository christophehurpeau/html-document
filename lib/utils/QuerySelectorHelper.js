'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _cssSelectorParser = require('css-selector-parser');

/**
 * QuerySelectorHelper interface provides simple processing
 * of Element.querySelector method.
 
* @class QuerySelectorHelper 
* @param element */

var QuerySelectorHelper = (function () {
    function QuerySelectorHelper(element) {
        _classCallCheck(this, QuerySelectorHelper);

        this.element = element;
        this.result = null;
    }

    _createClass(QuerySelectorHelper, [{
        key: 'parse',
        /** @memberof QuerySelectorHelper 
        * @instance 
        * @method parse 
        * @param query */value: function parse(query) {
            var parser = QuerySelectorHelper.cssSelectorParser;
            var rules = parser.parse(query);
            this.result = null;

            if (rules.type === 'selectors') {
                this.processSelectors(this.element, rules.selectors);
            } else if (rules.type === 'ruleSet') {
                this.processRule(this.element, rules.rule);
            }

            return this.result;
        }
    }, {
        key: 'parseAll',
        /** @memberof QuerySelectorHelper 
        * @instance 
        * @method parseAll 
        * @param query */value: function parseAll(query) {
            var parser = QuerySelectorHelper.cssSelectorParser;
            var rules = parser.parse(query);
            this.result = [];

            if (rules.type === 'selectors') {
                this.processSelectors(this.element, rules.selectors);
            } else if (rules.type === 'ruleSet') {
                this.processRule(this.element, rules.rule);
            }

            return this.result;
        }
    }, {
        key: 'processSelectors',

        /**
         * Function process all selectors
         *
         * @param element
         * @param selectors
         * @returns {boolean}
         
        * @memberof QuerySelectorHelper 
        * @instance 
        * @method processSelectors 
        * @param element 
        * @param selectors */
        value: function processSelectors(element, selectors) {
            var _this = this;

            return selectors.every(function (selector) {
                return _this.processRule(element, selector.rule);
            }, this);
        }

        /**
         * Function process one rule on element
         *
         * @param element
         * @param rule
         * @returns {boolean}
         
        * @memberof QuerySelectorHelper 
        * @instance 
        * @method processRule 
        * @param element 
        * @param rule */
    }, {
        key: 'processRule',
        value: function processRule(element, rule) {
            var _this2 = this;

            return element.children.every(function (child) {
                return _this2.processElement(child, rule);
            }, this);
        }

        /**
         * Function processes one element using current rule
         *
         * @param element
         * @param rule
         * @returns {boolean}
         
        * @memberof QuerySelectorHelper 
        * @instance 
        * @method processElement 
        * @param element 
        * @param rule */
    }, {
        key: 'processElement',
        value: function processElement(element, rule) {
            var itsMe = true;

            if (itsMe && rule.hasOwnProperty('tagName')) {
                itsMe &= element.tagName === rule.tagName;
            }

            if (itsMe && rule.hasOwnProperty('classNames')) {
                itsMe &= rule.classNames.some(function (name) {
                    return element.classList.contains(name);
                });
            }

            if (itsMe && rule.hasOwnProperty('attrs')) {
                itsMe &= rule.attrs.some(function (attr) {
                    return element.hasAttribute(attr.name) && element.getAttribute(attr.name) === attr.value;
                });
            }

            if (itsMe && rule.hasOwnProperty('id')) {
                itsMe &= element.getAttribute('id') === rule.id;
            }

            if (!itsMe) {
                return this.processRule(element, rule);
            }

            if (rule.hasOwnProperty('rule')) {
                return this.processRule(element, rule.rule);
            } else {
                if (this.result === null) {
                    this.result = element;
                    return false;
                } else {
                    this.result.push(element);
                    return this.processRule(element, rule);
                }
            }
        }
    }], [{
        key: 'cssSelectorParser',
        /** @memberof QuerySelectorHelper 
        * @static 
        * @member cssSelectorParser */get: function get() {
            if (QuerySelectorHelper.parser === null) {
                QuerySelectorHelper.parser = new _cssSelectorParser.CssSelectorParser();
            }

            return QuerySelectorHelper.parser;
        }
    }]);

    return QuerySelectorHelper;
})();

QuerySelectorHelper.parser = null;

exports['default'] = QuerySelectorHelper;
module.exports = exports['default'];
//# sourceMappingURL=QuerySelectorHelper.js.map