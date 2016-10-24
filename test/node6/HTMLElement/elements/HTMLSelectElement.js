'use strict';

var _proclaim = require('proclaim');

var _ = require('../../../..');

suite('HTMLSelectElement', () => {
  test('should have the nodeName == select ', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.strictEqual)(elt.nodeName, 'select');
  });

  test('autoFocus getter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isFalse)(elt.autoFocus);

    elt.setAttribute('autofocus', '');
    (0, _proclaim.isTrue)(elt.autoFocus);

    elt.removeAttribute('autofocus');
    (0, _proclaim.isFalse)(elt.autoFocus);
  });

  test('autoFocus setter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isFalse)(elt.autoFocus);

    elt.autoFocus = true;
    (0, _proclaim.isTrue)(elt.autoFocus);

    elt.autoFocus = false;
    (0, _proclaim.isFalse)(elt.autoFocus);
  });

  test('disabled getter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isFalse)(elt.disabled);

    elt.setAttribute('disabled', '');
    (0, _proclaim.isTrue)(elt.disabled);

    elt.removeAttribute('disabled');
    (0, _proclaim.isFalse)(elt.disabled);
  });

  test('disabled setter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isFalse)(elt.disabled);

    elt.disabled = true;
    (0, _proclaim.isTrue)(elt.disabled);

    elt.disabled = false;
    (0, _proclaim.isFalse)(elt.disabled);
  });

  test('form getter', () => {
    const document = new _.Document();
    let elt = new _.HTMLSelectElement();
    let form = document.createElement('form');
    let div = document.createElement('div');

    (0, _proclaim.isNull)(elt.form);

    form.appendChild(elt);
    (0, _proclaim.strictEqual)(elt.form, form);

    form.appendChild(div);
    div.appendChild(elt);
    (0, _proclaim.strictEqual)(elt.form, form);

    form.removeChild(div);
    (0, _proclaim.isNull)(elt.form);
  });

  test('form setter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.throws)(() => elt.form = null, 'form is read only');
  });

  test('labels getter', () => {
    const document = new _.Document();
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
    (0, _proclaim.strictEqual)(labels.length, 1);
    (0, _proclaim.strictEqual)(labels[0], label1);

    let div2 = document.createElement('div');
    div.appendChild(div2);
    let label3 = document.createElement('label');
    label3.setAttribute('for', 'test');
    div2.appendChild(label3);

    labels = elt.labels;
    (0, _proclaim.strictEqual)(labels.length, 2);
    (0, _proclaim.strictEqual)(labels[0], label1);
    (0, _proclaim.strictEqual)(labels[1], label3);
  });

  test('length getter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.strictEqual)(elt.length, 0);

    let option1 = new _.HTMLOptionElement();
    let option2 = new _.HTMLOptionElement();

    elt.appendChild(option1);
    (0, _proclaim.strictEqual)(elt.length, 1);

    elt.appendChild(option2);
    (0, _proclaim.strictEqual)(elt.length, 2);

    elt.removeChild(option1);
    (0, _proclaim.strictEqual)(elt.length, 1);

    elt.removeChild(option2);
    (0, _proclaim.strictEqual)(elt.length, 0);
  });

  test('length setter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.throws)(() => elt.length = null, 'length is read only');
  });

  test('multiple getter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isFalse)(elt.multiple);

    elt.setAttribute('multiple', '');
    (0, _proclaim.isTrue)(elt.multiple);

    elt.removeAttribute('multiple');
    (0, _proclaim.isFalse)(elt.multiple);
  });

  test('multiple setter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isFalse)(elt.multiple);

    elt.multiple = true;
    (0, _proclaim.isTrue)(elt.multiple);

    elt.multiple = false;
    (0, _proclaim.isFalse)(elt.multiple);
  });

  test('name getter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isNull)(elt.name);

    elt.setAttribute('name', 'test');
    (0, _proclaim.strictEqual)(elt.name, 'test');

    elt.removeAttribute('name');
    (0, _proclaim.isNull)(elt.name);
  });

  test('name setter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isNull)(elt.name);

    elt.name = 'test';
    (0, _proclaim.strictEqual)(elt.name, 'test');
    (0, _proclaim.strictEqual)(elt.getAttribute('name'), 'test');
  });

  test('options getter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.strictEqual)(elt.options.length, 0);

    let option = new _.HTMLOptionElement();
    elt.appendChild(option);

    (0, _proclaim.strictEqual)(elt.options.length, 1);
    (0, _proclaim.strictEqual)(elt.options[0], option);
  });

  test('options setter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.throws)(() => elt.options = null, 'options is read only');
  });

  test('required getter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isFalse)(elt.required);

    elt.setAttribute('required', '');
    (0, _proclaim.isTrue)(elt.required);

    elt.removeAttribute('required');
    (0, _proclaim.isFalse)(elt.required);
  });

  test('required setter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.isFalse)(elt.required);

    elt.required = true;
    (0, _proclaim.isTrue)(elt.required);

    elt.required = false;
    (0, _proclaim.isFalse)(elt.required);
  });

  test('selected getter', () => {
    let elt = new _.HTMLSelectElement();

    (0, _proclaim.strictEqual)(elt.selectedIndex, -1);

    let option1 = new _.HTMLOptionElement();
    elt.appendChild(option1);

    let option2 = new _.HTMLOptionElement();
    elt.appendChild(option2);

    (0, _proclaim.strictEqual)(elt.selectedIndex, 0);
    (0, _proclaim.strictEqual)(elt.selectedOption, option1);

    option1.value = 'value';
    option2.value = '';
    (0, _proclaim.strictEqual)(elt.selectedIndex, 1);
    (0, _proclaim.strictEqual)(elt.selectedOption, option2);

    option1.value = '';
    (0, _proclaim.strictEqual)(elt.selectedIndex, 0);
    (0, _proclaim.strictEqual)(elt.selectedOption, option1);

    option2.selected = true;
    (0, _proclaim.strictEqual)(elt.selectedIndex, 1);
    (0, _proclaim.strictEqual)(elt.selectedOption, option2);
  });

  test('selected setter', () => {
    let elt = new _.HTMLSelectElement();

    (0, _proclaim.strictEqual)(elt.selectedIndex, -1);

    let option1 = new _.HTMLOptionElement();
    elt.appendChild(option1);

    let option2 = new _.HTMLOptionElement();
    elt.appendChild(option2);

    elt.selectedIndex = 1;
    (0, _proclaim.isTrue)(option2.selected);

    elt.selectedIndex = 0;
    (0, _proclaim.isTrue)(option1.selected);
    (0, _proclaim.isFalse)(option2.selected);
  });

  test('size getter', () => {
    let elt = new _.HTMLSelectElement();

    (0, _proclaim.strictEqual)(elt.size, 1);

    elt.multiple = true;
    (0, _proclaim.strictEqual)(elt.size, 4);

    elt.setAttribute('size', 10);
    (0, _proclaim.strictEqual)(elt.size, 10);
  });

  test('size setter', () => {
    let elt = new _.HTMLSelectElement();

    (0, _proclaim.strictEqual)(elt.size, 1);

    elt.size = 10;
    (0, _proclaim.strictEqual)(elt.size, 10);
  });

  test('tabIndex', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.throws)(() => elt.tabIndex, 'Obsolete since HTML5');
  });

  test('type getter', () => {
    let elt = new _.HTMLSelectElement();

    (0, _proclaim.strictEqual)(elt.type, 'select-one');

    elt.multiple = true;
    (0, _proclaim.strictEqual)(elt.type, 'select-multiple');

    elt.multiple = false;
    (0, _proclaim.strictEqual)(elt.type, 'select-one');
  });

  test('type setter', () => {
    let elt = new _.HTMLSelectElement();
    (0, _proclaim.throws)(() => elt.type = null, 'type is read only');
  });
});
//# sourceMappingURL=HTMLSelectElement.js.map