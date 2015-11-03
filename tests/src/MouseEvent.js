/* global test */
import assert from 'proclaim';

const lib = '../../lib/';

const MouseEvent = require(lib + 'MouseEvent');

test('Default constructor', () => {
    let event = new MouseEvent('click');
    assert.strictEqual(event.detail, 0);
    assert.deepEqual(event.view, global);
});

test('Constructor extends fields', () => {
    let event = new MouseEvent('click', { screenX: 100, screenY: 100 });
    assert.equal(event.screenX, 100);
    assert.equal(event.screenY, 100);
});

test('Should throw on try to set fields', () => {
    let event = new MouseEvent('click');
    assert.throws(() => {
        event.screenX = 100;
    });
});

test('Constructor should initialize all fields', () => {
    let event = new MouseEvent('click');
    assert.equal(event.screenX, 0);
    assert.equal(event.screenY, 0);
    assert.equal(event.clientX, 0);
    assert.equal(event.clientY, 0);
    assert.equal(event.ctrlKey, false);
    assert.equal(event.shiftKey, false);
    assert.equal(event.altKey, false);
    assert.equal(event.metaKey, false);
    assert.equal(event.button, 0);
    assert.equal(event.buttons, 0);
    assert.equal(event.relatedTarget, null);
    assert.equal(event.region, null);
});
