/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var lib = '../../lib/';

var Document = require(lib + 'Document');
var Event = require(lib + 'Event');

test('Node attributes', function () {
    var document = new Document();
    var div = document.createElement('div');
    _proclaim2['default'].isNull(div.getAttribute('id'));
    _proclaim2['default'].isFalse(div.hasAttribute('id'));
    div.setAttribute('id', 'testid');
    _proclaim2['default'].strictEqual(div.getAttribute('id'), 'testid');
    _proclaim2['default'].isTrue(div.hasAttribute('id'));
    _proclaim2['default'].strictEqual(div.outerHTML, '<div id="testid"></div>');
});

test('Node events attach', function () {
    var document = new Document();
    var div = document.createElement('div');
    div.addEventListener('click', function () {}, true);
    _proclaim2['default'].isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    _proclaim2['default'].isTrue(div._eventsCapturingPhase.has('click'));
    _proclaim2['default'].strictEqual(div._eventsCapturingPhase.get('click').length, 1);
});

test('Node events remove', function () {
    var document = new Document();
    var div = document.createElement('div');

    /** @function */function handler() {}

    div.addEventListener('click', handler, true);
    _proclaim2['default'].isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    _proclaim2['default'].isTrue(div._eventsCapturingPhase.has('click'));
    _proclaim2['default'].strictEqual(div._eventsCapturingPhase.get('click').length, 1);
    div.removeEventListener('click', handler, true);
    _proclaim2['default'].isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    _proclaim2['default'].isTrue(div._eventsCapturingPhase.has('click'));
    _proclaim2['default'].strictEqual(div._eventsCapturingPhase.get('click').length, 0);
});

test('Node events type normalize', function () {
    var document = new Document();
    var div = document.createElement('div');

    /** @function */function handler() {}

    div.addEventListener('DOMLoadReady', handler, true);
    _proclaim2['default'].isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    _proclaim2['default'].isTrue(div._eventsCapturingPhase.has('domloadready'));
});

test('Node event dispatch', function () {
    var document = new Document();
    var div = document.createElement('div');
    var event = new Event('DOMLoadReady');

    /** @function 
    * @param event */function handler(event) {
        _proclaim2['default'].equal(event.type, 'domloadready');
        _proclaim2['default'].equal(event.target, div);
    }

    div.addEventListener('DOMLoadReady', handler, true);
    _proclaim2['default'].isTrue(div.hasOwnProperty('_eventsCapturingPhase'));
    _proclaim2['default'].isTrue(div._eventsCapturingPhase.has('domloadready'));
    div.dispatchEvent(event);
});

test('Node clone', function () {
    var document = new Document();
    var div = document.createElement('div');
    div.setAttribute('test', 'test');
    var clone = div.cloneNode();
    _proclaim2['default'].deepEqual(clone.ownerDocument, document);
    _proclaim2['default'].isNull(clone.parentNode);
    _proclaim2['default'].equal(clone.getAttribute('test'), 'test');
    _proclaim2['default'].equal(clone.tagName, 'div');
});

test('Node clone deep', function () {
    var document = new Document();
    var div = document.createElement('div');
    div.innerHTML = '<span><i class="me">Some text</i></span>';
    div.setAttribute('test', 'test');
    var clone = div.cloneNode(true);
    _proclaim2['default'].deepEqual(clone.ownerDocument, document);
    _proclaim2['default'].isNull(clone.parentNode);
    _proclaim2['default'].equal(clone.getAttribute('test'), 'test');
    _proclaim2['default'].equal(clone.querySelector('span i.me').textContent, 'Some text');
});
//# sourceMappingURL=Node.js.map