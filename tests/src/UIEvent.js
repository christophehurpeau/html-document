/* global test */
import assert from 'proclaim';

const lib = '../../lib/';

const UIEvent = require(lib + 'UIEvent');

test('Default constructor', () => {
    let event = new UIEvent('click');
    assert.strictEqual(event.detail, 0);
    assert.deepEqual(event.view, global);
});

test('Should throw on try to set fields', () => {
    let event = new UIEvent('click');
    assert.throws(() => {
        event.detail = 100;
    });
});
