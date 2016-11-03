/* global test */
import assert from 'proclaim';
const expect = assert.strictEqual;
const throws = assert.throws;

const lib = '../../lib/';

const Attr = require(lib + 'Attr');

test('Constructor and name attribute', () => {
    let a = new Attr('some', 'value');
    expect(a.name, 'some');
});

test('Constructor should throw if name is not set', () => {
    throws(() => {
        const b = new Attr();
        expect(b);
    });
});

test('name is readonly', () => {
    let a = new Attr('some', 'value');
    throws(() => {
        a.name = 'value';
    });
});

test('isId checks name', () => {
    let a = new Attr('some', 'value');
    expect(a.isId, false);

    let b = new Attr('id');
    expect(b.isId, true);
});

test('specified always true', () => {
    let b = new Attr('id');
    expect(b.specified, true);
});

test('value can be set', () => {
    let a = new Attr('a', 'value');
    expect(a.value, 'value');
    a.value = {};
    expect(a.value, '[object Object]');
});
