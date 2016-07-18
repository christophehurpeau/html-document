/*global test*/
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var _fs = require('fs');

var expect = _proclaim2['default'].strictEqual;
var throws = _proclaim2['default'].throws;

var lib = '../../../../lib/';

var Document = require(lib + 'Document');
var Doctype = require(lib + 'Doctype');

var fileText = (0, _fs.readFileSync)(__dirname + '/../../../data/linkstest.html', { encoding: 'utf-8' });

test('should popup HTMLDocumentElement if imported through document.documentElement.innerHTML', function () {
    var document = new Document();
    document.location = 'http://www.some.url/and-page';
    document.documentElement.innerHTML = fileText;
    expect(document.documentElement.children[0].tagName, 'head');
});

test('should do same as above on copy', function () {
    var document = new Document();
    document.location = 'http://www.some.url/and-page';
    document.documentElement.innerHTML = fileText;
    var bodyClone = document.body.cloneNode(true);
    expect(document.documentElement.children[0].tagName, 'head');
});
//# sourceMappingURL=HTMLDocumentElement.js.map