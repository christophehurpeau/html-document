import { strictEqual, isNull, isTrue, isFalse } from 'proclaim';
import { Document, Event } from '../../src';

suite('Node', () => {
  test('Node attributes', () => {
    const document = new Document();
    const div = document.createElement('div');
    isNull(div.getAttribute('id'));
    isFalse(div.hasAttribute('id'));
    div.setAttribute('id', 'testid');
    strictEqual(div.getAttribute('id'), 'testid');
    isTrue(div.hasAttribute('id'));
    strictEqual(div.outerHTML, '<div id="testid"></div>');
  });

  test('Node events attach', () => {
    const document = new Document();
    const div = document.createElement('div');
    div.addEventListener('click', () => {}, true);
    isTrue('_eventsCapturingPhase' in div);
    isTrue(div._eventsCapturingPhase.has('click'));
    strictEqual(div._eventsCapturingPhase.get('click').length, 1);
  });

  test('Node events remove', () => {
    const document = new Document();
    const div = document.createElement('div');

    function handler() {}

    div.addEventListener('click', handler, true);
    isTrue('_eventsCapturingPhase' in div);
    isTrue(div._eventsCapturingPhase.has('click'));
    strictEqual(div._eventsCapturingPhase.get('click').length, 1);
    div.removeEventListener('click', handler, true);
    isTrue('_eventsCapturingPhase' in div);
    isTrue(div._eventsCapturingPhase.has('click'));
    strictEqual(div._eventsCapturingPhase.get('click').length, 0);
  });

  test('Node events type normalize', () => {
    const document = new Document();
    const div = document.createElement('div');

    function handler() {}

    div.addEventListener('DOMLoadReady', handler, true);
    isTrue('_eventsCapturingPhase' in div);
    isTrue(div._eventsCapturingPhase.has('domloadready'));
  });

  test('Node event dispatch', () => {
    const document = new Document();
    const div = document.createElement('div');
    const event = new Event('DOMLoadReady');

    function handler(event) {
      strictEqual(event.type, 'domloadready');
      strictEqual(event.target, div);
    }

    div.addEventListener('DOMLoadReady', handler, true);
    isTrue('_eventsCapturingPhase' in div);
    isTrue(div._eventsCapturingPhase.has('domloadready'));
    div.dispatchEvent(event);
  });

  test('Node clone', () => {
    const document = new Document();
    const div = document.createElement('div');
    div.setAttribute('test', 'test');
    let clone = div.cloneNode();
    isNull(clone.ownerDocument);
    isNull(clone.parentNode);
    strictEqual(clone.getAttribute('test'), 'test');
    strictEqual(clone.tagName, 'div');
  });

  test('Node clone deep', () => {
    const document = new Document();
    const div = document.createElement('div');
    div.innerHTML = '<span><i class="me">Some text</i></span>';
    div.setAttribute('test', 'test');
    let clone = div.cloneNode(true);
    isNull(clone.ownerDocument);
    isNull(clone.parentNode);
    strictEqual(clone.getAttribute('test'), 'test');
    strictEqual(clone.querySelector('span i.me').textContent, 'Some text');
  });
});
