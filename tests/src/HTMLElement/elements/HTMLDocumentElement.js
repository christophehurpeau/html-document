/* global test */
import {strictEqual} from 'proclaim';
import {readFileSync} from 'fs';

const lib = '../../../../lib/';
const Document = require(lib + 'Document');
const fileText = readFileSync(__dirname + '/../../../data/linkstest.html', { encoding: 'utf-8' });

test('should popup HTMLDocumentElement if imported through document.documentElement.innerHTML', () => {
    let document = new Document();
    document.location = 'http://www.some.url/and-page';
    document.documentElement.innerHTML = fileText;
    strictEqual(document.documentElement.children[0].tagName, 'head');
});

test('should do same as above on copy', () => {
    let document = new Document();
    document.location = 'http://www.some.url/and-page';
    document.documentElement.innerHTML = fileText;
    let documentClone = document.documentElement.cloneNode(true);
    strictEqual(documentClone.children[0].tagName, 'head');
});

