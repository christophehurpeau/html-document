'use strict';

var _proclaim = require('proclaim');

var _ = require('../..');

suite('Node', () => {
  test('Node attributes', () => {
    const document = new _.Document();
    const div = document.createElement('div');
    (0, _proclaim.isNull)(div.getAttribute('id'));
    (0, _proclaim.isFalse)(div.hasAttribute('id'));
    div.setAttribute('id', 'testid');
    (0, _proclaim.strictEqual)(div.getAttribute('id'), 'testid');
    (0, _proclaim.isTrue)(div.hasAttribute('id'));
    (0, _proclaim.strictEqual)(div.outerHTML, '<div id="testid"></div>');
  });

  test('Node events attach', () => {
    const document = new _.Document();
    const div = document.createElement('div');
    div.addEventListener('click', () => {}, true);
    (0, _proclaim.isTrue)('_eventsCapturingPhase' in div);
    (0, _proclaim.isTrue)(div._eventsCapturingPhase.has('click'));
    (0, _proclaim.strictEqual)(div._eventsCapturingPhase.get('click').length, 1);
  });

  test('Node events remove', () => {
    const document = new _.Document();
    const div = document.createElement('div');

    function handler() {}

    div.addEventListener('click', handler, true);
    (0, _proclaim.isTrue)('_eventsCapturingPhase' in div);
    (0, _proclaim.isTrue)(div._eventsCapturingPhase.has('click'));
    (0, _proclaim.strictEqual)(div._eventsCapturingPhase.get('click').length, 1);
    div.removeEventListener('click', handler, true);
    (0, _proclaim.isTrue)('_eventsCapturingPhase' in div);
    (0, _proclaim.isTrue)(div._eventsCapturingPhase.has('click'));
    (0, _proclaim.strictEqual)(div._eventsCapturingPhase.get('click').length, 0);
  });

  test('Node events type normalize', () => {
    const document = new _.Document();
    const div = document.createElement('div');

    div.addEventListener('DOMLoadReady', function handler() {}, true);
    (0, _proclaim.isTrue)('_eventsCapturingPhase' in div);
    (0, _proclaim.isTrue)(div._eventsCapturingPhase.has('domloadready'));
  });

  test('Node event dispatch', () => {
    const document = new _.Document();
    const div = document.createElement('div');
    const event = new _.Event('DOMLoadReady');

    div.addEventListener('DOMLoadReady', function handler(event) {
      (0, _proclaim.strictEqual)(event.type, 'domloadready');
      (0, _proclaim.strictEqual)(event.target, div);
    }, true);
    (0, _proclaim.isTrue)('_eventsCapturingPhase' in div);
    (0, _proclaim.isTrue)(div._eventsCapturingPhase.has('domloadready'));
    div.dispatchEvent(event);
  });

  test('Node clone', () => {
    const document = new _.Document();
    const div = document.createElement('div');
    div.setAttribute('test', 'test');
    let clone = div.cloneNode();
    (0, _proclaim.isNull)(clone.ownerDocument);
    (0, _proclaim.isNull)(clone.parentNode);
    (0, _proclaim.strictEqual)(clone.getAttribute('test'), 'test');
    (0, _proclaim.strictEqual)(clone.tagName, 'div');
  });

  test('Node clone deep', () => {
    const document = new _.Document();
    const div = document.createElement('div');
    div.innerHTML = '<span><i class="me">Some text</i></span>';
    div.setAttribute('test', 'test');
    let clone = div.cloneNode(true);
    (0, _proclaim.isNull)(clone.ownerDocument);
    (0, _proclaim.isNull)(clone.parentNode);
    (0, _proclaim.strictEqual)(clone.getAttribute('test'), 'test');
    (0, _proclaim.strictEqual)(clone.querySelector('span i.me').textContent, 'Some text');
  });
});
//# sourceMappingURL=Node.js.map