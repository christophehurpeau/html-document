import { strictEqual, ok } from 'proclaim';
import { Document, HTMLMetaElement } from '../../../../src';

suite('HTMLMetaElement', () => {
  test('HTMLMetaElement should have the nodeName == meta ', () => {
    let elt = new HTMLMetaElement();
    elt._ownerDocument = new Document();
    strictEqual(elt.nodeName, 'meta');
  });

  test('document.createElement should create object', () => {
    const document = new Document();
    let meta = document.createElement('meta');
    ok(meta instanceof HTMLMetaElement);
  });

  test('Should set and get content', () => {
    let elt = new HTMLMetaElement();
    elt._ownerDocument = new Document();
    elt.content = 'Content';
    strictEqual(elt.getAttribute('content'), 'Content');
    elt.setAttribute('content', 'Other');
    strictEqual(elt.content, 'Other');
  });

  test('Should set and get httpEquiv', () => {
    let elt = new HTMLMetaElement();
    elt._ownerDocument = new Document();
    elt.httpEquiv = 'Content';
    strictEqual(elt.getAttribute('http-equiv'), 'Content');
    elt.setAttribute('http-equiv', 'Other');
    strictEqual(elt.httpEquiv, 'Other');
  });

  test('Should set and get name', () => {
    let elt = new HTMLMetaElement();
    elt._ownerDocument = new Document();
    elt.name = 'Content';
    strictEqual(elt.getAttribute('name'), 'Content');
    elt.setAttribute('name', 'Other');
    strictEqual(elt.name, 'Other');
  });

  test('Should fill attributes from tag', () => {
    const document = new Document();
    document.head.innerHTML = '<meta name="keywords" content="some content">';
    let meta = document.head.firstChild;
    strictEqual(meta.name, 'keywords');
    strictEqual(meta.content, 'some content');
  });

  test('Should return empty values if attributes not set', () => {
    let elt = new HTMLMetaElement();
    elt._ownerDocument = new Document();
    strictEqual(elt.content, '');
    strictEqual(elt.name, '');
    strictEqual(elt.httpEquiv, '');
  });
});
