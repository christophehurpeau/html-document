'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.querySelector = querySelector;
exports.querySelectorAll = querySelectorAll;

var _cssSelectorParser = require('css-selector-parser');

var cssParser = new _cssSelectorParser.CssSelectorParser();
cssParser.registerAttrEqualityMods('^', '$', '*', '~', '|');
cssParser.registerNestingOperators('>', '+', '~');

/**
 * querySelectorHelper interface provides simple processing
 * of Element.querySelector method.
 */

/**
 *
 * @param {Element} element
 * @param {string} query
 * @return {Element|null}
 */
/** @function 
* @param element 
* @param query */
function querySelector(element, query) {
    var rules = cssParser.parse(query);

    var iterator = processElementDeep(element, rules);
    var next = iterator.next();

    if (next && next.value) {
        return next.value;
    }

    return null;
}

/**
  *
  * @param {Element} element
  * @param {string} query
  * @return {Element[]}
  */
/** @function 
* @param element 
* @param query */
function querySelectorAll(element, query) {
    var rules = cssParser.parse(query);

    var result = [];
    for (var _iterator = processElementDeep(element, rules), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var _element = _ref;

        result.push(_element);
    }

    return result;
}

/**
 * Function processes one element using current rule
 *
 * @param {HTMLElement} element - element to check
 * @param {*} rules - current rules to check against element
 * @return {boolean}
 
* @function 
* @param element 
* @param rules */
function* processElement(element, rules) {
    for (var _iterator2 = element.children, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var child = _ref2;

        yield* processRules(child, rules);
    }
}

/**
 * Function processes one element using current rule
 *
 * @param {HTMLElement} element - element to check
 * @param {*} rules - current rules to check against element
 * @return {boolean}
 
* @function 
* @param element 
* @param rules */
function* processElementDeep(element, rules) {
    for (var _iterator3 = element.children, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _getIterator(_iterator3);;) {
        var _ref3;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
        }

        var child = _ref3;

        yield* processRules(child, rules);
        yield* processElementDeep(child, rules);
    }
}

/**
 * @param {Element} element
 * @param {Object} rules
 * @return {boolean}
 
* @function 
* @param element 
* @param rules */
function processRules(element, rules) {
    if (rules.type === 'selectors') {
        return processSelectors(element, rules.selectors);
    } else if (rules.type === 'ruleSet') {
        return processRule(element, rules.rule);
    }
}

/**
 * @param {Element} element
 * @param {Object} rule
 * @return {boolean}
 
* @function 
* @param element 
* @param rule */
function processRule(element, rule) {
    return processSelectors(element, [{ rule: rule }]);
}

/**
 * @param {Element} element
 * @param {Object[]} selectors
 * @return {boolean}
 
* @function 
* @param element 
* @param selectors */
function* processSelectors(element, selectors) {
    for (var _iterator4 = selectors, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _getIterator(_iterator4);;) {
        var _ref4;

        if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref4 = _iterator4[_i4++];
        } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref4 = _i4.value;
        }

        var selector = _ref4;

        var rule = selector.rule;

        if (!matchRule(element, rule)) {
            continue;
        }

        if (!rule.hasOwnProperty('rule')) {
            yield element;
            return;
        }

        switch (rule.rule.nestingOperator) {
            case '+':
                var nextElementSibling = element.nextElementSibling;
                if (nextElementSibling && matchRule(nextElementSibling, rule.rule)) {
                    yield nextElementSibling;
                }

                break;
            case '~':
                yield* processElement(element.parentNode, { type: 'ruleSet', rule: rule.rule });
                break;
            case '>':
                yield* processElement(element, { type: 'ruleSet', rule: rule.rule });
                break;
            default:
                yield* processElementDeep(element, { type: 'ruleSet', rule: rule.rule });
        }

        return;
    }
}

/** @function 
* @param element 
* @param rule */function matchRule(element, rule) {
    if (rule.hasOwnProperty('tagName') && element.tagName !== rule.tagName) {
        return false;
    }

    if (rule.hasOwnProperty('id') && element.getAttribute('id') !== rule.id) {
        return false;
    }

    if (rule.hasOwnProperty('classNames')) {
        if (!rule.classNames.every(function (name) {
            return element.classList.contains(name);
        })) {
            return false;
        }
    }

    if (rule.hasOwnProperty('attrs')) {
        if (!rule.attrs.some(function (attr) {
            if (!element.hasAttribute(attr.name)) {
                return false;
            } else if (attr.operator === undefined) {
                return true;
            }

            var value = element.getAttribute(attr.name);

            switch (attr.operator) {
                case '=':
                    return value === attr.value;
                case '^=':
                    return value.startsWith(attr.value);
                case '$=':
                    return value.endsWith(attr.value);
                case '~=':
                    var words = value.split(' ');
                    return words.some(function (word) {
                        return word === attr.value;
                    });
                case '*=':
                    return value.indexOf(attr.value) !== -1;
                case '|=':
                    return value === attr.value || value.startsWith(attr.value + '-');
                default:
                    throw new Error('Unsupported attribute operator ' + attr.operator);
            }
        })) {
            return false;
        }
    }

    return true;
}
//# sourceMappingURL=querySelectorHelper.js.map