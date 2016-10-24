import HTMLElement from '../../HTMLElement';

/**
 * The HTMLOptionElement interface represents option elements
 * and inherits all classes and methods of the HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/HTMLOptionElement
 */
export default class HTMLOptionElement extends HTMLElement {
    /**
     * Contains the initial value of the selected HTML attribute,
     * indicating whether the option is selected by default or not.
     *
     * @type {boolean}
     * @ignore
     */
  get defaultSelected() {
    throw new Error('Unsupported');
  }

    /**
     * @ignore
     * @param {boolean} selected
     */
  set defaultSelected(selected) {
    throw new Error('Unsupported');
  }

    /**
     * Reflects the value of the disabled HTML attribute, which indicates that the option is unavailable to be selected.
     * An option can also be disabled if it is a child of an optgroup element that is disabled.
     *
     * @type {boolean}
     */
  get disabled() {
    return !!this.getAttribute('disabled') &&
             (this.parentNode.nodeName !== 'optgroup' || !this.parentNode.disabled);
  }

    /**
     * @ignore
     * @param {boolean} disabled
     */
  set disabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', 'disabled');
    } else {
      this.removeAttribute('disabled');
    }
  }

    /**
     * If the option is a descendant of a select element, then this property has the same value as
     * the form property of the corresponding HTMLSelectElement object; otherwise, it is null.
     *
     * @type {HTMLFormElement}
     * @readonly
     */
  get form() {
    throw new Error('Not implemented');
  }

    /**
     * @ignore
     */
  set form(value) {
    throw new Error('form is read only');
  }

    /**
     * The position of the option within the list of options it belongs to, in tree-order.
     * If the option is not part of a list of options, like when it is part of the datalist element, the value is 0.
     *
     * @type {number}
     * @readonly
     * @ignore
     */
  get index() {
    throw new Error('Not implemented');
  }

    /**
     * @ignore
     * @param {number} value
     */
  set index(value) {
    throw new Error('index is read only');
  }

    /**
     * Reflects the value of the label HTML attribute, which provides a label for the option.
     * If this attribute isn't specifically set, reading it returns the element's text content.
     *
     * @type {string}
     * @ignore
     */
  get label() {
    throw new Error('Not implemented');
  }

    /**
     * @ignore
     * @param {string} label
     */
  set label(label) {
    throw new Error('Not implemented');
  }

  get _select() {
        // jscs:disable safeContextKeyword
    let node = this;

        // jscs:enable safeContextKeyword

    while (node = node.parentNode) {
      if (node.nodeName === 'select') {
        return node;
      }
    }

    return null;
  }

    /**
     * Indicates whether the option is currently selected.
     *
     * @member {boolean}
     */
  get selected() {
    return !!this.getAttribute('selected');
  }

    /**
     * @ignore
     * @param {boolean} selected
     */
  set selected(selected) {
    if (selected) {
      let selectElement = this._select;
      if (!selectElement.multiple) {
        let selectedOption = selectElement.selectedOption;
        if (selectedOption) {
          selectedOption.selected = false;
        }
      }

      this.setAttribute('selected', 'selected');
    } else {
      this.removeAttribute('selected');
    }
  }

    /**
     * Contains the text content of the element.
     *
     * @type {string}
     */
  get text() {
    return this.textContent;
  }

    /**
     * @param {string} text
     */
  set text(text) {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    this.appendChild(this.ownerDocument.createTextNode(text));
  }

    /**
     * Reflects the value of the value HTML attribute, if it exists;
     * otherwise reflects value of the Node.textContent property.
     *
     * @type {string}
     */
  get value() {
    const value = this.getAttribute('value');
    return value === null ? this.textContent : value;
  }

    /**
     * @param {string} value
     */
  set value(value) {
    if (value) {
      this.setAttribute('value', value);
    } else {
      this.removeAttribute('value');
    }
  }

}

/**
 * @constant {string} HTMLOptionElement#nodeName option
 */
Object.defineProperty(HTMLOptionElement.prototype, 'nodeName', { value: 'option' });
