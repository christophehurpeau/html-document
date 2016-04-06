import Element from './Element';
import CSSStyleDeclaration from './HTMLElement/CSSStyleDeclaration';
import ClassList from './HTMLElement/ClassList';
import escapeAttribute from './utils/escapeAttribute';
import {attributeNameToProperty} from './utils/escapeAttributeName';

const voidElements = 'area base br col embed hr img input keygen link meta param source track wbr'.split(' ');

/**
 * The HTMLElement interface represents any HTML element.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement
 */
export default class HTMLElement extends Element {
    constructor() {
        super();
        /**
         * returns a token list of the class attribute of the element
         * @type {CSSStyleDeclaration} style
         * @readonly
         */
        this.style = new CSSStyleDeclaration(this);
        /**
         * returns a token list of the class attribute of the element
         * @type {ClassList} classList
         * @readonly
         */
        this.classList = new ClassList(this);

        this._dataset = {};
    }

    /**
     * The class of the element.
     *
     * @type {string}
     */
    get className() {
        return this.getAttribute('class');
    }

    /**
     * @param {string} className
     */
    set className(className) {
        this.setAttribute('class', className);
    }

    _updatedAttribute(attributeName, value) {
        if (attributeName === 'style') {
            this.style.cssText = value || '';
        }

        if (attributeName === 'class') {
            this.classList._parse(value || '');
        }

        if (attributeName.startsWith('data-')) {
            this.dataset[attributeNameToProperty(attributeName)] = value;
        }
    }

    /**
     * @ignore
     * @return {string}
     */
    get outerHTML() {
        return '<' +
            this.nodeName +
            Object.keys(this._attributes).reduce(
                (value, attributeName) => {
                    let result = value + ' ' + attributeName;
                    if (this._attributes[attributeName]) {
                        result += '="' + escapeAttribute(this._attributes[attributeName]) + '"';
                    }

                    return result;
                }, '')
            + '>'
            + (voidElements.indexOf(this.nodeName) !== -1 ? '' : this.innerHTML + '</' + this.nodeName + '>');
    }

    get dataset() {
        return this._dataset;
    }
}
