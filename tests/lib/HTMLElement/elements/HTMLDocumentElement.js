/* global test */
'use strict';

var _proclaim = require('proclaim');

var lib = '../../../../lib/';
var Document = require(lib + 'Document');

test('should popup HTMLDocumentElement if imported through document.documentElement.innerHTML', function () {
    var document = new Document();
    document.documentElement.innerHTML = '<html></html>';
    (0, _proclaim.strictEqual)(document.documentElement.children.length, 0);
});

test('should popup HTMLDocumentElement children if imported through document.documentElement.innerHTML', function () {
    var document = new Document();
    document.documentElement.innerHTML = '<html><head></head><body>test</body></html>';
    (0, _proclaim.strictEqual)(document.documentElement.children.length, 2);
    (0, _proclaim.strictEqual)(document.body.innerHTML, 'test');
});

test('should popup HTMLDocumentElement values if imported through document.documentElement.innerHTML', function () {
    var document = new Document();
    document.documentElement.innerHTML = '<html><body>test</body></html>';
    (0, _proclaim.strictEqual)(document.documentElement.children.length, 1);
    (0, _proclaim.strictEqual)(document.head.innerHTML, '');
});

test('should not popup HTMLDocumentElement children if no <html> in content', function () {
    var document = new Document();
    document.documentElement.innerHTML = '<head><title>test1</title></head><body>test</body>';
    (0, _proclaim.strictEqual)(document.documentElement.children.length, 2);
    (0, _proclaim.strictEqual)(document.head.innerHTML, '<title>test1</title>');
    (0, _proclaim.strictEqual)(document.body.innerHTML, 'test');
});

test('should do same as above on copy', function () {
    var document = new Document();
    document.documentElement.innerHTML = '<html><head></head><body>test</body></html>';
    var documentClone = document.documentElement.cloneNode(true);
    (0, _proclaim.strictEqual)(documentClone.children.length, 2);
    (0, _proclaim.strictEqual)(documentClone.getElementsByTagName('body')[0].innerHTML, 'test');
});
//# sourceMappingURL=HTMLDocumentElement.js.map