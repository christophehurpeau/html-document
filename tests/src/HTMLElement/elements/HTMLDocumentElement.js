/*global test*/
import assert from 'proclaim';
import {readFileSync} from 'fs';

const expect = assert.strictEqual;
const throws = assert.throws;

const lib = '../../../../lib/';

const Document = require(lib + 'Document');
const Doctype = require(lib + 'Doctype');

const fileText = readFileSync(__dirname + '/../../../data/linkstest.html', { encoding: 'utf-8' });

test('should popup HTMLDocumentElement if imported through document.documentElement.innerHTML', () => {
    let document = new Document();
    document.location = 'http://www.some.url/and-page';
    document.documentElement.innerHTML = fileText;
    expect(document.documentElement.children[0].tagName, 'head');
});

test('should do same as above on copy', () => {
    let document = new Document();
    document.location = 'http://www.some.url/and-page';
    document.documentElement.innerHTML = fileText;
    let bodyClone = document.body.cloneNode(true);
    expect(document.documentElement.children[0].tagName, 'head');
});

