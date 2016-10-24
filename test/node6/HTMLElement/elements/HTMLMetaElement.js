'use strict';

var _proclaim = require('proclaim');

var _ = require('../../../..');

suite('HTMLMetaElement', () => {
  test('HTMLMetaElement should have the nodeName == meta ', () => {
    let elt = new _.HTMLMetaElement();
    elt._ownerDocument = new _.Document();
    (0, _proclaim.strictEqual)(elt.nodeName, 'meta');
  });

  test('document.createElement should create object', () => {
    const document = new _.Document();
    let meta = document.createElement('meta');
    (0, _proclaim.ok)(meta instanceof _.HTMLMetaElement);
  });

  test('Should set and get content', () => {
    let elt = new _.HTMLMetaElement();
    elt._ownerDocument = new _.Document();
    elt.content = 'Content';
    (0, _proclaim.strictEqual)(elt.getAttribute('content'), 'Content');
    elt.setAttribute('content', 'Other');
    (0, _proclaim.strictEqual)(elt.content, 'Other');
  });

  test('Should set and get httpEquiv', () => {
    let elt = new _.HTMLMetaElement();
    elt._ownerDocument = new _.Document();
    elt.httpEquiv = 'Content';
    (0, _proclaim.strictEqual)(elt.getAttribute('http-equiv'), 'Content');
    elt.setAttribute('http-equiv', 'Other');
    (0, _proclaim.strictEqual)(elt.httpEquiv, 'Other');
  });

  test('Should set and get name', () => {
    let elt = new _.HTMLMetaElement();
    elt._ownerDocument = new _.Document();
    elt.name = 'Content';
    (0, _proclaim.strictEqual)(elt.getAttribute('name'), 'Content');
    elt.setAttribute('name', 'Other');
    (0, _proclaim.strictEqual)(elt.name, 'Other');
  });

  test('Should fill attributes from tag', () => {
    const document = new _.Document();
    document.head.innerHTML = '<meta name="keywords" content="some content">';
    let meta = document.head.firstChild;
    (0, _proclaim.strictEqual)(meta.name, 'keywords');
    (0, _proclaim.strictEqual)(meta.content, 'some content');
  });

  test('Should return empty values if attributes not set', () => {
    let elt = new _.HTMLMetaElement();
    elt._ownerDocument = new _.Document();
    (0, _proclaim.strictEqual)(elt.content, '');
    (0, _proclaim.strictEqual)(elt.name, '');
    (0, _proclaim.strictEqual)(elt.httpEquiv, '');
  });
});
//# sourceMappingURL=HTMLMetaElement.js.map