import {CssSelectorParser} from 'css-selector-parser';

/**
 * QuerySelectorHelper interface provides simple processing
 * of Element.querySelector method.
 */
class QuerySelectorHelper {
    constructor(element) {
        this.element = element;
        this.result = null;
    }

    parse(query) {
        let parser = QuerySelectorHelper.cssSelectorParser;
        let rules = parser.parse(query);
        this.result = null;

        if (rules.type === 'selectors') {
            this.processSelectors(this.element, rules.selectors);
        } else if (rules.type === 'ruleSet') {
            this.processRule(this.element, rules.rule);
        }

        return this.result;
    }

    parseAll(query) {
        let parser = QuerySelectorHelper.cssSelectorParser;
        let rules = parser.parse(query);
        this.result = [];

        if (rules.type === 'selectors') {
            this.processSelectors(this.element, rules.selectors);
        } else if (rules.type === 'ruleSet') {
            this.processRule(this.element, rules.rule);
        }

        return this.result;
    }

    /**
     * Static method returning parser instance.
     *
     * @returns {CssSelectorParser}
     */
    static get cssSelectorParser() {
        if (QuerySelectorHelper.parser === null) {
            QuerySelectorHelper.parser = new CssSelectorParser();
            QuerySelectorHelper.parser.registerAttrEqualityMods('^', '$', '*', '~');
        }

        return QuerySelectorHelper.parser;
    }

    /**
     * Method process element attributes to match attrRule structure
     *
     * @param element
     * @param attrRule
     * @returns {boolean}
     */
    static processAttribute(element, attrRule) {
        if (!element.hasAttribute(attrRule.name)) {
            return false;
        }

        let value = element.getAttribute(attrRule.name);

        if ('operator' in attrRule) {
            switch (attrRule.operator) {
                case '^=':
                    return value.indexOf(attrRule.value) === 0;
                    break;
                case '$=':
                    return value.indexOf(attrRule.value) === value.length - attrRule.value.length;
                    break;
                case '~=':
                    let words = value.split(' ');
                    return words.some((word) => {
                        return word === attrRule.value;
                    });
                case '*=':
                    return value.indexOf(attrRule.value) !== -1;
                default:
                    return value === attrRule.value;
            }
        }
        return true;
    }

    /**
     * Function process all selectors
     *
     * @param element
     * @param selectors
     * @returns {boolean}
     */
    processSelectors(element, selectors) {
        return selectors.every((selector) => {
            return this.processRule(element, selector.rule);
        }, this);
    }

    /**
     * Function process one rule on element
     *
     * @param element
     * @param rule
     * @returns {boolean}
     */
    processRule(element, rule) {
        return element.children.every((child) => {
            return this.processElement(child, rule);
        }, this);
    }

    /**
     * Function processes one element using current rule
     *
     * @param element
     * @param rule
     * @returns {boolean}
     */
    processElement(element, rule) {
        let itsMe = true;

        if (itsMe && rule.hasOwnProperty('tagName')) {
            itsMe &= element.tagName === rule.tagName;
        }

        if (itsMe && rule.hasOwnProperty('classNames')) {
            itsMe &= rule.classNames.some((name)=> {
                return element.classList.contains(name);
            });
        }

        if (itsMe && rule.hasOwnProperty('attrs')) {
            itsMe &= rule.attrs.some((attr)=> {
                return QuerySelectorHelper.processAttribute(element, attr);
            });
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
}

QuerySelectorHelper.parser = null;

export default QuerySelectorHelper;
