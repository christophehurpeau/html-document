/* global test */
import assert from 'proclaim';

const lib = '../../lib/';

const Document = require(lib + 'Document');
const Event = require(lib + 'Event');

test('Node attributes', () => {
    const document = new Document();
    const div = document.createElement('div');
    assert.isNull(div.getAttribute('id'));
    assert.isFalse(div.hasAttribute('id'));
    div.setAttribute('id', 'testid');
    assert.strictEqual(div.getAttribute('id'), 'testid');
    assert.isTrue(div.hasAttribute('id'));
    assert.strictEqual(div.outerHTML, '<div id="testid"></div>');
});

test('Node events attach', () => {
    const document = new Document();
    const div = document.createElement('div');
    div.addEventListener('click', () => {}, true);
    assert.isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    assert.isTrue(div._eventsCapturingPhase.has('click'));
    assert.strictEqual(div._eventsCapturingPhase.get('click').length, 1);
});

test('Node events remove', () => {
    const document = new Document();
    const div = document.createElement('div');

    function handler() {}

    div.addEventListener('click', handler, true);
    assert.isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    assert.isTrue(div._eventsCapturingPhase.has('click'));
    assert.strictEqual(div._eventsCapturingPhase.get('click').length, 1);
    div.removeEventListener('click', handler, true);
    assert.isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    assert.isTrue(div._eventsCapturingPhase.has('click'));
    assert.strictEqual(div._eventsCapturingPhase.get('click').length, 0);
});

test('Node events type normalize', () => {
    const document = new Document();
    const div = document.createElement('div');

    function handler() {}

    div.addEventListener('DOMLoadReady', handler, true);
    assert.isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    assert.isTrue(div._eventsCapturingPhase.has('domloadready'));
});

test('Node event dispatch', () => {
    const document = new Document();
    const div = document.createElement('div');
    const event = new Event('DOMLoadReady');

    function handler(event) {
        assert.equal(event.type, 'domloadready');
        assert.equal(event.target, div);
    }

    div.addEventListener('DOMLoadReady', handler, true);
    assert.isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    assert.isTrue(div._eventsCapturingPhase.has('domloadready'));
    div.dispatchEvent(event);
});

test('Node clone', () => {
    const document = new Document();
    const div = document.createElement('div');
    div.setAttribute('test', 'test');
    let clone = div.cloneNode();
    assert.deepEqual(clone.ownerDocument, document);
    assert.isNull(clone.parentNode);
    assert.equal(clone.getAttribute('test'), 'test');
    assert.equal(clone.tagName, 'div');
});

test('Node clone deep', () => {
    const document = new Document();
    const div = document.createElement('div');
    div.innerHTML = '<span><i class="me">Some text</i></span>';
    div.setAttribute('test', 'test');
    let clone = div.cloneNode(true);
    assert.deepEqual(clone.ownerDocument, document);
    assert.isNull(clone.parentNode);
    assert.equal(clone.getAttribute('test'), 'test');
    assert.equal(clone.querySelector('span i.me').textContent, 'Some text');
});
