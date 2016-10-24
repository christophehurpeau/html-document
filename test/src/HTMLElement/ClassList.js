import { strictEqual } from 'proclaim';
import { HTMLElement } from '../../../src';

suite('ClassList', () => {
  test('add single class', () => {
    let elt = new HTMLElement();

    elt.classList.add('test');
    strictEqual(elt.getAttribute('class'), 'test');
    strictEqual(elt.classList.length, 1);
  });

  test('add existing class', () => {
    let elt = new HTMLElement();

    elt.classList.add('test');
    strictEqual(elt.getAttribute('class'), 'test');
    elt.classList.add('test');
    strictEqual(elt.getAttribute('class'), 'test');
  });

  test('add multiple class', () => {
    let elt = new HTMLElement();

    elt.classList.add('test', 'test2', 'test');
    strictEqual(elt.getAttribute('class'), 'test test2');
    strictEqual(elt.classList.length, 2);
  });

  test('remove class', () => {
    let elt = new HTMLElement();

    elt.classList.add('test');
    elt.classList.remove('test');
    strictEqual(elt.classList.length, 0);
    strictEqual(elt.getAttribute('class'), '');
  });

  test('remove multiple class', () => {
    let elt = new HTMLElement();

    elt.classList.add('test', 'test3', 'test4');
    elt.classList.remove('test2', 'test3', 'test5');
    strictEqual(elt.getAttribute('class'), 'test test4');
  });

  test('toggle', () => {
    let elt = new HTMLElement();

    elt.classList.toggle('test');
    strictEqual(elt.getAttribute('class'), 'test');
    elt.classList.toggle('test');
    strictEqual(elt.getAttribute('class'), '');
  });

  test('toggle, force', () => {
    let elt = new HTMLElement();

    elt.classList.toggle('test', true);
    strictEqual(elt.getAttribute('class'), 'test');
    elt.classList.toggle('test', true);
    strictEqual(elt.getAttribute('class'), 'test');
    elt.classList.toggle('test', false);
    strictEqual(elt.getAttribute('class'), '');
    elt.classList.toggle('test', false);
    strictEqual(elt.getAttribute('class'), '');
  });

  test('contains', () => {
    let elt = new HTMLElement();

    strictEqual(elt.classList.contains('test'), false);
    elt.classList.add('test');
    strictEqual(elt.classList.contains('test'), true);
  });
});
