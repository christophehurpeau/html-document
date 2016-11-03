/* global test */
import assert from 'proclaim';
const expect = assert.strictEqual;
const throws = assert.throws;

const lib = '../../lib/';

const NamedNodeMap = require(lib + 'NamedNodeMap');
const Document = require(lib + 'Document');

test('Length is 0 on create', () => {
    let n = new NamedNodeMap();
    expect(n.length, 0);
});

test('setNamedItem should add attr to map', () => {
    let n = new NamedNodeMap();
    let document = new Document();
    let attr = document.createAttribute('some');
    n.setNamedItem(attr);
    expect(n.length, 1);
});

test('setNamedItem should throw if not attr argument', () => {
    let n = new NamedNodeMap();
    throws(() => {
        n.setNamedItem('some');
    });
});

test('setNamedItem should replace attr with same name', () => {
    let n = new NamedNodeMap();
    let document = new Document();
    let attr = document.createAttribute('some');
    attr.value = 'world';
    n.setNamedItem(attr);
    let attr2 = document.createAttribute('some');
    attr2.value = 'hello';
    let attr3 = n.setNamedItem(attr2);
    expect(attr3.value, 'world');
    expect(n.length, 1);
    expect(n.getNamedItem('some').value, 'hello');
});

test('getNamedItem should return null if no element found', () => {
    let n = new NamedNodeMap();
    expect(n.getNamedItem('some'), null);
});

test('getNamedItem should return Attr item if found', () => {
    let n = new NamedNodeMap();
    let document = new Document();
    let attr = document.createAttribute('some');
    n.setNamedItem(attr);
    let attr2 = n.getNamedItem('some');
    expect(attr2.name, 'some');
});

test('removeNamedItem should return null if no item', () => {
    let n = new NamedNodeMap();
    expect(n.removeNamedItem('some'), null);
});

test('removeNamedItem should return item', () => {
    let n = new NamedNodeMap();
    let document = new Document();
    let attr = document.createAttribute('some');
    n.setNamedItem(attr);
    let attr2 = n.removeNamedItem('some');
    expect(attr2.name, 'some');
    expect(n.length, 0);
});

test('item should return particular attribute in position', () => {
    let n = new NamedNodeMap();
    let document = new Document();
    let attr = document.createAttribute('some');
    n.setNamedItem(attr);
    expect(n.item(0).name, 'some');
});

test('item should return null on wrong index', () => {
    let n = new NamedNodeMap();
    expect(n.item(-1), null);
    expect(n.item(1), null);
});

test('NamedNodeMap should be iterable', () => {
    let n = new NamedNodeMap();
    let document = new Document();
    let a = document.createAttribute('some');
    let b = document.createAttribute('other');
    n.setNamedItem(a);
    n.setNamedItem(b);
    for (let attr of n) {
        expect(attr.specified, true);
    }
});
