import { strictEqual } from 'proclaim';
import { Document } from '../../../../src';

suite('HTMLDocumentElement', () => {
  test('should popup HTMLDocumentElement if imported through document.documentElement.innerHTML', () => {
    let document = new Document();
    document.documentElement.innerHTML = '<html></html>';
    strictEqual(document.documentElement.children.length, 0);
  });

  test('should popup HTMLDocumentElement children if imported through document.documentElement.innerHTML', () => {
    let document = new Document();
    document.documentElement.innerHTML = '<html><head></head><body>test</body></html>';
    strictEqual(document.documentElement.children.length, 2);
    strictEqual(document.body.innerHTML, 'test');
  });

  test('should popup HTMLDocumentElement values if imported through document.documentElement.innerHTML', () => {
    let document = new Document();
    document.documentElement.innerHTML = '<html><body>test</body></html>';
    strictEqual(document.documentElement.children.length, 1);
    strictEqual(document.head.innerHTML, '');
  });

  test('should not popup HTMLDocumentElement children if no <html> in content', () => {
    let document = new Document();
    document.documentElement.innerHTML = '<head><title>test1</title></head><body>test</body>';
    strictEqual(document.documentElement.children.length, 2);
    strictEqual(document.head.innerHTML, '<title>test1</title>');
    strictEqual(document.body.innerHTML, 'test');
  });

  test('should do same as above on copy', () => {
    let document = new Document();
    document.documentElement.innerHTML = '<html><head></head><body>test</body></html>';
    let documentClone = document.documentElement.cloneNode(true);
    strictEqual(documentClone.children.length, 2);
    strictEqual(documentClone.getElementsByTagName('body')[0].innerHTML, 'test');
  });
});
