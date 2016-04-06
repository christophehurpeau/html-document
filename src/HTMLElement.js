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
        let result = '<' + this.nodeName;

        for (let attr of this._attributes) {
            result += ' ' + attr.name;

            if (attr.value !== null && attr.value !== 'undefined') {
                result += '="' + escapeAttribute(attr.value) + '"';
            }
        }

        result += '>' + (voidElements.indexOf(this.nodeName) !== -1 ? '' : this.innerHTML + '</' + this.nodeName + '>');
        return result;
    }

    get dataset() {
        return this._dataset;
    }
}
