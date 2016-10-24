import { strictEqual } from 'proclaim';
import { Document } from '../../src';

suite('HTLMElement', () => {
  test('Element dataset code using', () => {
    const document = new Document();
    let element = document.createElement('i');
    element.dataset.value = 5;
    strictEqual(element.dataset.value, 5);
  });

  test('Element dataset markup using', () => {
    const document = new Document();
    document.body.innerHTML = '<b data-attr="some value"></b>';
    let element = document.body.firstChild;
    strictEqual(element.dataset.attr, 'some value');
  });

  test('Element dataset markup using', () => {
    const document = new Document();
    document.body.innerHTML = '<b data-attr-long-name="some value"></b>';
    let element = document.body.firstChild;
    strictEqual(element.dataset.attrLongName, 'some value');
  });
});
