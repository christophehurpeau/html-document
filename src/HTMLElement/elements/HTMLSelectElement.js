import HTMLElement from '../../HTMLElement';

/**
 * HTML select elements share all of the properties and methods
 * of other HTML elements described in the element section.
 * They also have the specialized interface HTMLSelectElement.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/HTMLSelectElement
 *
 */
export default class HTMLSelectElement extends HTMLElement {
    /**
     * Is a Boolean that reflects the autofocus HTML attribute,
     * which indicates whether the control should have input focus when the page loads,
     * unless the user overrides it, for example by typing in a different control.
     * Only one form-associated element in a document can have this attribute specified
     *
     * @type {boolean}
     */
  get autoFocus() {
    return this.hasAttribute('autofocus');
  }

    /**
     * @param {boolean} value
     */
  set autoFocus(value) {
    if (value) {
      this.setAttribute('autofocus', '');
    } else {
      this.removeAttribute('autofocus');
    }
  }

    /**
     * Is a Boolean that reflects the disabled HTML attribute,
     * which indicates whether the control is disabled.
     * If it is disabled, it does not accept clicks.
     *
     * @type {boolean}
     */
  get disabled() {
    return this.hasAttribute('disabled');
  }

    /**
     * @param {boolean} value
     */
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', 'disabled');
    } else {
      this.removeAttribute('disabled');
    }
  }

    /**
     * The form that this element is associated with. If this element is a descendant of a form element,
     * then this attribute is the ID of that form element.
     * If the element is not a descendant of a form element, then:
     * The attribute can be the ID of any form element in the same document.
     *
     * @type {HTMLFormElement}
     * @readonly
     */
  get form() {
    return this._closestParent('form') || null;
  }

  set form(value) {
    throw new Error('form is read only');
  }

    /**
     * Returns a NodeList containing the list of label elements associated with this select element.
     *
     * @type {HTMLLabelElement[]}
     * @readonly
     */
  get labels() {
    if (!this.hasAttribute('id')) {
      return [];
    }

    const id = this.getAttribute('id');
    const highestParent = this._highestParent();

    if (!highestParent) {
      return [];
    }

    return highestParent._filterDescendantNodes(n => n.tagName === 'label' && n.getAttribute('for') === id);
  }

    /**
     * The number of option elements in this select element.
     *
     * @type {number}
     * @readonly
     */
  get length() {
    return this.options.length;
  }

  set length(value) {
    throw new Error('length is read only');
  }

    /**
     * Reflects the multiple HTML attribute, which indicates whether multiple items can be selected.
     *
     * @type {boolean}
     */
  get multiple() {
    return this.hasAttribute('multiple');
  }

    /**
     * @param {boolean} multiple
     */
  set multiple(multiple) {
    if (multiple) {
      this.setAttribute('multiple', 'multiple');
    } else {
      this.removeAttribute('multiple');
    }
  }

    /**
     * Reflects the name HTML attribute, containing the name of this control
     * used by servers and DOM search functions.
     *
     * @type {string}
     */
  get name() {
    return this.getAttribute('name');
  }

    /**
     * @param {string} name
     */
  set name(name) {
    this.setAttribute('name', name);
  }

    /**
     * The set of option elements contained by this element.
     *
     * @type {Array.<Element>}
     * @readonly
     */
  get options() {
    return this.getElementsByTagName('option');
  }

  set options(value) {
    throw new Error('options is read only');
  }

    /**
     * Reflects the required HTML attribute, which indicates whether the user is required
     * to select a value before submitting the form
     *
     * @type {boolean}
     */
  get required() {
    return this.hasAttribute('required');
  }

  set required(required) {
    if (required) {
      this.setAttribute('required', 'required');
    } else {
      this.removeAttribute('required');
    }
  }

    /**
     * The index of the first selected option element.
     * The value -1 is returned if no element is selected.
     *
     * @type {number}
     */
  get selectedIndex() {
    let index = -1;
    let emptyIndex = -1;
    const options = this.options;

    if (!options.length) {
      return index;
    }

    options.some((option, idx) => {
      if (option.selected) {
        index = idx;
        return true;
      }

      if (emptyIndex === -1 && option.value === '') {
        emptyIndex = idx;
      }
    });

    if (index === -1 && !this.multiple) {
      index = emptyIndex;

      if (index === -1) {
        return 0;
      }
    }

    return index;
  }

    /**
     * @param {number} index
     */
  set selectedIndex(index) {
    this.selectedOptions.forEach(option => option.selected = false);
    this.options[index].selected = true;
  }

    /**
     * The set of options that are selected.
     *
     * @type {Element[]}
     * @readonly
     */
  get selectedOptions() {
    return this.options.filter(option => option.selected);
  }

    /**
     * The first selected option.
     *
     * @type {HtmlOptionElement|null}
     * @readonly
     */
  get selectedOption() {
    let selectedIndex = this.selectedIndex;

    if (selectedIndex === -1) {
      return null;
    }

    return this.options[selectedIndex];
  }

    /**
     * Reflects the size HTML attribute, which contains the number of visible items in the control.
     * The default is 1, unless multiple is true, in which case it is 4.
     *
     * @type {number}
     */
  get size() {
    return Number(this.getAttribute('size')) || (this.multiple ? 4 : 1);
  }

    /**
     * @param {number} size
     */
  set size(size) {
    this.setAttribute('size', size);
  }

  get tabIndex() {
    throw new Error('Obsolete since HTML5');
  }

    /**
     * The form control's type. When multiple is true, it returns select-multiple; otherwise, it returns select-one.
     * Read only.
     *
     * @type {string}
     * @readonly
     */
  get type() {
    return this.multiple ? 'select-multiple' : 'select-one';
  }

  set type(value) {
    throw new Error('type is read only');
  }

  get validationMessage() {
    throw new Error('Not implemented');
  }

  set validationMessage(value) {
    throw new Error('validationMessage is read only');
  }

  get validity() {
    throw new Error('Not implemented');
  }

  set validity(value) {
    throw new Error('validity is read only');
  }

    /**
     * The value of this form control, that is, of the first selected option.
     *
     * @type {string}
     */
  get value() {
    return this.selectedOption && this.selectedOption.value;
  }

    /**
     * @ignore
     * @param {string} value
     */
  set value(value) {
    this.selectedOption.value = value;
    return value;
  }

  get willValidate() {
    throw new Error('Not implemented');
  }

  set willValidate(value) {
    throw new Error('willValidate is read only');
  }

    /**
     * Gets an item from the options collection for this select element.
     *
     * @param {number} index
     * @ return {HTMLSelectElement}
     */
  item(index) {
    throw new Error('Not implemented');
  }

    /**
     * Gets the item in the options collection with the specified name.
     * The name string can match either the id or the name attribute of an option node
     *
     * @ignore Not implemented
     * @param {string} name
     * @ return {HTMLSelectElement}
     */
  namedItem(name) {
    throw new Error('Not implemented');
  }

    /**
     * Removes the element at the specified index from the options collection for this select element.
     *
     * @ignore Not implemented
     * @param {number} index
     */
  remove(index) {
    throw new Error('Not implemented');
  }
}

/**
 * @constant {string} HTMLSelectElement#nodeName option
 */
Object.defineProperty(HTMLSelectElement.prototype, 'nodeName', { value: 'select' });
