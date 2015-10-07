/* global test */
import assert from 'proclaim';

const lib = '../../lib/';

const Document = require(lib + 'Document');

test('Element dataset code using', () => {
    const document = new Document();
    let element = document.createElement('i');
    element.dataset.value = 5;
    assert.equal(element.dataset.value, 5);
});

test('Element dataset markup using', () => {
    const document = new Document();
    document.body.innerHTML = '<b data-attr="some value"></b>';
    let element = document.body.firstChild;
    assert.equal(element.dataset.attr, 'some value');
});
