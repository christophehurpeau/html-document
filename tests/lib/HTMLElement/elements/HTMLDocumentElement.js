/* global test */
'use strict';

var _proclaim = require('proclaim');

var _fs = require('fs');

var lib = '../../../../lib/';
var Document = require(lib + 'Document');
var fileText = (0, _fs.readFileSync)(__dirname + '/../../../data/linkstest.html', { encoding: 'utf-8' });

test('should popup HTMLDocumentElement if imported through document.documentElement.innerHTML', function () {
    var document = new Document();
    document.location = 'http://www.some.url/and-page';
    document.documentElement.innerHTML = fileText;
    (0, _proclaim.strictEqual)(document.documentElement.children[0].tagName, 'head');
});

test('should do same as above on copy', function () {
    var document = new Document();
    document.location = 'http://www.some.url/and-page';
    document.documentElement.innerHTML = fileText;
    var documentClone = document.documentElement.cloneNode(true);
    (0, _proclaim.strictEqual)(documentClone.children[0].tagName, 'head');
});
//# sourceMappingURL=HTMLDocumentElement.js.map