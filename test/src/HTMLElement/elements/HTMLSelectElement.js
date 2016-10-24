import { strictEqual, isFalse, isTrue, isNull, throws } from 'proclaim';
import { Document, HTMLSelectElement, HTMLOptionElement } from '../../../../src';

suite('HTMLSelectElement', () => {
  test('should have the nodeName == select ', () => {
    let elt = new HTMLSelectElement();
    strictEqual(elt.nodeName, 'select');
  });

  test('autoFocus getter', () => {
    let elt = new HTMLSelectElement();
    isFalse(elt.autoFocus);

    elt.setAttribute('autofocus', '');
    isTrue(elt.autoFocus);

    elt.removeAttribute('autofocus');
    isFalse(elt.autoFocus);
  });

  test('autoFocus setter', () => {
    let elt = new HTMLSelectElement();
    isFalse(elt.autoFocus);

    elt.autoFocus = true;
    isTrue(elt.autoFocus);

    elt.autoFocus = false;
    isFalse(elt.autoFocus);
  });

  test('disabled getter', () => {
    let elt = new HTMLSelectElement();
    isFalse(elt.disabled);

    elt.setAttribute('disabled', '');
    isTrue(elt.disabled);

    elt.removeAttribute('disabled');
    isFalse(elt.disabled);
  });

  test('disabled setter', () => {
    let elt = new HTMLSelectElement();
    isFalse(elt.disabled);

    elt.disabled = true;
    isTrue(elt.disabled);

    elt.disabled = false;
    isFalse(elt.disabled);
  });

  test('form getter', () => {
    const document = new Document();
    let elt = new HTMLSelectElement();
    let form = document.createElement('form');
    let div = document.createElement('div');

    isNull(elt.form);

    form.appendChild(elt);
    strictEqual(elt.form, form);

    form.appendChild(div);
    div.appendChild(elt);
    strictEqual(elt.form, form);

    form.removeChild(div);
    isNull(elt.form);
  });

  test('form setter', () => {
    let elt = new HTMLSelectElement();
    throws(() => elt.form = null, 'form is read only');
  });

  test('labels getter', () => {
    const document = new Document();
    let elt = document.createElement('select');
    let div = document.createElement('div');
    div.appendChild(elt);
    let label1 = document.createElement('label');
    let label2 = document.createElement('label');
    div.appendChild(label1);
    div.appendChild(label2);

    label1.setAttribute('for', 'test');
    elt.setAttribute('id', 'test');

    let labels = elt.labels;
    strictEqual(labels.length, 1);
    strictEqual(labels[0], label1);

    let div2 = document.createElement('div');
    div.appendChild(div2);
    let label3 = document.createElement('label');
    label3.setAttribute('for', 'test');
    div2.appendChild(label3);

    labels = elt.labels;
    strictEqual(labels.length, 2);
    strictEqual(labels[0], label1);
    strictEqual(labels[1], label3);
  });

  test('length getter', () => {
    let elt = new HTMLSelectElement();
    strictEqual(elt.length, 0);

    let option1 = new HTMLOptionElement();
    let option2 = new HTMLOptionElement();

    elt.appendChild(option1);
    strictEqual(elt.length, 1);

    elt.appendChild(option2);
    strictEqual(elt.length, 2);

    elt.removeChild(option1);
    strictEqual(elt.length, 1);

    elt.removeChild(option2);
    strictEqual(elt.length, 0);
  });

  test('length setter', () => {
    let elt = new HTMLSelectElement();
    throws(() => elt.length = null, 'length is read only');
  });

  test('multiple getter', () => {
    let elt = new HTMLSelectElement();
    isFalse(elt.multiple);

    elt.setAttribute('multiple', '');
    isTrue(elt.multiple);

    elt.removeAttribute('multiple');
    isFalse(elt.multiple);
  });

  test('multiple setter', () => {
    let elt = new HTMLSelectElement();
    isFalse(elt.multiple);

    elt.multiple = true;
    isTrue(elt.multiple);

    elt.multiple = false;
    isFalse(elt.multiple);
  });

  test('name getter', () => {
    let elt = new HTMLSelectElement();
    isNull(elt.name);

    elt.setAttribute('name', 'test');
    strictEqual(elt.name, 'test');

    elt.removeAttribute('name');
    isNull(elt.name);
  });

  test('name setter', () => {
    let elt = new HTMLSelectElement();
    isNull(elt.name);

    elt.name = 'test';
    strictEqual(elt.name, 'test');
    strictEqual(elt.getAttribute('name'), 'test');
  });

  test('options getter', () => {
    let elt = new HTMLSelectElement();
    strictEqual(elt.options.length, 0);

    let option = new HTMLOptionElement();
    elt.appendChild(option);

    strictEqual(elt.options.length, 1);
    strictEqual(elt.options[0], option);
  });

  test('options setter', () => {
    let elt = new HTMLSelectElement();
    throws(() => elt.options = null, 'options is read only');
  });

  test('required getter', () => {
    let elt = new HTMLSelectElement();
    isFalse(elt.required);

    elt.setAttribute('required', '');
    isTrue(elt.required);

    elt.removeAttribute('required');
    isFalse(elt.required);
  });

  test('required setter', () => {
    let elt = new HTMLSelectElement();
    isFalse(elt.required);

    elt.required = true;
    isTrue(elt.required);

    elt.required = false;
    isFalse(elt.required);
  });

  test('selected getter', () => {
    let elt = new HTMLSelectElement();

    strictEqual(elt.selectedIndex, -1);

    let option1 = new HTMLOptionElement();
    elt.appendChild(option1);

    let option2 = new HTMLOptionElement();
    elt.appendChild(option2);

    strictEqual(elt.selectedIndex, 0);
    strictEqual(elt.selectedOption, option1);

    option1.value = 'value';
    option2.value = '';
    strictEqual(elt.selectedIndex, 1);
    strictEqual(elt.selectedOption, option2);

    option1.value = '';
    strictEqual(elt.selectedIndex, 0);
    strictEqual(elt.selectedOption, option1);

    option2.selected = true;
    strictEqual(elt.selectedIndex, 1);
    strictEqual(elt.selectedOption, option2);
  });

  test('selected setter', () => {
    let elt = new HTMLSelectElement();

    strictEqual(elt.selectedIndex, -1);

    let option1 = new HTMLOptionElement();
    elt.appendChild(option1);

    let option2 = new HTMLOptionElement();
    elt.appendChild(option2);

    elt.selectedIndex = 1;
    isTrue(option2.selected);

    elt.selectedIndex = 0;
    isTrue(option1.selected);
    isFalse(option2.selected);
  });

  test('size getter', () => {
    let elt = new HTMLSelectElement();

    strictEqual(elt.size, 1);

    elt.multiple = true;
    strictEqual(elt.size, 4);

    elt.setAttribute('size', 10);
    strictEqual(elt.size, 10);
  });

  test('size setter', () => {
    let elt = new HTMLSelectElement();

    strictEqual(elt.size, 1);

    elt.size = 10;
    strictEqual(elt.size, 10);
  });

  test('tabIndex', () => {
    let elt = new HTMLSelectElement();
    throws(() => elt.tabIndex, 'Obsolete since HTML5');
  });

  test('type getter', () => {
    let elt = new HTMLSelectElement();

    strictEqual(elt.type, 'select-one');

    elt.multiple = true;
    strictEqual(elt.type, 'select-multiple');

    elt.multiple = false;
    strictEqual(elt.type, 'select-one');
  });

  test('type setter', () => {
    let elt = new HTMLSelectElement();
    throws(() => elt.type = null, 'type is read only');
  });
});
